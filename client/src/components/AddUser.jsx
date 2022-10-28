import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  FormControl,
  FormGroup,
  Typography,
  Button,
  Input,
  InputLabel,
} from "@mui/material";

import { addUser } from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled(FormGroup)`
  width: 45%;
  font-size: 20px;
  margin: 2% auto 7% auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
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

const AddUser = () => {



  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== "admintoken") {
      toast("🔴 You are not authorized to view this page !", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: true,
        onClose: () => {
          Navigate("/signin");
        },
      });
    }


  }, []);


  const [user, setUser] = useState(defaultValue);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {


    if (user.name.length <= 0) {
      toast("🔴 Name must not be empty !", {
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

    if (user.name.length < 6) {
      toast("🔴 Name must not be less than 6 characters !", {
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

    if (user.name.length > 50) {
      toast("🔴 Name must not be longer than 50 characters !", {
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


    // age must be a number, not empty, not less than 18, not more than 100
    if (user.age.length < 1) {
      toast("🔴 Age must not be empty !", {
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

    if (user.age < 18) {
      toast("🔴 Age must not be less than 18 !", {
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

    if (user.age > 100) {
      toast("🔴 Age must not be more than 100 !", {
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

    if (user
      .age
      .toString()
      .match(/^[0-9]+$/) === null) {
      toast("🔴 Age must be a number !", {
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


    if (user.sex.length < 1 || user.sex.length > 1) {
      toast("🔴 Sex must either be M, F, U !", {
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


    // location must not be empty, not less than 6, not more than 50
    if (user.location.length < 1) {
      toast("🔴 Location must not be empty !", {
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

    if (user.location.length < 6) {
      toast("🔴 Location must not be less than 6 characters !", {
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

    if (user.location.length > 50) {
      toast("🔴 Location must not be longer than 50 characters !", {
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


    // a regex to check if the email is valid

    if (user.email.length < 1) {
      toast("🔴 Email must not be empty !", {
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

    if (user.email.length < 6) {
      toast("🔴 Email must not be less than 6 characters !", {
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

    if (user.email.length > 50) {
      toast("🔴 Email must not be longer than 50 characters !", {
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

    if (user
      .email
      .match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null) {
      toast("🔴 Email is not valid !", {
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






    // phone number must be a number, it must be 10 digits, must be less than 9999999999 
    if (user.phone.length < 1) {
      toast("🔴 Phone number must not be empty !", {
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

    if (user.phone.length < 10) {
      toast("🔴 Phone number must not be less than 10 digits !", {
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

    if (user.phone.length > 10) {
      toast("🔴 Phone number must not be more than 10 digits !", {
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

    if (user
      .phone
      .toString()
      .match(/^[0-9]+$/) === null) {
      toast("🔴 Phone number must be a number !", {
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

    if (user.phone > 9999999999) {
      toast("🔴 Phone number must not be more than 10 digits !", {
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





    const newuser = await addUser(user);
    console.log(newuser);

    if (newuser.exists === true) {
      toast("🦄 User already exists !", {
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

    if (newuser.exists === false) {
      toast("🦄 User added !", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: true,
        onClose: () => {
          navigate("/all");
        },
      });
    }





  };

  return (
    <Container>
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

      <h1
        style={{ textAlign: "center" }}>Add new user</h1>
      <br />
      <FormControl>
        <InputLabel required id="outlined-required">
          Name{" "}
        </InputLabel>{" "}
        <br />
        <Input onChange={(e) => onValueChange(e)} name="name" />
      </FormControl>

      <FormControl>
        <InputLabel required id="outlined-required">
          Age
        </InputLabel>{" "}
        <br />
        <Input onChange={(e) => onValueChange(e)} name="age" />
      </FormControl>

      <FormControl>
        <InputLabel required id="outlined-required">
          Sex{" "}
        </InputLabel>{" "}
        <br />
        <Input onChange={(e) => onValueChange(e)} name="sex" />
      </FormControl>

      <FormControl>
        <InputLabel required id="outlined-required">
          Location
        </InputLabel>{" "}
        <br />
        <Input onChange={(e) => onValueChange(e)} name="location" />
      </FormControl>

      <FormControl>
        <InputLabel required id="outlined-required">
          Email{" "}
        </InputLabel>{" "}
        <br />
        <Input onChange={(e) => onValueChange(e)} name="email" />
      </FormControl>

      <FormControl>
        <InputLabel required id="outlined-required">
          Phone No:
        </InputLabel>{" "}
        <br />
        <Input onChange={(e) => onValueChange(e)} name="phone" />
      </FormControl>

      <FormControl>
        {/* <Button variant="contained" onClick={() => addUserDetails()}>
          Add User
        </Button> */}
        <button className="btn btn-warning" style={{ width: "auto !important", marginRight: "1rem", fontWeight: "600", paddingLeft: "1rem", paddingRight: "1rem" }} onClick={() => addUserDetails()} >
          Add User
        </button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
