import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar';
import { GetProduct, AddProductToCart, GetUser } from '../service/CohortApi';
import "../styles/ProductDetails.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
    // get the product id from the url
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [singleprod, setsingleprod] = useState({ productid: "", name: "", img: "", price: 0, qty: 0, shipmentdate: "", totalprice: 0 });
    const [dateStart, setDateStart] = useState(new Date());
    const [cart, setcart] = useState({ email: "", cartproducts: [] });
    const [oldproducts, setoldproducts] = useState([]);
    const [newproducts, setnewproducts] = useState([]);

    const [defaultemail, setdefaultemail] = useState(localStorage.getItem("EMAIL"));
    const Navigate = useNavigate();

    // to load the product details with the product id
    useEffect(() => {


        const fetchClubData = async () => {
            const response = await GetProduct(params.id);
            setsingleprod({ productid: response._id, name: response.name, img: response.img, price: response.price });
            setTotalPrice(response.price);
            const response2 = await GetUser(defaultemail);
            setoldproducts(response2.cartproducts);
        };
        fetchClubData();
    }, []);


    useEffect(() => {
        if (singleprod.productid !== "") {
            setnewproducts([...newproducts, singleprod]);
        }
    }, [singleprod]);


    // handles the date picker
    function onChangeHandler(value) {
        setDateStart(value);
    }


    const addingToCart = async () => {
        // set the single product qty, shipment date and total price
        singleprod.qty = quantity;
        singleprod.shipmentdate = dateStart;
        singleprod.totalprice = totalPrice;



        // set the cart products
        cart.email = defaultemail;

        cart.cartproducts = oldproducts.concat(newproducts);
        const response = await AddProductToCart(cart);

        if (response.sucess === "sucess") {
            toast("🦄 Added to cart !", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                closeButton: true,
                onClose: () => {
                    Navigate("/cart");
                },
            });
        }
    }


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

            <div className="container productdetails_parent">
                <div className="card productdetails_card"   >
                    <div className="card-body">

                        <h1 className='productdetails_header1'>Finalize your order</h1>
                        <hr />
                        <br />
                        <div className="productdetails_parents">
                            <div className="productdetails_imagediv">
                                <img src={singleprod.img} className="img-fluid" alt="Phone" />

                            </div>

                            <div className="productdetails_textdiv">
                                <h5 className="card-title">{singleprod.name}</h5>

                                <span className="card-text"><span className='productdetails_productid'>Product ID:</span> {singleprod.productid} </span> <br />

                                <span className="card-text"><span className='productdetails_productid'>Total Cost(INR):</span> {totalPrice} </span> <br />

                                <div className="productdetails_textdiv_user">


                                    <div className="productdetails_textdiv_user_quantity">
                                        <span className="card-text"><span className='productdetails_productid'>Quantity</span></span> <br />
                                        <AiOutlinePlusSquare className='qty_plus' onClick={() => {
                                            setQuantity(quantity + 1);
                                            setTotalPrice(singleprod.price * (quantity + 1));
                                        }} />
                                        <span className='productdetails_textdiv_user_quantity_number'>{quantity}</span>
                                        <AiOutlineMinusSquare className='qty_minus' onClick={() => {
                                            { quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1) }

                                            { quantity > 1 ? setTotalPrice(singleprod.price * (quantity - 1)) : setTotalPrice(singleprod.price) }
                                        }} />
                                    </div>
                                    {/* shipment date */}

                                    <div className="productdetails_textdiv_user_shipment">
                                        <span className="card-text"><span className='productdetails_productid '>Shipment Date:</span>  </span>
                                        <DatePicker
                                            id="dateStartEnd"
                                            selected={dateStart}
                                            onChange={onChangeHandler}
                                            dateFormat="dd MMM yyyy"
                                            className={'form-control form-control-sm'}
                                            showDisabledMonthNavigation
                                            minDate={new Date()}
                                        />
                                    </div>

                                    <div className="addtocart_btn_div">
                                        <button className='btn btn-warning addtocart_button' onClick={() => {
                                            addingToCart();
                                        }} >Add to cart</button>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetails