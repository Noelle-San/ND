//* All the AXIOS API calls will be made from here to the backend
//* These functions will be exported and then imported wherever needed

import Axios from "axios";

//* GET ALL PRODUCTS
export const GetallProducts = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/products/");

    return response.data.products;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// Get a particular product with the help of it's id
export const GetProduct = async (id) => {
  try {
    const response = await Axios.get(`http://localhost:5000/products/${id}`);

    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// make a route to add a product to the cart
export const AddProductToCart = async (userdetails) => {
  try {
    const response = await Axios.post(
      "http://localhost:5000/user/addproducttocart",
      userdetails
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//http://localhost:5000/user/getuser

// make a route to get the details of an user with email as input
export const GetUser = async (email) => {
  try {
    const response = await Axios.post("http://localhost:5000/user/getuser", {
      email: email,
    });

    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// get all the orders of a user
export const GetOrders = async (email) => {
  try {
    const response = await Axios.post("http://localhost:5000/user/getorders", {
      email: email,
    });

    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// place a new order http://localhost:5000/user/placeorder

export const PlaceOrder = async (orderdetails) => {
  try {
    const response = await Axios.post(
      "http://localhost:5000/user/placeorder",
      orderdetails
    );

    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// Clear out the cart of a user with the help of email
export const ClearCart = async (email) => {
  try {
    const response = await Axios.post(
      "http://localhost:5000/user/removeallproductsfromcart",
      { email: email }
    );

    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

// get the details of a single order with the help of it's id
export const GetOrder = async (id) => {
  try {
    const response = await Axios.post(
      `http://localhost:5000/user/getorderdetails`,
      { id: id }
    );

    return response.data;
  } catch (error) {
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};
