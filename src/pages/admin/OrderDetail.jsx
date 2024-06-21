import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

// 주문 상세 페이지
const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  // const [buttonStatus, setButtonStatus] = useState("before");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("Fetching order details...");
        const response = await axios.get(`http://localhost:8080/admin/orders/${orderId}`);
        console.log("OrderList details fetched:", response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const receiveBtnClick = async () => {
    try {
      console.log("Updating order status...");
      await axios.patch(`http://localhost:8080/admin/orders/${orderId}/status/completed`);
      console.log("OrderList status updated");
      // setButtonStatus("after");
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        pickupStatus: "픽업완료",
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
      <ContentWrapper>
        <TitleText>주문 상세 내역</TitleText>

        <OrderInfo>
          <TextWrapper>
            <div>주문번호</div>
            <div>{orderDetails.orderId}</div>
          </TextWrapper>
          <TextWrapper>
            <div>주문일시</div>
            <div>{orderDetails.orderDate}</div>
          </TextWrapper>
          <TextWrapper>
            <div>픽업 가능 예상 시각</div>
            <div>{orderDetails.pickupDate}</div>
          </TextWrapper>
          <TextWrapper>
            <div>발송지점</div>
            <div>{orderDetails.fromStore}</div>
          </TextWrapper>
          <TextWrapper>
            <div>픽업 현황</div>
            <div>{orderDetails.pickupStatus}</div>
          </TextWrapper>
        </OrderInfo>

        {orderDetails.pickupStatus === "픽업가능" && (
            <ButtonWrapper>
              <ReceiveButton onClick={receiveBtnClick}>고객 수령 완료</ReceiveButton>
            </ButtonWrapper>
        )}

        <TitleText>주문 상품 정보</TitleText>
        <ProductInfo>
          <ImageWrapper>
            <img src={orderDetails.prodcutImg} alt="prodcutImg" width={120} height={120} />
          </ImageWrapper>
          <RightColumn>
            <TextWrapper>
              <ProductText>{orderDetails.productName}</ProductText>
            </TextWrapper>
            <TextWrapper>
              <ProductText>상품코드</ProductText>
              <ProductText>{orderDetails.productId}</ProductText>
            </TextWrapper>
            <TextWrapper>
              <ProductText>수량</ProductText>
              <ProductText>{orderDetails.quantity}개</ProductText>
            </TextWrapper>
            <TextWrapper>
              <ProductText>총 결제금액</ProductText>
              <ProductText>{formatPrice(orderDetails.totalPrice)}원</ProductText>
            </TextWrapper>
          </RightColumn>
        </ProductInfo>
      </ContentWrapper>
  );
};

export default OrderDetail;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 10px 20px;
`;

const ImageWrapper = styled.div`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
`;

const TitleText = styled.div`
  font-size: 23px;
  color: #000000;
  padding: 30px 0px 40px 0px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: #828282;
`;

const OrderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 10px;
`;

const ProductText = styled.span`
  // font-size: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 30px;
`;

const ReceiveButton = styled.div`
  padding: 10px 20px;
  border: 1px solid #cccccc;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }

  ${(props) =>
    props.isClicked &&
    css`
      background-color: #d3d3d3;
      cursor: not-allowed;
    `}
`;
