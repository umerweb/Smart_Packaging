import { Routes, Route } from "react-router-dom";
import Header from './components/header';
import PreHeader from './components/preheader';
import Contact from "./components/contact";
import Footer from "./components/footer";
import Home from './components/home';
import AddProduct from "./components/addProduct";
import ProductPage from "./components/productPage";
import Addcategory from "./components/addcategory";
import Catalogpage from "./components/catalogpage";
import Cartpage from "./components/cart";
import Checkout from "./components/checkout";
import SuccessPage from './components/Success';
import LoginPage from './components/loginPage';
import VerifyEmail from './components/emailVerify';
import ConfirmEmail from './components/emailsend';
import Account from './components/account';
import OrderInfo from './components/orderInfo';
import About from './components/about';

import  { Toaster } from 'react-hot-toast';
function App() {


  return (
    <>
      <PreHeader />
      <Header />
      <Toaster
        position="top-right"
        reverseOrder={true}
      />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/category" element={<Addcategory />} />
        <Route path="/catalog" element={<Catalogpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/product/mainproduct/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verifyemail/:id" element={<VerifyEmail />} />
        <Route path="/emailsend" element={<ConfirmEmail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/order/info/:id" element={<OrderInfo />} />
        <Route path="/about" element={<About />} />


      </Routes>

      <Footer />

    </>
  )
}

export default App
