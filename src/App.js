import * as React from 'react';
import { Reset } from 'styled-reset';
import GlobalStyles from './GlobalStyle';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Layout from './layout/Layout';
import OrderDetail from './pages/admin/OrderDetail';
import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';
import UserMy from './pages/user/My';
import AdminMy from './pages/admin/My';
import StockList from "./pages/admin/StockList";
import ProductList from './pages/user/ProductList';
import Login from './pages/common/Login';
import ProductDetail from './pages/user/ProductDetail';
import Register from './pages/common/Register';
import MyOrderList from "./pages/user/MyOrderList";
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({children, role}) => {

  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    if (!decodedToken.auth) {
      return <Navigate to="/login" />
    }

    if (decodedToken.auth !== role) {
      alert('접근 권한이 없습니다.');
      setTimeout(() => {
        window.history.back();
      }, 2000);
      return ;
    }
  } catch(error) {
    return <Navigate to="/login" />
  }

  return children;
};

function App() {
  return (
        <React.Fragment>
          <Reset />
          <GlobalStyles />
          <Router>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route path='/' element={<Navigate to="/user/productlist" />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user/productlist' element={<ProductList/>} />
                <Route path='/user/my' element={<ProtectedRoute role="ROLE_general"><UserMy /></ProtectedRoute>} />
                <Route path='/user/orderlist' element={<ProtectedRoute role="ROLE_general"><MyOrderList /></ProtectedRoute>} />
                <Route path='/user/productdetail/:productId' element={<ProductDetail/>} />
                <Route path='/admin/orderlist' element={<ProtectedRoute role="ROLE_admin"><OrderList /></ProtectedRoute>} />
                <Route path='/admin/order/:orderId' element={<ProtectedRoute role="ROLE_admin"><OrderDetail /></ProtectedRoute>} />
                <Route path='/admin/userlist' element={<ProtectedRoute role="ROLE_admin"><UserList /></ProtectedRoute>} />
                <Route path='/admin/my' element={<ProtectedRoute role="ROLE_admin"><AdminMy /></ProtectedRoute>} />
                <Route path='/admin/stocklist' element={<ProtectedRoute role="ROLE_admin"><StockList /></ProtectedRoute>} />
              </Route>
            </Routes>
          </Router>
        </React.Fragment>
  );
}

export default App;
