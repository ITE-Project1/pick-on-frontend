import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import Header from "../../components/common/header/Header";

// 주문 상세 페이지
const OrderDetail = () => {
  const orderText = ["주문번호", "주문 일시", "픽업 가능 시각", "발송지점", "픽업 현황"];

  const productText = ["상품명", "상품ID", "수량", "총 결제 금액"];

  // TODO: 버튼 비활성화 처리 고려하기
  const receiveBtnClick = () => {};

  // TODO: API 연동하기

  return (
    <ContentWrapper>
      <Header />

      <TitleText>주문 상세 내역</TitleText>

      <OrderInfo>
        {orderText.map((text) => (
          <TextWrapper>
            <div>{text}</div>
            <div>dfdfd</div>
          </TextWrapper>
        ))}
      </OrderInfo>

      <ButtonWrapper>
        <ReceiveButton onClick={receiveBtnClick}>고객 수령 완료</ReceiveButton>
      </ButtonWrapper>

      <ProductInfo>
        <div style={{ border: "2px solid black" }}>
          <img src={logo} alt="logo" width={166} height={179} />
        </div>
        <RightColumn>
          {productText.map((text) => (
            <TextWrapper>
              <ProductText>{text}</ProductText>
              <ProductText>dfdfd</ProductText>
            </TextWrapper>
          ))}
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
  padding: 20px 10px 10px 20px;
`;

const TitleText = styled.div`
  font-size: 30px;
  color: #828282;
  padding: 20px 0px 80px 0px;
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
  margin-top: 100px;
`;

const RightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 10px;
`;

const ProductText = styled.span`
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 25px;
`;

const ReceiveButton = styled.div`
  padding: 10px 20px;
  border: 1px solid #cccccc;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
