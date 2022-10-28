import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { GetOrder } from "../service/CohortApi";
import moment from "moment";
import { BiArrowBack } from "react-icons/bi";
import "../styles/OrderDetails.css";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const [orderid, setorderid] = useState("");
    const [orderdetails, setorderdetails] = useState({});
    const [orderisloaded, setorderisloaded] = useState(false);

    const navigate = useNavigate();

    // find the id of the order from the url and save it to a variable
    const id = window.location.pathname.split("/")[2];

    const getorderdetails = async (id) => {
        const response = await GetOrder(id);

        setorderdetails(response);
    };


    useEffect(() => {
        if (id !== undefined) {
            setorderid(id);
            getorderdetails(id);
            setorderisloaded(true);

        }
    }, []);

    // check if orderdetails is empty



    return (
        <>

            <div className="container">
                <h1>Order Details</h1>
                <br />
                <hr />
                <br />

                {/* make a table with 5 headers */}

                {orderdetails.products !== undefined && orderdetails.products.length > 0 ? (
                    <>
                        <div className="  table-container orderlist_parent">
                            <table className="table table-info">
                                <thead>
                                    <tr className="table-info">

                                        <th >
                                            <span style={{ marginRight: 10 }}>Order Id</span>

                                        </th>

                                        <th >
                                            <span style={{ marginRight: 10 }}>Total cost</span>

                                        </th>
                                        {<th >
                                            <span style={{ marginRight: 10 }}>Shipment Date</span>

                                        </th>}

                                        {<th>
                                            <span style={{ marginRight: 10 }}>Creation Date</span>

                                        </th>}

                                        <th>
                                            Order status
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>

                                        <td>
                                            {orderdetails._id}
                                        </td>

                                        {/* td for total cost */}
                                        <td>{orderdetails.totalcost}</td>

                                        <td>{moment(orderdetails.shipmentdate).format("DD/MM/YYYY")}</td>
                                        <td>{moment(orderdetails.creationdate).format("DD/MM/YYYY")}</td>

                                        <td> {orderdetails.status} </td>

                                    </tr>


                                </tbody>




                            </table>
                        </div>

                        <br />

                        <h3>Products included in this order : </h3>

                        <br />


                        {/* // check if orderdetails is empty or not */}


                        {orderdetails.products !== undefined && orderdetails.products.map((product) => (

                            <>
                                <div className="card productlist_card"  >
                                    <div className="card-body">

                                        <div className="productslist_parents">
                                            <div className="productslist_imagediv">
                                                <img src={product.img} className="img-fluid" alt="Phone" />

                                            </div>

                                            <div className="productlist_textdiv">
                                                <h5 className="card-title">{product.name}</h5>

                                                <span className="card-text"><span className='productlist_productid'>Product ID:</span> {product._id} </span> <br />

                                                <span className="card-text"><span className='productlist_productid'>Unit MRP (INR):</span> {product.price} </span> <br />

                                                <span className="card-text"><span className='productlist_productid'>Quantity :</span> {product.qty} </span> <br />
                                                <hr />

                                                <span className="card-text"><span className='productlist_productid'>Total cost (INR):</span> {product.totalprice} </span> <br />





                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <br />
                            </>
                        ))}


                        <div className="orderdetails_btn_div">





                            <button className="btn btn-warning" onClick={() => navigate("/orderlist")}> <BiArrowBack /> Back to the order list page</button>



                        </div>
                    </>
                ) : null}




            </div>
        </>
    );
};

export default OrderDetails;
