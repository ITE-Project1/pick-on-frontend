import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/footer/Footer';
import styled from 'styled-components';

const Layout = () => {
  return (
    <InnerWidth>
      <Outlet />
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
  border: 1px solid grey;
`;
