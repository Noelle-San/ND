import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import LogoutConfirm from "./LogoutConfirm";

function Home() {
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
      <div>
        <div class="topnav">
          <Link href="/home">
            <img
              src="/images/logo.png"
              alt="logo"
              width="100"
              height="100"
            ></img>
          </Link>
          <div class="topnav-left">
            <h3>COHORT 97</h3>
          </div>

          <div class="topnav-right">
            <h3>Welcome, {localStorage.getItem("NAME")}</h3>
          </div>
        </div>
        <div class="topnav">
          <Link href="home">Home</Link>
          <Link href="#news">Contact Us</Link>
          <Link href="#news">About us</Link>
          <Link href="#news">Products</Link>
          <Link href="#news">My Orders</Link>
          <Link
            className="logout"
            onClick={() => {
              setToggle(true);
            }}
          >
            Logout
          </Link>

          {/* <Link
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          Logout
        </Link> */}
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
    // </div>
  );
}

export default Home;
