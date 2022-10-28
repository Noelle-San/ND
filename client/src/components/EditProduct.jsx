import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

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


  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    category: "",
    price: "",
    creationdate: "",
    expiredate: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, category, price, creationdate, expiredate } = inpval;

    const res2 = await fetch(
      `http://localhost:5000/products/updateproduct/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price,
          creationdate,
          expiredate,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {

      toast("🦄 Fill all the data !", {
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
      navigate("/");

    }
  };

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


      <NavLink to="/">home2</NavLink>

      {inpval.name !== "" && (<form className="mt-4">

        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Category
            </label>
            <input
              type="text"
              value={inpval.category}
              onChange={setdata}
              name="category"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              price
            </label>
            <input
              type="number"
              value={inpval.price}
              onChange={setdata}
              name="price"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Creation date
            </label>
            <input
              type="date"
              value={inpval.creationdate}
              onChange={setdata}
              name="creationdate"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Expire date
            </label>
            <input
              type="date"
              value={inpval.expiredate}
              onChange={setdata}
              name="expiredate"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={updateuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>)}

    </div>
  );
};

export default EditProduct;
