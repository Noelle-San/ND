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



                        {location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/forget-pass" && location.pathname !== "/otp" && location.pathname !== "/fav-q" && location.pathname !== "/check-answer" && (
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
                <span className="topbar_items">About Us</span>
                {localStorage.getItem("TOKEN") === "admintoken" && (
                    <>
                        <span className="topbar_items2">|</span>

                        <Link to={"/productshome"} style={{ textDecoration: "none", color: "black" }} >
                            <span className="topbar_items">Products</span>
                        </Link>
                        <span className="topbar_items2">|</span>
                        <Link to={"/all"} style={{ textDecoration: "none", color: "black" }} >
                            <span className="topbar_items">Users</span>
                        </Link>

                    </>
                )}

                {localStorage.getItem("TOKEN") === "usertoken" && (
                    <>
                        <span className="topbar_items2">|</span>

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
                    </>
                )}






                {(location.pathname !== "/signin" && location.pathname !== "/signup" && localStorage.getItem("TOKEN")) && (
                    <>
                        <span className="topbar_items2">|</span>
                        <span className="topbar_items" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: "pointer" }}>Logout</span>
                    </>

                )}




            </div>






            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel"> Confirmation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h3>Are You Sure You Want to Logout?</h3>

                            <p>You will be directed to Signin page</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                                navigate("/signin");
                            }} data-bs-dismiss="modal" >Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar