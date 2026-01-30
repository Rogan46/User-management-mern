import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = () => axios.get(BASE_URL);
export const getUserById = (id) => axios.get(`${BASE_URL}/${id}`);
export const addUser = (user) => axios.post(BASE_URL, user);
export const updateUser = (id, user) => axios.put(`${BASE_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);
export const searchUsers = (keyword) =>
  axios.get(`${BASE_URL}/search/${keyword}`);
export const exportCsv = () =>
  axios.get(`${BASE_URL}/export`, { responseType: "blob" });
export const getUsersWithPagination = (page, size) =>
  axios.get(`${BASE_URL}/page`, { params: { page, size } });
