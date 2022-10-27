import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LogoutConfirm.css";
import ConfirmPasswordUpdate from "./ConfirmPasswordUpdate";

function ForgetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    cpassword: "",
  };
  const [toggle, setToggle] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [cpassword, setCpassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  const handleCheck = () => {
    console.log();
    axios
      .post("http://localhost:5000/authuser/update-password", {
        username: localStorage.getItem("USERNAME"),
        password: formValues.password,
        cpassword: formValues.cpassword,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.code === 200) {
          // move to home
          setToggle(true);
          // navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleform = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    } else if (!regexPassword.test(values.password)) {
      errors.password = "This is not a valid Password format!";
    }

    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (!(values.password === values.cpassword)) {
      errors.cpassword = "Passwords should be same";
    }

    if (JSON.stringify(errors) === "{}") {
      handleCheck();
    }

    return errors;
  };
  function ClearFields() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    formValues.password = "";
    formValues.cpassword = "";
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
            <h3>Welcome to our website</h3>
          </div>
        </div>
        <div class="topnav">
          <Link to="/signin">Login</Link>
          <Link to="/signup">Registration</Link>
        </div>
      </div>
      {toggle ? <ConfirmPasswordUpdate setUpdatePass={setToggle} /> : null}
      <div className="container">
        <div className="feild">
          <h1 className="center"> Update Password</h1>
          New Password{" "}
          <input
            name="password"
            onChange={handleChange}
            value={formValues.password}
            className="inputs"
            type="password"
          />
          <p>{formErrors.password}</p>
          Confirm Password{" "}
          <input
            name="cpassword"
            onChange={handleChange}
            value={formValues.cpassword}
            className="inputs"
            type="password"
          />
          <p>{formErrors.cpassword}</p>
        </div>
        <br />
        <button className="btns" onClick={handleform}>
          {" "}
          RESET PASSWORD{" "}
        </button>
        <br />
        <button className="btns" onClick={ClearFields}>
          {" "}
          CLEAR{" "}
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
