import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LandingPage from './pages/landingPage';
import Nav from './components/nav';
import NewInPage from './pages/newIn';
import Women from './pages/women';
import Footer from './components/footer';
import AddProduct from './pages/addproduct';
import ProductPage from './pages/productPage';
import Men from './pages/men';
import ResultPage from './pages/resultPage';
import Interview from './pages/interview';
import Cart from './components/cart';


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/newIn" element={<NewInPage />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/search" element={<ResultPage />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
