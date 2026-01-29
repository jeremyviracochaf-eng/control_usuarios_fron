import axios from "axios";

const api = axios.create({
  baseURL: "https://api-control-usuarios.onrender.com/api"
});

// Interceptor para JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Agregar header para evitar que ngrok intercepte
  config.headers["ngrok-skip-browser-warning"] = true;
  return config;
});

export default api;