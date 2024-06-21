import * as React from 'react';
import { Reset } from 'styled-reset';
import GlobalStyles from './GlobalStyle';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {useRecoilState} from "recoil";
import { authState } from './auth/authState'
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

// TODO: 특정 조건을 만족하지 않는 유저의 Route 접근 제한 처리

const ProtectedRoute = ({children, role}) => {
  const [auth] = useRecoilState(authState);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />
  }
  if (auth.role !== role) {
    return <Navigate to="/" />
  }
  return children;
};

function App() {
  const [auth, setAuth] = useRecoilState(authState);
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
                <Route path='/user/my' element={<UserMy />} />
                <Route path='/user/productdetail/:productId' element={<ProductDetail/>} />
                <Route path='/admin/orderlist' element={<ProtectedRoute role="admin"><OrderList /></ProtectedRoute>} />
                <Route path='/admin/order/:orderId' element={<ProtectedRoute role="admin"><OrderDetail /></ProtectedRoute>} />
                <Route path='/admin/userlist' element={<ProtectedRoute role="admin"><UserList /></ProtectedRoute>} />
                <Route path='/admin/my' element={<ProtectedRoute role="admin"><AdminMy /></ProtectedRoute>} />
                <Route path='/admin/stocklist' element={<ProtectedRoute role="admin"><StockList /></ProtectedRoute>} />
              </Route>
            </Routes>
          </Router>
        </React.Fragment>
  );
}

export default App;
