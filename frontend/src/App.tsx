import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage';
import Layout from '@components/common/Layout/Layout';
import CartPage from '@pages/CartPage';
import { CartProvider } from '@context/CartContext';
import ProductPage from '@pages/ProductPage';
import OrdersPage from '@pages/OrdersPage';


function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </Layout>
    </CartProvider>

  );
}

export default App;
