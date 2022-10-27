import React from 'react'
import "../styles/TopBar.css"
import { Link } from 'react-router-dom'
const TopBar = () => {
    const items = ['Home', 'Contact Us', 'About Us', 'Products', 'My orders', 'Logout']
    // createorder

    return (
        <>
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
                <span className="topbar_items2">|</span>
                <span className="topbar_items">Logout</span>



            </div>
        </>
    )
}

export default TopBar