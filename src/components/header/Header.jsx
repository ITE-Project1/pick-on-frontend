import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import logo from "../../assets/img/logo.png";

const Header = () => {
  const location = useLocation();
  const specialPages = ['/user/my', '/login', '/yetanother']; // 특정 페이지 경로들을 배열로 정의
  const isSpecialPage = specialPages.includes(location.pathname);

  return (
    <HeaderWrapper isSpecialPage={isSpecialPage}>
      <img src={logo} height={39} width={145} alt="logo" />
    </HeaderWrapper>
  );
};
export default Header;

const HeaderWrapper = styled.div`
  width: inherit;
  height: 87px;
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

  ${(props) =>
    props.isSpecialPage &&
    css`
      border : none;
      top : 100px;
      position : static;
      padding-top: 20px; /* 로고를 아래로 내리기 위해 패딩 추가 */
    `}
`;
