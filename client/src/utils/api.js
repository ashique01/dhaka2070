import axios from "axios";

const api = axios.create({
  baseURL: "https://dhaka2070.onrender.com/api", // Adjust if needed
});
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
