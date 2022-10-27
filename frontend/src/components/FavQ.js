import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      .post("http://localhost:5000/check-answer", {
        username: localStorage.getItem("USERNAME"),
        secretA: secretA,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("Answer is not matching");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
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
      <div className="Head">
        <div class="topnav">
          <a href="/home">
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
            <h3>Hi, {localStorage.getItem("USERNAME")}</h3>
          </div>
        </div>
        <div class="topnav">
          <Link to="/signin">Login</Link>
          <Link to="/signup">Registration</Link>
        </div>
      </div>
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
        <button className="btns" onClick={handleCheck}>
          {" "}
          CHECK{" "}
        </button>
        <br />
        <button className="btns" onClick={ClearFields}>
          {" "}
          RESET{" "}
        </button>
        {/* <div>HOME</div>
      <div>
        <span> {localStorage.getItem("USERNAME")} </span>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          {" "}
          LOGOUT{" "}
        </button>
      </div> */}
      </div>
    </>
  );
}

export default ForgetPassword;
