// src/api/utils.ts
import { isAxiosError } from "../app/axiosInstance";

export function handleApiError(error: unknown, context: string): string {
  if (isAxiosError(error)) {
    console.error(`🔥 Axios Error in ${context}:`, error.response?.data);
    const message =
      typeof error.response?.data === "string"
        ? error.response.data
        : JSON.stringify(error.response?.data);
    return message || `${context} failed`;
  } else {
    console.error(`🚨 Unknown Error in ${context}:`, error);
    return `${context} failed`;
  }
}
