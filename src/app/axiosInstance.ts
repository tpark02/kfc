// axiosInstance.ts
import axios from "axios";
import { AxiosError } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    token &&
    config.url !== "/signup" && // Exception handling
    config.url !== "/login"
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle errors globally (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("🔒 Authentication error. You need to log in again.");
      localStorage.removeItem("token");
      window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);

export const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

export default instance;
