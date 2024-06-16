import * as React from 'react';
import { Reset } from 'styled-reset';
import GlobalStyles from './GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Stock from './pages/admin/Stock';
import OrderDetail from './pages/admin/OrderDetail';
import Order from './pages/admin/Order';
import Users from './pages/admin/Users';
import My from './pages/admin/My';

// TODO: 특정 조건을 만족하지 않는 유저의 Route 접근 제한 처리
function App() {
  return (
    <React.Fragment>
      <Reset />
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/admin' element={<Stock />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='admin/order/:orderId' element={<OrderDetail />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/my' element={<My />} />
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
