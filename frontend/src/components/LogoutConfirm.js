import React from "react";
import "./LogoutConfirm.css";
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
            >
              Cancel
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/signin");
              }}
              id="continuebtn"
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
