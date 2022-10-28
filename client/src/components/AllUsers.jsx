import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Button,
} from "@mui/material";
import { getUsers, deleteUser } from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai'


const StyledTable = styled(Table)`
  width: 90%;
  margin: 70px auto 0 auto;
`;

const THead = styled(TableRow)`
   background: #252424;
   borderRadius: 10px;

   & > th {
     color: #fff;
     font-size: 20px;
     font-weight: bold;
   }
 `;

const TBody = styled(TableRow)`
  & > td {
    font-size: 16px;
  }
`;

const AllUsers = () => {

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


  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
    console.log(response.data);
  };

  const deleteUserDetails = async (id) => {
    await deleteUser(id);

    toast("🦄 User deleted !", {
      position: "top-right",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      closeButton: true,
      onClose: () => {
        getAllUsers();
      },
    });




  };

  return (
    <div>

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
      {" "}

      <div className="container" style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
        <h1
          style={{ color: "black" }}
        >All Users</h1>

        <button className="btn btn-warning"
          style={{ width: "auto", marginRight: "1rem", fontWeight: "600", paddingLeft: "1rem", paddingRight: "1rem" }}
          onClick={() => Navigate("/add")}
        >

          Add User</button>
      </div>


      <div

      >


      </div>

      <StyledTable>

        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TBody key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.sex}</TableCell>
              <TableCell>{user.location}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>

              <TableCell>
                <FiEdit onClick={() => {
                  Navigate(`/edit/${user._id}`)
                }}
                  style={{ color: "blue", cursor: "pointer", marginRight: "10px", fontSize: "20px" }} />


                <AiOutlineDelete onClick={() => deleteUserDetails(user._id)}
                  style={{ color: "red", cursor: "pointer", marginRight: "10px", fontSize: "20px" }}
                />



              </TableCell>
            </TBody>
          ))}
        </TableBody>
      </StyledTable>



    </div>
  );
};

export default AllUsers;

// import React, { useState, useEffect, useContext } from 'react'
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import CreateIcon from '@mui/icons-material/Create';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineDelete } from 'react-icons/ai'
// import { getUsers, deleteUser } from "../service/api";

// const AllUsers = () => {

//   const Navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("TOKEN") !== "admintoken") {
//       toast("🔴 You are not authorized to view this page !", {
//         position: "top-right",
//         autoClose: 700,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: false,
//         progress: undefined,
//         closeButton: true,
//         onClose: () => {
//           Navigate("/signin");
//         },
//       });
//     }


//   }, []);


//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const getAllUsers = async () => {
//     let response = await getUsers();
//     setUsers(response.data);
//     console.log(response.data);
//   };

//   const deleteUserDetails = async (id) => {
//     await deleteUser(id);

//     toast("🦄 User deleted !", {
//       position: "top-right",
//       autoClose: 700,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: false,
//       draggable: false,
//       progress: undefined,
//       closeButton: true,
//       onClose: () => {
//         getAllUsers();
//       },
//     });
//   };



//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={700}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         closeButton={false}
//         limit={1}
//       />


//       <div className="mt-5">
//         <div className="container-fluid">
//           <div className="add_btn mt-2 mb-2">
//             <NavLink to="/add-product" className="btn btn-primary">Add Product</NavLink>
//           </div>

//           <table class="table">
//             <thead>
//               <tr className="table-dark">
//                 <th scope="col" style={{ color: "white" }} >ID</th>
//                 <th scope="col" style={{ color: "white" }} >Name</th>
//                 <th scope="col" style={{ color: "white" }} >Age</th>
//                 <th scope="col" style={{ color: "white" }} >Sex</th>
//                 <th scope="col" style={{ color: "white" }} >Location</th>
//                 <th scope="col" style={{ color: "white" }} >Email</th>
//                 <th scope="col" style={{ color: "white" }} >Phone Number</th>
//                 <th scope="col" style={{ color: "white" }} ></th>


//               </tr>
//             </thead>
//             <tbody>

//               {
//                 users.map((element, id) => {

//                   return (
//                     <>

//                       <tr>
//                         <td>{element._id}</td>
//                         <td>{element.name}</td>
//                         <td>{element.age}</td>
//                         <td>{element.sex}</td>
//                         <td>{element.location}</td>
//                         <td>{element.email}</td>
//                         <td>{element.phone}</td>


//                         <td >


//                           <FiEdit onClick={() => {
//                             Navigate(`/edit/${element._id}`)
//                           }}
//                             style={{ color: "blue", cursor: "pointer", marginRight: "10px", fontSize: "20px" }} />


//                           <AiOutlineDelete onClick={() => deleteUserDetails(element._id)}
//                             style={{ color: "red", cursor: "pointer", marginRight: "10px", fontSize: "20px" }}
//                           />
//                         </td>



//                       </tr>
//                     </>
//                   )
//                 })
//               }
//             </tbody>
//           </table>


//         </div>
//       </div>
//     </>
//   )
// }


// export default AllUsers