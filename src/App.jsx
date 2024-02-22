import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.jsx';
import HomeGallery from "./components/HomeGallery/HomeGallery.jsx";
import HomeLandscape from './components/HomeLandscape/HomeLandscape.jsx';
import Loading from './components/Loading/Loading.jsx'
import NotFound from './components/NotFound/NotFound.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import { CartProvider } from './components/UseCart/UseCart.jsx';
import './App.css';


const Street = lazy(() => import('./components/Street/Street.jsx'));
const Wildlife = lazy(() => import("./components/Wildlife/Wildlife.jsx"));
const Landscapes = lazy(() => import("./components/Landscapes/Landscapes.jsx"));
const Adventure = lazy(() => import("./components/Adventure/Adventure.jsx"));
const PrintShop = lazy(() => import("./components/PrintShop/PrintShop.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App" aria-live="polite">
          <Navigation />
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/street" element={<Street />} />
                <Route path="/wildlife" element={<Wildlife />} />
                <Route path="/landscapes" element={<Landscapes />} />
                <Route path="/adventure" element={<Adventure />} />
                <Route path="/printshop" element={<PrintShop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={
                  <>
                    <HomeGallery />
                    <HomeLandscape />
                    <PrintShop />
                  </>
                } />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
