import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Signin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .post("http://localhost:5000/authuser/signin", {
        username: formValues.username,
        password: formValues.password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {

          toast("🦄 User not found !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
          return;
        }
        if (res.data.code === 404) {
          toast("🦄 Wrong credentials !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
          return;
        }
        if (res.data.message === "user") {
          // move to home

          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("USERNAME", res.data.username);
          localStorage.setItem("NAME", res.data.name);
          localStorage.setItem("EMAIL", res.data.email);
          toast("🦄 Logging you in !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,
            onClose: () => {
              navigate("/");
            }
          });
          return;
        }
        if (res.data.message === "admin") {
          // move to home
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("USERNAME", res.data.username);
          localStorage.setItem("NAME", res.data.name);
          toast("🦄 Logging you in !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,
            onClose: () => {
              navigate("/adminhome");
            }
          });
          return;


        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleforgot = () => {
    console.log(formValues.username);

    if (formValues.username === "") {

      toast("🦄 Please Enter Username !", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: true,

      });
      return;
    }

    axios
      .post("http://localhost:5000/authuser/forgotPassword", {
        username: formValues.username,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          toast("🦄 User not found !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
          return;
        }
        if (res.data.code === 404) {
          toast("🦄 Wrong credentials !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
          return;
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

      <div className="signin_container">
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

        <button onClick={handleform} className="signin_btns">
          {" "}
          SUBMIT{" "}
        </button>
        <br />
        <button className="signin_btns">
          <Link

            style={{ textAlign: "center", display: "block", marginTop: "5px", color: "white" }}
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
