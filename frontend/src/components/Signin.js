import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    console.log(username, password);
    axios
      .post("http://localhost:5000/signin", {
        username: formValues.username,
        password: formValues.password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.message === "user") {
          // move to home
          navigate("/home");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("USERNAME", res.data.username);
          localStorage.setItem("NAME", res.data.name);
        }
        if (res.data.message === "admin") {
          // move to home
          navigate("/adminhome");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("USERNAME", res.data.username);
          localStorage.setItem("NAME", res.data.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleforgot = () => {
    console.log(username);
    axios
      .post("http://localhost:5000/forgotPassword", {
        username: formValues.username,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.message === "username") {
          // move to home
          navigate("/forget-pass");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("USERNAME", res.data.username);
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
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 4) {
      errors.username = "Username must be more than 4 characters";
    } else if (values.username.length > 20) {
      errors.username = "Username cannot exceed more than 20 characters";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    } else if (!regexPassword.test(values.password)) {
      errors.password = "This is not a valid Password format!";
    }

    if (JSON.stringify(errors) === "{}") {
      handleSubmit();
    }
    return errors;
  };

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
            {/* <h3>Welcome to our website</h3> */}
          </div>
        </div>
        <div class="topnav"></div>
      </div>
      <div className="container">
        <div className="field">
          <h1 className="center"> Sign in </h1>
          Username
          <input
            name="username"
            onChange={handleChange}
            value={formValues.username}
            className="inputs"
            type="text"
          />{" "}
          <p>{formErrors.username}</p>
          Password
          <input
            name="password"
            onChange={handleChange}
            value={formValues.password}
            className="inputs"
            type="password"
          />{" "}
          <p>{formErrors.password}</p>
        </div>
        <br />

        <button onClick={handleform} className="btns">
          {" "}
          SUBMIT{" "}
        </button>
        <br />
        <button className="signup">
          <Link
            className="button"
            style={{ textAlign: "center", display: "block", marginTop: "5px" }}
            to={"/signup"}
            data-inline="true"
          >
            <label>SIGN UP</label>{" "}
          </Link>
        </button>

        <Link
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          onClick={handleforgot}
          data-inline="true"
        >
          {" "}
          Forget Password{" "}
        </Link>
      </div>
    </>
  );
}

export default Signin;
