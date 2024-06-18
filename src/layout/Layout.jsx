import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import styled from "styled-components";

const Layout = () => {
  const location = useLocation();
  const showHeader = !["/admin/my"].includes(location.pathname);

  return (
    <InnerWidth>
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
  padding-top: 87px; /* 헤더의 높이 */
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 87px; /* 푸터의 높이 */
  height: calc(100vh - 174px); /* 헤더와 푸터를 제외한 높이 */
`;
