import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai'



const ProductsHome = () => {

    // check local storage for TOKEN
    // if TOKEN not equal to admintoken then redirect to signin page
    // give an alert to user that you are not authorized to access this page
    // if TOKEN equal to admintoken then show the page

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


    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);



    const getdata = async () => {

        const res = await fetch("http://localhost:5000/products/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data.products)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        console.log(id);

        const res2 = await fetch(`http://localhost:5000/products/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });



        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
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
        } else {

            toast("🔴 Product Deleted !", {
                position: "top-right",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                closeButton: true,
                onClose: () => {


                    getdata();
                },
            });

        }

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


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/add-product" className="btn btn-primary">Add Product</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col" style={{ color: "white" }} >Project ID</th>
                                <th scope="col" style={{ color: "white" }} >Product Name</th>
                                <th scope="col" style={{ color: "white" }} >Category</th>
                                <th scope="col" style={{ color: "white" }} >MRP</th>
                                <th scope="col" style={{ color: "white" }} >Creation date</th>
                                <th scope="col" style={{ color: "white" }} >Expire date</th>
                                <th scope="col" style={{ color: "white" }} ></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.length > 0 && getuserdata.map((element, id) => {

                                    return (
                                        <>

                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.category}</td>
                                                <td>{element.price}</td>
                                                <td>{element.creationdate.slice(0, 10)}</td>
                                                <td>{element.expiredate.slice(0, 10)}</td>
                                                <td >


                                                    <FiEdit onClick={() => {
                                                        Navigate(`/edit-product/${element._id}`)
                                                    }}
                                                        style={{ color: "blue", cursor: "pointer", marginRight: "10px", fontSize: "20px", textDecoration: "none" }} />


                                                    <AiOutlineDelete onClick={() => deleteuser(element._id)}
                                                        style={{ color: "red", cursor: "pointer", marginRight: "10px", fontSize: "20px", textDecoration: "none" }}
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default ProductsHome

















