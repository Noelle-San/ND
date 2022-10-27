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
import TopBar from "./components/TopBar";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
