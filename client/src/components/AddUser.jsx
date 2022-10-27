import { useState } from "react";
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
  const [user, setUser] = useState(defaultValue);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {

    // name must not be longer than 50 characters

    if (user.name.length > 50) {
      alert("Name must not be longer than 50 characters");
      return;
    }

    // age must be a number between 0 and 55

    if (isNaN(user.age) || user.age < 0 || user.age > 55) {
      alert("Age must be a number between 0 and 55");
      return;
    }


    // phone must be a number between 0 and 9999999999 and not less than 10 digits

    if (isNaN(user.phone) || user.phone < 0 || user.phone > 9999999999 || user.phone.toString().length < 10) {
      alert("Phone must be a number between 0 and 9999999999 and not less than 10 digits");
      return;
    }



    await addUser(user);
    navigate("/all");
  };

  return (
    <Container>
      <Typography variant="h3">
        <b>ADD NEW USER</b>
      </Typography>
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
        <Button variant="contained" onClick={() => addUserDetails()}>
          Add User
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
