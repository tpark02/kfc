// axiosInstance.ts
import axios from "axios";
import { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ Add token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle errors globally (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("🔒 인증 에러. 다시 로그인해야 합니다.");
      // Optionally redirect or logout
      // window.location.href = "/login"; // 또는 navigate("/login")
    }
    return Promise.reject(error);
  }
);

export const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

export default instance;
