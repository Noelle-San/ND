import React, { useEffect, useState } from 'react'
import NavbarLogo from "../assets/images/logo.png"
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css"
import "../styles/TopBar.css"
import LogoutConfirm from "./LogoutConfirm";

const Navbar = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
            navigate("/signin");
        }
    }, []);

    return (
        <>

            {toggle ? <LogoutConfirm setOpenModal={setToggle} /> : null}
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">

                    <img src={NavbarLogo} alt="" className='navbar_imageLogo' />


                    <a className="navbar-brand" href="/">COHORT 97</a>




                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">



                        {location.pathname === "/" && (
                            <>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">Welcome, {localStorage.getItem("NAME")}</a>
                                    </li>


                                </ul>
                            </>

                        )}



                    </div>
                </div>
            </nav>

            <div className="container-fluid topbar_parent">

                <span className="topbar_items">Home</span><span className="topbar_items2">|</span>

                <span className="topbar_items">Contact Us</span><span className="topbar_items2">|</span>
                <span className="topbar_items">About Us</span><span className="topbar_items2">|</span>

                <Link to={"/createorder"} style={{ textDecoration: "none", color: "black" }} >
                    <span className="topbar_items">Products</span>
                </Link>
                <span className="topbar_items2">|</span>

                <Link to={"/orderlist"} style={{ textDecoration: "none", color: "black" }} >
                    <span className="topbar_items">My orders</span>
                </Link>
                <span className="topbar_items2">|</span>

                <Link to={"/cart"} style={{ textDecoration: "none", color: "black" }} >
                    <span className="topbar_items">My Cart</span>
                </Link>


                {location.pathname !== "/signin" && (
                    <>
                        <span className="topbar_items2">|</span>
                        <span className="topbar_items" onClick={() => {
                            setToggle(true);
                        }}>Logout</span>
                    </>

                )}




            </div>
        </>
    )
}

export default Navbar