import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';

// Code splitting (lazy loading) for pages:
const ProductList = lazy(() => import('./pages/ProductList.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const App = () => {
  return (
    <>
      <Header />
      {/* Suspense fallback shown while lazy components load */}
      <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
