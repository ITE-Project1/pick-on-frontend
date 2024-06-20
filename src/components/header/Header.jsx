import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import logo from "../../assets/img/logo.png";

const Header = () => {
  const location = useLocation();
  const specialPages = ['/user/my', '/login', '/register']; // 특정 페이지 경로들을 배열로 정의
  const isSpecialPage = specialPages.includes(location.pathname);

  return (
      <>
        <HeaderWrapper isSpecialPage={isSpecialPage}>
          <img src={logo} height={39} width={145} alt="logo" />
        </HeaderWrapper>
          {!isSpecialPage && <Underbar />}
      </>
  );
};
export default Header;

const HeaderWrapper = styled.div`
  width: inherit;
  height: 77px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 425px;
  margin: 0 auto;
  
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${(props) =>
    props.isSpecialPage &&
    css`
      border : none;
      top : 100px;
      position : static;
      padding-top: 100px; /* 로고를 아래로 내리기 위해 패딩 추가 */
    `}
`;

const Underbar = styled.div`
  width: inherit;
  height: 1px;
  max-width: 425px;
  position: fixed;
  margin: 0 auto;
  top: 77px; /* 헤더 높이만큼 아래에 위치 */
  left: 0;
  right: 0;
  z-index: 9; /* 헤더보다 뒤에 있도록 설정 */
  box-shadow: 0 1px 9px rgba(0, 0, 0, 1.0); /* 상단이 진한 회색이고 아래로 갈수록 연한 회색 */
`;