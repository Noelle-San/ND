import React from "react";
import "./LogoutConfirm.css";
import { Link, useNavigate } from "react-router-dom";

function Modal({ setUpdatePass }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <h1>Password Updated Successfully</h1>

          <p>You will be directed to Signin page</p>

          <div className="footer">
            <button
              onClick={() => {
                setUpdatePass(false);
              }}
              id="cancelBtn"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/signin");
              }}
              id="continuebtn"
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
