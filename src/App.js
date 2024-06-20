import * as React from 'react';
import { Reset } from 'styled-reset';
import GlobalStyles from './GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import OrderDetail from './pages/admin/OrderDetail';
import Order from './pages/admin/Order';
import Users from './pages/admin/Users';
import UserMy from './pages/user/My';
import AdminMy from './pages/admin/My';
import Products from "./pages/admin/Products";
import ProductList from './pages/user/ProductList';
import Login from './pages/common/Login';
import ProductDetail from './pages/user/ProductDetail';
import Register from './pages/common/Register';

// TODO: 특정 조건을 만족하지 않는 유저의 Route 접근 제한 처리
function App() {
  return (
    <React.Fragment>
      <Reset />
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='admin/order/:orderId' element={<OrderDetail />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/my' element={<AdminMy />} />
            <Route path='/user/my' element={<UserMy />} />
            <Route path='/admin/products' element={<Products />} />
            <Route path='/user/productList' element={<ProductList/>} />
            <Route path='/user/productDetail/:productId' element={<ProductDetail/>} />
              
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
