import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const location = useLocation();
  const showHeader = !["/admin/my", "/user/my"].includes(location.pathname);

  return (
    <InnerWidth showHeader={showHeader}>
      {showHeader && <Header />}
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </InnerWidth>
  );
};

export default Layout;

const InnerWidth = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 425px;
  min-height: 100vh;
  margin: 0 auto;
  border: 1px solid #ccc;
  z-index: 20;
  padding-top: ${(props) => (props.showHeader ? '87px' : '0px')}; /* 조건에 따른 padding-top */
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 67px; /* 푸터의 높이 */
  height: calc(100vh - 154px); /* 헤더와 푸터를 제외한 높이 */
`;
