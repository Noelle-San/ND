import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { useNavigate } from 'react-router-dom'
import { GetallProducts } from '../service/CohortApi';
import "../styles/CreateOrder.css"

const CreateOrder = () => {

    const [products, setproducts] = useState([]);


    useEffect(() => {

        const fetchClubData = async () => {

            const response = await GetallProducts();
            setproducts(response);

        };
        fetchClubData();
    }, []);

    const navigate = useNavigate();

    const handleClick = (productID) => {
        navigate(`/productdetails/${productID}`)
    }


    return (
        <>


            <div className="container">
                <h1 className='productslist_header1'>Products list</h1>
                <hr className='productslist_hr1' />
                <br />
                <br />

                {products.map((product) => (

                    <>
                        <div className="card productlist_card" onClick={() => { handleClick(product._id) }} >
                            <div className="card-body">

                                <div className="productslist_parents">
                                    <div className="productslist_imagediv">
                                        <img src={product.img} className="img-fluid product_image" alt="Phone" />

                                    </div>

                                    <div className="productlist_textdiv">
                                        <h5 className="card-title">{product.name}</h5>

                                        <span className="card-text"><span className='productlist_productid'>Product ID:</span> {product._id} </span> <br />

                                        <span className="card-text"><span className='productlist_productid'>MRP (INR):</span> {product.price} </span> <br />



                                    </div>
                                </div>


                            </div>
                        </div>
                        <br />
                    </>
                ))}
            </div>
        </>
    )
}

export default CreateOrder