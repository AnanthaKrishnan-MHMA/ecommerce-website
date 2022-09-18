import './App.css';
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/productDetails/ProductDetails";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import webFont from "webfontloader";
import Products from './components/Products/Products';
import Search from './components/Search/Search';
function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, []);
  return (

    <Router>
      <Header />
        <Routes>
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
