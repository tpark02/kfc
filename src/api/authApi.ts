// api/authApi.ts
import axiosInstance from "../app/axiosInstance"
import { AuthRequest, AuthResponse } from "../types/auth";

export const login = async (form: AuthRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/login", form, {
    headers: { "Content-Type": "application/json" }, // 필요 시
  });
  return response.data;
};

export const getProtectedData = async (): Promise<any> => {
  const response = await axiosInstance.get("/protected");
  return response.data;
};