import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FormControl, FormGroup, Typography, Button, Input, InputLabel } from '@mui/material';


import { editUser, getUser } from '../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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

    useEffect(() => {
        loadUserDetails();
    }, [])

    const loadUserDetails = async () => {
        const response = await getUser(id);
        setUser(response.data);
    }

    const editUserDetails = async () => {
        await editUser(user, id);
        toast("🦄 User updated !", {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: true,
            onClose: () => {
                navigate('/all');
            },
        });


    }

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }





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
                style={{ color: "black", textAlign: "center", marginTop: "2%" }}
            >Edit User - {user.name}</h1>
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


            {/* <FormControl>
                <Button variant="contained" onClick={() => editUserDetails()}>Update User</Button>
            </FormControl> */}

            <div className="editproducts_btn_div"
                style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
            >
                <button type="submit" onClick={() => editUserDetails()} class="btn btn-warning" style={{ width: "auto", marginRight: "1rem", fontWeight: "600", paddingLeft: "1rem", paddingRight: "1rem" }}>
                    Update data
                </button>
                <button type="submit" onClick={() => { Navigate("/all") }} class="btn btn-warning" style={{ width: "auto", fontWeight: "600", paddingLeft: "1rem", paddingRight: "1rem" }}>
                    Back to users list
                </button>
            </div>


        </Container>
    )
}

export default EditUser;

