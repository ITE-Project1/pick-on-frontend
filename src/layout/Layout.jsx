import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import LogoContainer from "../components/styled/LogoContainer";
import styled from "styled-components";

const Layout = () => {
  const location = useLocation();
  const showHeader = !["/admin/my"].includes(location.pathname);

  return (
    <InnerWidth>
      {showHeader && (
        <LogoContainer>
          <Header />
        </LogoContainer>
      )}
      <Outlet />
      {/*<Footer />*/}
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
  border: 1px solid grey;
`;
