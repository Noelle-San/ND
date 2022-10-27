import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const initialValues = {
    phone: "",
    name: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // const [username, setUsername] = useState("");
  // const [phone, setPhone] = useState("");
  // const [name, setName] = useState("");
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
      .post("http://localhost:5000/authuser/fav-q", {
        username: localStorage.getItem("USERNAME"),
        phone: formValues.phone,
        name: formValues.name,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("Phone and Name is not Matching with user");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.message === "username") {
          // move to home
          navigate("/fav-q");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("USERNAME", res.data.username);
          localStorage.setItem("SECRETQUESTION", res.data.secretQ);
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

    if (JSON.stringify(errors) === "{}") {
      handleCheck();
    }
    return errors;
  };
  function ClearFields() {
    let inputs = document.querySelectorAll("#in");
    inputs.forEach((input) => (input.value = ""));
    formValues.phone = "";
    formValues.name = "";
  }

  return (
    <>

      <div className="container">
        <div className="field">
          <h1 className="center"> Forgot Password</h1>
          Username{" "}
          <input
            value={localStorage.getItem("USERNAME")}
            className="inputs"
            type="text"
          />
          <br />
          <br />
          Phone
          <br />
          <input
            id="in"
            name="phone"
            onChange={handleChange}
            value={formValues.phone}
            className="inputs"
            type="tel"
          />
          <p>{formErrors.phone}</p>
          Name
          <br />
          <input
            id="in"
            name="name"
            onChange={handleChange}
            value={formValues.name}
            className="inputs"
            type="text"
          />
          <p>{formErrors.name}</p>
        </div>
        <br />

        <button className="btns" onClick={handleform}>
          {" "}
          CHECK{" "}
        </button>
        <br />
        <button className="btns" onClick={ClearFields}>
          {" "}
          CLEAR{" "}
        </button>
      </div>
    </>
  );
}

export default Home;
