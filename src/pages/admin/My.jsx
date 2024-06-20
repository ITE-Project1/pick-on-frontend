import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Screen = () => {
  return (
    <Group>
      <Overlap>
        <View>
          <ShoppingInfo>나의 쇼핑 정보</ShoppingInfo>
          <OrderInfo to="/order">주문 조회</OrderInfo>
          <Rectangle />
          <AccountInfo>나의 계정 정보</AccountInfo>
          <DeleteAccount to="/delete-account">회원 탈퇴</DeleteAccount>
          <Logout to="/logout">로그아웃</Logout>
          <Rectangle2 />
          <Rectangle3 />
        </View>
        <Rectangle4 />
        <UserId>유저아이디</UserId>
      </Overlap>
    </Group>
  );
};

export default Screen;

const Group = styled.div`
  height: 854px;
  left: 0px;
  position: relative;
  width: 410px;
  padding-top: -87px; /* 헤더의 높이 */
`;

const Overlap = styled.div`
  height: 854px;
  position: relative;
  width: 425px;
`;

const View = styled.div`
  padding-top : 2px;
  background-color: #ffffff;
  height: 854px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 405px;
`;

const ShoppingInfo = styled.div`
  color: #000000;
  font-family: "Noto Sans-DisplaySemiBold", Helvetica;
  font-size: 20px;
  font-weight: 600;
  height: 48px;
  left: 30px;
  letter-spacing: 0;
  line-height: 34px;
  position: absolute;
  top: 249px;
  width: 336px;
`;

const OrderInfo = styled(Link)`
  color: #828282;
  font-family: "Noto Sans-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  height: 48px;
  left: 30px;
  letter-spacing: 0;
  line-height: 30.6px;
  position: absolute;
  top: 306px;
  width: 336px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Rectangle = styled.div`
  background-color: #000000;
  height: 4px;
  left: 29px;
  position: absolute;
  top: 298px;
  width: 425px;
`;

const AccountInfo = styled.div`
  color: #000000;
  font-family: "Noto Sans-DisplaySemiBold", Helvetica;
  font-size: 20px;
  font-weight: 600;
  height: 48px;
  left: 30px;
  letter-spacing: 0;
  line-height: 34px;
  position: absolute;
  top: 401px;
  width: 336px;
`;

const DeleteAccount = styled(Link)`
  color: #828282;
  font-family: "Noto Sans-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  height: 48px;
  left: 30px;
  letter-spacing: 0;
  line-height: 30.6px;
  position: absolute;
  top: 458px;
  width: 336px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Logout = styled(Link)`
  color: #828282;
  font-family: "Noto Sans-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  height: 48px;
  left: 30px;
  letter-spacing: 0;
  line-height: 30.6px;
  position: absolute;
  top: 517px;
  width: 336px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Rectangle2 = styled.div`
  background-color: #000000;
  height: 4px;
  left: 29px;
  position: absolute;
  top: 450px;
  width: 391px;
`;

const Rectangle3 = styled.div`
  background-color: #f0f0f0;
  height: 1px;
  left: 29px;
  position: absolute;
  top: 512px;
  width: 391px;
`;

const Rectangle4 = styled.div`
  background-color: #000000;
  height: 224px;
  left: 0;
  position: absolute;
  top: 0;
  width: 425px;
`;

const UserId = styled.div`
  color: #ffffff;
  font-family: "Noto Sans-DisplayBold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  height: 48px;
  left: 29px;
  letter-spacing: 0;
  line-height: 54.4px;
  position: absolute;
  top: 166px;
  white-space: nowrap;
  width: 179px;
`;
