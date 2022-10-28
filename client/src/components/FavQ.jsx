import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const navigate = useNavigate();
  const [username, setUsename] = useState("");
  const [secretA, setSecretA] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  const handleCheck = () => {
    console.log(username, secretA);
    axios
      .post("http://localhost:5000/authuser/checkAnswer", {
        username: localStorage.getItem("USERNAME"),
        secretA: secretA,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          toast("🦄 Answer is not matching !", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
        }
        if (res.data.code === 404) {
          toast("🦄 Wrong password !", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
        }
        if (res.data.message === "username") {
          // move to home
          navigate("/check-answer");

          localStorage.setItem("USERNAME", res.data.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function ClearFields() {
    let inputs = document.querySelectorAll("#in");
    inputs.forEach((input) => (input.value = ""));
  }

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

      <div className="container">
        <div className="field">
          <h1 className="center"> Forget Password</h1>
          <h4></h4>
          Secret Question{" "}
          <input
            value={localStorage.getItem("SECRETQUESTION")}
            className="inputs"
            type="text"
          />
          <br />
          <br />
          Secret Answer <br></br>
          <input
            id="in"
            value={secretA}
            className="inputs"
            onChange={(e) => {
              setSecretA(e.target.value);
            }}
            type="text"
          />
        </div>
        <br />
        <div className="favq_buttons_div" style={{ display: "flex", justifyContent: "center" }}>
          <button className="signin_btns" onClick={handleCheck}
            style={{ marginRight: "1rem" }}
          >

            CHECK
          </button>

          <button className="signin_btns" onClick={ClearFields}
            style={{ marginRight: "1rem" }}
          >

            CLEAR
          </button>
        </div>

      </div>
    </>
  );
}

export default ForgetPassword;
