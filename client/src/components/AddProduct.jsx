import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {

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

    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        name: "",
        category: "",
        img: "https://i.ibb.co/DVP7qqR/iphone-14-finish-select-202209-6-1inch-blue-removebg-preview.png",
        price: "",
        creationdate: "",
        expiredate: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, category, img, price, creationdate, expiredate } = inpval;

        const res = await fetch("http://localhost:5000/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, category, img, price, creationdate, expiredate
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

            toast("🦄 Error, try again later !", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                closeButton: true,

            });

        } else {
            toast("🦄 Product added !", {
                position: "top-right",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                closeButton: true,
                onClose: () => {
                    navigate("/productshome");
                },
            });



        }
    }

    return (
        <div className="container">
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
            <NavLink to="/">home</NavLink>
            <form className="mt-4">

                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Product Name</label>
                        <input type="text" value={inpval.nameame} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Category</label>
                        <input type="text" value={inpval.category} onChange={setdata} name="category" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">price</label>
                        <input type="number" value={inpval.price} onChange={setdata} name="price" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Creation date</label>
                        <input type="date" value={inpval.creationdate} onChange={setdata} name="creationdate" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Expire date</label>
                        <input type="date" value={inpval.expiredate} onChange={setdata} name="expiredate" class="form-control" id="exampleInputPassword1" />
                    </div>


                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddProduct;
