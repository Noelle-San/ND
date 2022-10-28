import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";
import NewSubmit from "./components/NewSubmit";
import HomeAdmin from "./components/HomeAdmin";
import FavQ from "./components/FavQ";
import Updatepass from "./components/Updatepass";
import Navbar from './components/Navbar';
import AllUsers from "./components/AllUsers";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";
import Cart from './pages/Cart';
import CreateOrder from './pages/CreateOrder';
import OrderDetails from './pages/OrderDetails';
import OrderList from './pages/OrderList';
import ProductDetails from './pages/ProductDetails';
import AddProduct from "./components/AddProduct";
import Details from "./components/Details";
import ProductsHome from "./components/ProductsHome";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <div>
      <Router>

        <Navbar />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/adminhome" element={<HomeAdmin />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/fav-q" element={<FavQ />} />
          <Route path="/check-answer" element={<Updatepass />} />

          <Route path="/otp" element={<NewSubmit />} />


          <Route path="/all" element={<AllUsers />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />


          <Route path="/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/createorder" element={<CreateOrder />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />


          <Route path="/productshome" element={<ProductsHome />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/view/:id" element={<Details />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
