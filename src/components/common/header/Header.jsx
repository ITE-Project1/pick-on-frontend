// 헤더 로고
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../assets/img/logo.png"; // 로고 이미지 경로를 맞춰주세요

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
      <LogoContainer isLoginPage={isLoginPage}>
        <img className={isLoginPage ? "element" : ""} src={logo} height={39} width={145} alt="logo" />
      </LogoContainer>
  );
};

export default Header;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
  background-color: transparent;
  position: ${({ isLoginPage }) => (isLoginPage ? 'fixed' : 'static')};
  top: ${({ isLoginPage }) => (isLoginPage ? '100px' : 'auto')}; /* 로그인 페이지인 경우 더 아래로 위치 */
  left: 0;
  right: 0;
    z-index: 1000;

  img.element {
    object-fit: cover;
  }
`;
