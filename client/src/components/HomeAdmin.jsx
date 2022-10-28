import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutConfirm from "./LogoutConfirm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserHome.css"

function HomeAdmin() {

  // useEffect(() => {
  //   const admintoken = localStorage.getItem("admintoken");
  //   if (admintoken !== "admintoken") {
  //     alert("You are not authorized to access this page");
  //     window.location.href = "/signin";
  //   }
  // }, []);

  const navigate = useNavigate();

  const [toggleAdmin, setToggleAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== "admintoken") {
      toast("🔴 You are not authorized to view this page !", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: true,
        onClose: () => {
          navigate("/signin");
        },
      });
    }


  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
        limit={1}
      />
      {/* {toggleAdmin ? <LogoutConfirm setOpenModal={setToggleAdmin} /> : null} */}
      <div className="container home_container1">
        <div className="home_container2">
          <h1 className="home_h1">Welcome to the Admin's Home Page !</h1>
        </div>
      </div>
    </>

  );
}

export default HomeAdmin;
