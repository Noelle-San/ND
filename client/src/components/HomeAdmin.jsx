import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutConfirm from "./LogoutConfirm";

function HomeAdmin() {
  const navigate = useNavigate();

  const [toggleAdmin, setToggleAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      {toggleAdmin ? <LogoutConfirm setOpenModal={setToggleAdmin} /> : null}
      <div>
        <div class="topnav">
          <a href="home">
            <img
              src="/images/logo.png"
              alt="logo"
              width="100"
              height="100"
            ></img>
          </a>
          <div class="topnav-left">
            <h3>COHORT 97</h3>
          </div>

          <div class="topnav-right">
            <h3>Welcome, {localStorage.getItem("NAME")}</h3>
          </div>
        </div>
        <div class="topnav">
          <a href="home">Home</a>
          <a href="#news">Contact Us</a>
          <a href="#news">About us</a>
          <a href="#news">Products</a>
          <a href="#news">Users</a>
          <a href="#news">Orders</a>
          <a
            className="logout"
            onClick={() => {
              setToggleAdmin(true);
            }}
          >
            Logout
          </a>
          {/* <a
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          Logout
        </a> */}
        </div>
      </div>
    </>
    // <div className="card">
    //   <div>HOME</div>
    //   <div>
    //     <span> {localStorage.getItem("USERNAME")} </span>
    //     <button
    //       onClick={() => {
    //         localStorage.clear();
    //         navigate("/signin");
    //       }}
    //     >
    //       {" "}
    //       LOGOUT{" "}
    //     </button>
    //   </div>
    //   <h1>I am admin boii</h1>
    // </div>
  );
}

export default HomeAdmin;
