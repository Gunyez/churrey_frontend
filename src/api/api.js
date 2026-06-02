import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9900/api",
  withCredentials: true,
});

// ✅ Always get latest token dynamically
api.interceptors.request.use((config) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;