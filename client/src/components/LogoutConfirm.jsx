import React from "react";
import "../styles/LogoutConfirm.css";
import { Link, useNavigate } from "react-router-dom";

function Modal({ setOpenModal }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <h1>Are You Sure You Want to Logout?</h1>

          <p>You will be directed to Signin page</p>

          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
              className="signin_btns"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
                navigate("/signin");
              }}
              id="continuebtn"
              className="signin_btns"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
