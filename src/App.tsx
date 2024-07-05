import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import './assets/scss/main.scss'
import Main from './shopcaulong/layouts/Main';
import Home from './shopcaulong/pages/home/Home';
import Cookies from 'js-cookie';
import Login from './shopcaulong/pages/auth/Login';
import Register from './shopcaulong/pages/auth/Register';
import ForgotPassword from './shopcaulong/pages/auth/ForgotPassword';
import Error404Page from './component/Error404Page';
import ProductDetail from './shopcaulong/pages/detail/ProductDetail';
import Checkout from './shopcaulong/pages/checkout/Checkout';
import Payment from './shopcaulong/pages/checkout/Payment';
import PaymentSuccess from './shopcaulong/pages/checkout/PaymentSuccess';
import AllProduct from './shopcaulong/pages/product/AllProduct';
import CategoryBrandPage from './shopcaulong/pages/categorybrand/CategoryBrandPage';
import SearchProduct from './shopcaulong/pages/search/SearchProduct';
import NewsPage from './shopcaulong/pages/news/NewsPage';
import NewsDetail from './shopcaulong/pages/news/NewsDetail';
import Profile from './shopcaulong/pages/profile/ProfileMain';
import ProfileContent from './shopcaulong/pages/profile/ProfileContent';
import ChangePassword from './shopcaulong/pages/profile/ChangePassword';
import CategoryPage from './shopcaulong/pages/category/CategoryPage';
import ContactPage from './shopcaulong/pages/contact/ContactPage';
function App() {
  const token = Cookies.get('tokenUser');

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="chi-tiet/:slug" element={<ProductDetail />} />
          <Route path="danh-muc/:slug" element={<CategoryPage />} />
          <Route path="lien-he" element={<ContactPage />} />
          <Route path="thu-tuc-thanh-toan" element={<Checkout />} />
          <Route path="dia-chi-va-phuong-thuc-thanh-toan" element={<Payment />} />
          <Route path="orders/return" element={<PaymentSuccess />} />
          <Route path="tat-ca-san-pham" element={<AllProduct />} />
          <Route path="tin-tuc" element={<NewsPage />} />
          <Route path="tin-tuc/:slug" element={<NewsDetail />} />
          <Route path="tim-kiem/:name" element={<SearchProduct />} />
          <Route path="duyet-san-pham/:category/:brand" element={<CategoryBrandPage />} />
          <Route path="ho-so" element={<Profile />} >
            <Route index element={<ProfileContent />} />
            <Route path="doi-mat-khau" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="*" element={<Error404Page />} />
        <Route path="quen-mat-khau" element={<ForgotPassword />} />
        <Route path="dang-ky" element={token ? <Navigate to="/ho-so" /> : <Register />} />
        <Route path="dang-nhap" element={token ? <Navigate to="/ho-so" /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
