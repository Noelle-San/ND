import axios from "axios";

const URL = "http://localhost:5000";

export const addUser = async (data) => {
  try {
    return await axios.post(`${URL}/admin/add`, data);
  } catch (error) {
    console.log("eror calling adduser api", error);
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/admin/all`);
  } catch (error) {
    console.log("error while calling api", error);
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`${URL}/admin/${id}`);
  } catch (error) {
    console.log("Error while calling the getUSer api", error);
  }
};

export const editUser = async (user, id) => {
  try {
    return await axios.put(`${URL}/admin/${id}`, user);
  } catch (error) {
    console.log("Error while calling the getUSer api", error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${URL}/admin/${id}`);
  } catch (error) {
    console.log("Error while calling the deleteUser api", error);
  }
};
