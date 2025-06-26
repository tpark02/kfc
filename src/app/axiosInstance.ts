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
  console.log("🚀 Axios Request URL:", config.url);

  const token = localStorage.getItem("token");

  if (
    token &&
    config.url !== "/signup" && // Exception handling
    config.url !== "/login"
  ) {
    console.log("🛑 Token being attached to:", config.url);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle errors globally (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // ✅ Only redirect if NOT already on /login
    const isAuthError = status === 401 || status === 403;
    const isNotLoginRoute = !window.location.href.includes("/login");

    if (isAuthError && isNotLoginRoute) {
      console.warn("🔒 Auth error — redirecting to login");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

export default instance;
