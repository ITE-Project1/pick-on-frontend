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
        const response = await axios.get(`http://localhost:8080/admin/orders/${orderId}`, {withCredentials : true});
        console.log("OrderList details fetched:", response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const storeReceiveBtnClick = async () => {
    try {
      await axios.patch("http://localhost:8080/admin/orders/status/pickupready", [orderDetails.orderId], {withCredentials : true});
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        pickupStatus: "픽업가능",
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const customerReceiveBtnClick = async () => {
    try {
      await axios.patch(`http://localhost:8080/admin/orders/${orderId}/status/completed`, {}, {withCredentials : true});
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        pickupStatus: "픽업완료",
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
      <Container>
        <Header>
          <TopTitleText>주문 및 픽업 조회</TopTitleText>
        </Header>
        <Underbar></Underbar>
        <ContentWrapper>
          <TitleText>주문 픽업 정보</TitleText>
          <Rectangle />
          <OrderInfo>
            <TextWrapper>
              <TextLeft>주문번호</TextLeft>
              <TextRight>{orderDetails.orderId}</TextRight>
            </TextWrapper>
            <TextWrapper>
              <TextLeft>주문일시</TextLeft>
              <TextRight>{orderDetails.orderDate}</TextRight>
            </TextWrapper>
            <TextWrapper>
              <TextLeft>픽업 가능 예상 시각</TextLeft>
              <TextRight>{orderDetails.pickupDate}</TextRight>
            </TextWrapper>
            <TextWrapper>
              <TextLeft>발송지점</TextLeft>
              <TextRight>{orderDetails.fromStore}</TextRight>
            </TextWrapper>
            <TextWrapper>
              <TextLeft>픽업 현황</TextLeft>
              <TextRight style={{color: "#851414"}}>{orderDetails.pickupStatus}</TextRight>
            </TextWrapper>
          </OrderInfo>
          {orderDetails.pickupStatus === "배송중" && (
              <ButtonWrapper>
                <ReceiveButton onClick={storeReceiveBtnClick}>지점 수령 완료</ReceiveButton>
              </ButtonWrapper>
          )}
          {orderDetails.pickupStatus === "픽업가능" && (
              <ButtonWrapper>
                <ReceiveButton onClick={customerReceiveBtnClick}>고객 수령 완료</ReceiveButton>
              </ButtonWrapper>
          )}
          <TitleText>주문 상품 정보</TitleText>
          <Rectangle />
          <ProductInfo>
            <ImageWrapper>
              <img src={orderDetails.productImg} alt="prodcutImg" width={120} height={120} />
            </ImageWrapper>
            <RightColumn>
              <TextWrapper>
                <ProductText style={{color: "#000000", fontWeight: "500"}}>{orderDetails.productName}</ProductText>
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
      </Container>
  );
}

export default OrderDetail;

const Container = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 77px;
  
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Underbar = styled.div`
  width: inherit;
  height: 12px;
  max-width: 425px;
  position: fixed;
  margin: 0 auto;
  top: 77px; /* 헤더 높이만큼 아래에 위치 */
  left: 0;
  right: 0;
  z-index: 9; /* 헤더보다 뒤에 있도록 설정 */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)); /* 아래로 갈수록 연한 회색 */
`;

const TopTitleText = styled.div`
  font-size: 20px;
  padding: 15px 0px 15px 0px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 10px 20px;
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
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  padding: 30px 0px 15px 0px;
  width: 100%;
  text-align: left;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: #828282;
  padding-bottom: 5px;
`;

const TextLeft = styled.div`
  width: 40%;
`;

const TextRight = styled.div`
  width: 60%;
  color: #000000;
  font-weight: 500;
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

const Rectangle = styled.div`
  background-color: #000000;
  height: 4px;
  left: 29px;
  // position: absolute;
  top: 298px;
  width: 100%;
  margin-bottom: 15px;
`;
