

import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GetOrders } from "../service/CohortApi"
import { Link } from "react-router-dom";
import moment from "moment";
import TopBar from "../components/TopBar";
import "../styles/OrderList.css";

function OrderList() {
    const [users, setUsers] = useState([]);
    const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
    const [defaultemail, setdefaultemail] = useState(localStorage.getItem("EMAIL"));
    const [status, setStatus] = useState("All");



    useEffect(() => {
        const fetchClubData = async () => {
            const response = await GetOrders(defaultemail);

            setUsers(response);

        };
        fetchClubData();
    }, []);



    const sortById = () => {
        const usersCopy = [...users];
        usersCopy.sort((userA, userB) => {
            if (sorted.reversed) {
                return userA._id.localeCompare(userB._id);
            }
            return userB._id.localeCompare(userA._id);
        });
        setUsers(usersCopy);
        setSorted({ sorted: "id", reversed: !sorted.reversed });
    };

    // sort by total cost where totalcost is a number
    const sortByTotalCost = () => {
        const usersCopy = [...users];
        usersCopy.sort((userA, userB) => {
            if (sorted.reversed) {
                return userA.totalcost - userB.totalcost;
            }
            return userB.totalcost - userA.totalcost;
        });
        setUsers(usersCopy);
        setSorted({ sorted: "Totalcost", reversed: !sorted.reversed });
    };


    // sort by shipmentdate which are dates
    const sortByShipmentDate = () => {
        const usersCopy = [...users];
        usersCopy.sort((userA, userB) => {
            if (sorted.reversed) {
                return new Date(userA.shipmentdate) - new Date(userB.shipmentdate);
            }
            return new Date(userB.shipmentdate) - new Date(userA.shipmentdate);
        });
        setUsers(usersCopy);
        setSorted({ sorted: "ShipmentDate", reversed: !sorted.reversed });
    };

    // sort by creationdate which are dates
    const sortByCreationDate = () => {
        const usersCopy = [...users];
        usersCopy.sort((userA, userB) => {
            if (sorted.reversed) {
                return new Date(userA.creationdate) - new Date(userB.creationdate);
            }
            return new Date(userB.creationdate) - new Date(userA.creationdate);
        });
        setUsers(usersCopy);
        setSorted({ sorted: "CreationDate", reversed: !sorted.reversed });
    };



    const renderUsers = () => {
        return users.map((user, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        <Link to={`/orderdetails/${user._id}`}>{user._id}</Link>
                    </td>

                    {/* td for total cost */}
                    <td>{user.totalcost}</td>

                    <td>{moment(user.shipmentdate).format("DD/MM/YYYY")}</td>
                    <td>{moment(user.creationdate).format("DD/MM/YYYY")}</td>

                    <td> {user.status} </td>



                </tr>
            );
        });
    };



    const renderUsersShipped = () => {
        return users.map((user, index) => {
            if (user.status === "Shipped") {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            <Link to={`/orderdetails/${user._id}`}>{user._id}</Link>
                        </td>

                        {/* td for total cost */}
                        <td>{user.totalcost}</td>

                        <td>{moment(user.shipmentdate).format("DD/MM/YYYY")}</td>
                        <td>{moment(user.creationdate).format("DD/MM/YYYY")}</td>

                        <td> {user.status} </td>

                    </tr>
                );
            }
        });
    };

    const renderUsersOutForDelivery = () => {
        return users.map((user, index) => {
            if (user.status === "Out for delivery") {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            <Link to={`/orderdetails/${user._id}`}>{user._id}</Link>
                        </td>

                        {/* td for total cost */}
                        <td>{user.totalcost}</td>

                        <td>{moment(user.shipmentdate).format("DD/MM/YYYY")}</td>
                        <td>{moment(user.creationdate).format("DD/MM/YYYY")}</td>

                        <td> {user.status} </td>

                    </tr>
                );
            }
        });
    }


    const renderUsersPending = () => {
        return users.map((user, index) => {
            if (user.status === "Pending") {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            <Link to={`/orderdetails/${user._id}`}>{user._id}</Link>
                        </td>

                        {/* td for total cost */}
                        <td>{user.totalcost}</td>

                        <td>{moment(user.shipmentdate).format("DD/MM/YYYY")}</td>
                        <td>{moment(user.creationdate).format("DD/MM/YYYY")}</td>

                        <td> {user.status} </td>

                    </tr>
                );
            }
        });
    }




    const renderArrow = () => {
        if (sorted.reversed) {
            return <FaArrowUp />;
        }
        return <FaArrowDown />;
    };

    return (
        <>


            <div className="container">
                <br />

                <div className="orderlist_header_div">
                    <h1>Orders list</h1>
                    <div className="dropdown">
                        <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Status : {status}
                        </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={() => { setStatus("All") }} >All</li>
                            <li className="dropdown-item" onClick={() => { setStatus("Pending") }} >Pending</li>
                            <li className="dropdown-item" onClick={() => { setStatus("Shipped") }} >Shipped</li>
                            <li className="dropdown-item" onClick={() => { setStatus("Out for delivery") }} >Out for delivery</li>

                        </ul>
                    </div>
                </div>
                <hr />
                <br />
                <div className="  table-container orderlist_parent">
                    <table className="table table-info">
                        <thead>
                            <tr className="table-info">
                                <th>
                                    S. No.
                                </th>
                                <th onClick={sortById}>
                                    <span style={{ marginRight: 10 }}>Order Id</span>
                                    {sorted.sorted === "id" ? renderArrow() : null}
                                </th>

                                <th onClick={sortByTotalCost}>
                                    <span style={{ marginRight: 10 }}>Total cost</span>
                                    {sorted.sorted === "Totalcost" ? renderArrow() : null}
                                </th>
                                {<th onClick={sortByShipmentDate}>
                                    <span style={{ marginRight: 10 }}>Shipment Date</span>
                                    {sorted.sorted === "ShipmentDate"
                                        ? renderArrow()
                                        : null}
                                </th>}

                                {<th onClick={sortByCreationDate}>
                                    <span style={{ marginRight: 10 }}>Creation Date</span>
                                    {sorted.sorted === "CreationDate"
                                        ? renderArrow()
                                        : null}
                                </th>}

                                <th>
                                    Order status
                                </th>

                            </tr>
                        </thead>

                        {status === "All" ? <tbody>{renderUsers()}</tbody> : status === "Shipped" ? <tbody>{renderUsersShipped()}</tbody> : status === "Out for delivery" ? <tbody>{renderUsersOutForDelivery()}</tbody> : status === "Pending" ? <tbody>{renderUsersPending()}</tbody> : null}

                    </table>
                </div>
            </div>

        </>
    );
}

export default OrderList;