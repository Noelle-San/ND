import React from "react";
import "../styles/LogoutConfirm.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ setUpdatePass }) {
  const navigate = useNavigate();
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
              className="signin_btns"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                toast("🦄 New password set !", {
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

              }}
              id="continuebtn"
              className="signin_btns"
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
