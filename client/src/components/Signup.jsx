import { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    age: "",
    sex: "",
    location: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    secretQ: "",
    secretA: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    console.log();
    axios
      .post("http://localhost:5000/authuser/signup", {
        name: formValues.name,
        age: formValues.age,
        sex: formValues.sex,
        location: formValues.location,
        phone: formValues.phone,
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
        secretQ: formValues.secretQ,
        secretA: formValues.secretA,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {

          toast("🦄 Creating your account !", {
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


        } else if (res.data.code === 201) {

          toast("🦄 User is already there !", {
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
        } else {
          toast("🔴 Error, try again later !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,

          });
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
    const regexSecretA = /^[0-9a-zA-Z]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    const regexPhone = /^[7-9]{1}[0-9]{9}/;

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length > 30) {
      errors.name = "Name cannot exceed more than 30 characters";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (values.phone.length > 10) {
      errors.phone = "Phone number cannot be more than 10 numbers";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "This is not a valid phone number";
    }

    if (!values.age) {
      errors.age = "Age is required";
    } else if (values.age < 18) {
      errors.age = "Age cannot be less than 18";
    } else if (values.age > 55) {
      errors.age = "Age cannot be more than 55";
    }

    if (values.sex.length > 1) {
      errors.sex = "Just give a letter M(Male), F(female), U(Undisclosed) ";
    } else if (
      !(values.sex === "M" || values.sex === "F" || values.sex === "U")
    ) {
      errors.sex = "It can only be M(Male) , F(Female) , U(Undisclosed) ";
    }

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 4) {
      errors.username = "Username must be more than 4 characters";
    } else if (values.username.length > 20) {
      errors.username = "Username cannot exceed more than 20 characters";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
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

    if (values.location === "") {
      errors.location = "Select a city";
    }

    if (values.secretQ === "") {
      errors.secretQ = "Select a question";
    }
    if (!values.secretA) {
      errors.secretA = "Secret answer is required";
    } else if (!regexSecretA.test(values.secretA)) {
      errors.secretA = "Only text and numbers are allowed";
    }

    if (JSON.stringify(errors) === "{}") {
      handleSubmit();
    }

    return errors;
  };
  function ClearFields() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    formValues.name = "";
    formValues.age = "";
    formValues.sex = "";
    formValues.location = "";
    formValues.phone = "";
    formValues.email = "";
    formValues.username = "";
    formValues.password = "";
    formValues.secretQ = "";
    formValues.secretA = "";
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

      <div className="containerreg">


        <div className="field">
          <h1 className="center">Register Yourself</h1>
          <b>
            <label>Name</label>
          </b>
          <br />
          <input
            name="name"
            onChange={handleChange}
            value={formValues.name}
            className="inputs"
            type="text"
          />

          <p>{formErrors.name}</p>

          <b>
            {" "}
            <label>Age</label>
          </b>
          <br />
          <input
            name="age"
            onChange={handleChange}
            value={formValues.age}
            className="inputs"
            type="Number"
          />

          <p>{formErrors.age}</p>

          <b>
            {" "}
            <label>Sex</label>
          </b>
          <br />
          <input
            name="sex"
            onChange={handleChange}
            value={formValues.sex}
            className="inputs"
            type="text"
          />

          <p>{formErrors.sex}</p>

          <b>
            <label>Location</label>
          </b>
          <br />
          <select
            name="location"
            onChange={handleChange}
            value={formValues.location}
            className="inputs"
          >
            <option></option>
            <option>Amaravati</option>
            <option>Itanagar</option>
            <option>Dispur</option>
            <option>Patna</option>
            <option>Raipur</option>
            <option>Porvorim</option>
            <option>Gandhinagar</option>
            <option>Chandigarh</option>
            <option>Shimla</option>
            <option>Dharamshala</option>
            <option>Ranchi</option>
            <option>Bangalore</option>
            <option>Belgaum</option>
            <option>Thiruvananthapuram</option>
            <option>Bhopal</option>
            <option>Mumbai</option>
            <option>Imphal</option>
            <option>Shillong</option>
            <option>Aizawl</option>
            <option>Kohima</option>
            <option>Bhubaneswar</option>
            <option>Chandigarh</option>
            <option>Jaipur</option>
            <option>Gangtok</option>
            <option>Chennai</option>
            <option>Hyderabad</option>
            <option>Agartala</option>
            <option>Lucknow</option>
            <option>Dehradun</option>
            <option>Kolkata</option>
          </select>
          {/* <input
      name="location"
      onChange={handleChange}
      value={formValues.location}
      className="inputs"
      type="text"
    /> */}

          <p>{formErrors.location}</p>

          <b>
            {" "}
            <label>Phone</label>
          </b>
          <br />
          <input
            name="phone"
            onChange={handleChange}
            value={formValues.phone}
            className="inputs"
            type="tel"
          />

          <p>{formErrors.phone}</p>

          <b>
            {" "}
            <label>Email</label>
          </b>
          <br />
          <input
            name="email"
            onChange={handleChange}
            value={formValues.email}
            className="inputs"
            type="email"
          />
          <p>{formErrors.email}</p>

          <b>
            {" "}
            <label>Username</label>
          </b>
          <input
            name="username"
            onChange={handleChange}
            value={formValues.username}
            className="inputs"
            type="text"
          />

          <p>{formErrors.username}</p>

          <b>
            <label>Password</label>
          </b>
          <input
            name="password"
            onChange={handleChange}
            value={formValues.password}
            className="inputs"
            type="password"
          />

          <p>{formErrors.password}</p>

          <b>
            <label>Secret Question</label>
          </b>
          <select
            name="secretQ"
            onChange={handleChange}
            value={formValues.secretQ}
            className="inputs"
          >
            <option></option>
            <option>Who is your favourite hero?</option>
            <option>What is your favourite country?</option>
            <option>What is your favourite food?</option>
            <option>What is your favourite Programming language?</option>
            <option>What is your favourite colour?</option>
            <option>What is your favourite T.V show?</option>
          </select>
          {/* <input
      name="secretQ"
      onChange={handleChange}
      value={formValues.secretQ}
      className="inputs"
      type="text"
    /> */}

          <p>{formErrors.secretQ}</p>

          <b>
            <label>Secret Answer</label>
          </b>
          <input
            name="secretA"
            onChange={handleChange}
            value={formValues.secretA}
            className="inputs"
            type="text"
          />

          <p>{formErrors.secretA}</p>
        </div>
        <br />
        <button onClick={handleform} className="signin_btns">
          SUBMIT
        </button>
        <br />
        <button onClick={ClearFields} className="signin_btns">
          RESET
        </button>

      </div>
    </>
  );
}

export default Signup;
