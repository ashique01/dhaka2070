import axios from "axios";

const api = axios.create({
  baseURL: "https://dhaka2070.onrender.com/api", // Adjust if needed
});

export default api;
