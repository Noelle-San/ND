import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import "../styles/Cart.css"
import { GetProduct, AddProductToCart, GetUser, PlaceOrder, ClearCart } from '../service/CohortApi';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";



const Cart = () => {
    const [oldproducts, setoldproducts] = useState([]);
    const [defaultemail, setdefaultemail] = useState(localStorage.getItem("EMAIL"));
    const [order, setorder] = useState({ email: "", totalcost: 0, shipmentdate: "", creationdate: "", products: [] });
    const Navigate = useNavigate();
    var totalcartcost = 0;

    // to load the product details with the product id
    useEffect(() => {

        console.log(defaultemail);
        const fetchClubData = async () => {
            const response = await GetUser(defaultemail);
            setoldproducts(response.cartproducts);
        };
        fetchClubData();
    }, []);


    // total cart price
    if (oldproducts.length > 0) {
        totalcartcost = oldproducts.reduce((a, b) => a + b.totalprice, 0);
    }

    const getlatestshipmentdate = () => {
        var latestshipmentdate = oldproducts[0].shipmentdate;
        for (var i = 1; i < oldproducts.length; i++) {
            if (new Date(oldproducts[i].shipmentdate) > new Date(latestshipmentdate)) {
                latestshipmentdate = oldproducts[i].shipmentdate;
            }
        }

        return latestshipmentdate;
    }

    // get the current date in dd/mm/yyyy format

    const getcurrentdate = () => {
        var date = new Date();

        return date;
    }


    // place order
    const placeorder = async () => {

        setorder({ email: defaultemail, totalcost: totalcartcost, shipmentdate: getlatestshipmentdate(), creationdate: getcurrentdate(), products: oldproducts });

    }


    // check the order details if it is not empty

    useEffect(() => {
        const sendorder = async () => {

            const response = await PlaceOrder(order);

        }

        if (order.products.length > 0) {
            sendorder();
            // clear out the order.products array
            toast("🦄 Order placed !", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                closeButton: true,
                onClose: () => {
                    Navigate("/orderlist");
                },
            });
            setorder({ email: "", totalcost: 0, shipmentdate: "", creationdate: "", products: [] });
            ClearCart(defaultemail)
        }

    }, [order]);




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
            />
            <br />
            <div className="container cart_main_parent">
                <div className="dropdown_parent">
                    <h2>My Cart </h2>

                </div>


                <hr />
                <br />
                <br />

                <div className="cart_parent">

                    {oldproducts.map((product) => (
                        <>
                            <div className="card cart_card"   >
                                <div className="card-body">

                                    <h1 className='cart_header1'>{product.name}</h1>
                                    <hr />
                                    <br />
                                    <div className="cart_parents">
                                        <div className="cart_imagediv">
                                            <img src={product.img} className="img-fluid" alt="Phone" />

                                        </div>

                                        <div className="cart_textdiv">


                                            <span className="card-text"><span className='cart_productid'>Product ID :</span> {product.productid} </span> <br />

                                            <span className="card-text"><span className='cart_productid'>Unit MRP (INR) :</span> {product.price} </span> <br />

                                            <span className="card-text"><span className='cart_productid'>Quantity :</span> {product.qty} </span> <br />

                                            <hr />

                                            <span className="card-text"><span className='cart_productid'>Total Cost(INR) :</span> {product.totalprice} </span> <br />



                                        </div>
                                    </div>


                                </div>
                            </div>
                        </>
                    ))}



                </div>

                <hr />


                <div className="total_parent">
                    <div>
                        <h3>Total cost of the order (INR) : {totalcartcost} </h3>
                        <button className='btn btn-warning' onClick={() => { placeorder() }}>Place order</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart