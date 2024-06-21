import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {authState} from "../../auth/authState";
import {useRecoilValue, useSetRecoilState} from "recoil";

export const Screen = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  const handleLogout = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        setAuth({
          isAuthenticated : false,
          userId : null,
          role : null
        });
        navigate('/login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch('http://localhost:8080/user/sign-out', {}, { withCredentials: true });
      if (response.status === 200) {
        setAuth({
          isAuthenticated: false,
          userId : null,
          role : null
        });
        navigate('/login');
      } else {
        console.error("Account deletion failed");
      }
    } catch (error) {
      console.error("Account deletion error:", error);
    }
  };

  return (
      <Group>
        <Overlap>
          <View>
            <ShoppingInfo>나의 쇼핑 정보</ShoppingInfo>
            <OrderInfo to="/user/my/orderlist">주문 조회</OrderInfo>
            <Rectangle />
            <AccountInfo>나의 계정 정보</AccountInfo>
            <DeleteAccountLink to="#" onClick={handleDeleteAccount}>회원 탈퇴</DeleteAccountLink>
            <LogoutLink to="#" onClick={handleLogout}>로그아웃</LogoutLink>
            <Rectangle2 />
            <Rectangle3 />
          </View>
          <Rectangle4 />
          <UserId>{auth.username}</UserId>
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
  display:flex;
  align-items: center; /* 세로로 가운데 정렬 */
  
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

const DeleteAccountLink = styled(Link)`
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
  display:flex;
  align-items: center; /* 세로로 가운데 정렬 */
  
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutLink = styled(Link)`
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
  
  display:flex;
  align-items: center; /* 세로로 가운데 정렬 */
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
