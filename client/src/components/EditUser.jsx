import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FormControl, FormGroup, Typography, Button, Input, InputLabel } from '@mui/material';


import { editUser, getUser } from '../service/api';
import { useNavigate, useParams } from 'react-router-dom';



const Container = styled(FormGroup)`
    font-size: 20px;
    width: 45%;
    margin: 2% auto 7% auto;
    & > div {
        margin-top: 20px;
    }
`

const defaultValue = {
    name: '',
    age: '',
    sex: '',
    location: '',
    email: '',
    phone: '',
}


const EditUser = () => {

    const [user, setUser] = useState(defaultValue);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadUserDetails();
    }, [])

    const loadUserDetails = async () => {
        const response = await getUser(id);
        setUser(response.data);
    }

    const editUserDetails = async () => {
        await editUser(user, id);
        navigate('/all');

    }

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }





    return (
        <Container>
            <Typography variant="h3">EDIT USER -- <b>{user.name} </b></Typography><br />
            <FormControl>
                <InputLabel required id="outlined-required">Name </InputLabel> <br />
                <Input onChange={(e) => onValueChange(e)} name="name" value={user.name} />
            </FormControl>

            <FormControl>
                <InputLabel required id="outlined-required">Age</InputLabel> <br />
                <Input onChange={(e) => onValueChange(e)} name="age" value={user.age} />
            </FormControl>

            <FormControl>
                <InputLabel required id="outlined-required">Sex </InputLabel> <br />
                <Input onChange={(e) => onValueChange(e)} name="sex" value={user.sex} />
            </FormControl>

            <FormControl>
                <InputLabel required id="outlined-required">Location</InputLabel> <br />
                <Input onChange={(e) => onValueChange(e)} name="location" value={user.location} />
            </FormControl>

            <FormControl>
                <InputLabel required id="outlined-required">Email </InputLabel> <br />
                <Input onChange={(e) => onValueChange(e)} name="email" value={user.email} />
            </FormControl>

            <FormControl>
                <InputLabel required id="outlined-required">Phone No:</InputLabel> <br />
                <Input onChange={(e) => onValueChange(e)} name="phone" value={user.phone} />
            </FormControl>


            <FormControl>
                <Button variant="contained" onClick={() => editUserDetails()}>Update User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;

