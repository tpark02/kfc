import axiosInstance from "../axiosInstance";
import { isAxiosError } from "../axiosInstance";

export const buyPlayer = async (
  userId: number,
  playerId: number
): Promise<string> => {
  try {
    const response = await axiosInstance.put<string>(
      "/mystore/buyplayer/",
      {
        userId,
        playerId,
      }
    );

    if (response.data.includes("✅")) {
      return "🟢 Player purchased successfully!";
    } else {
      return "⚠️ Purchase failed: " + response.data;
    }
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      return (
        "❌ Failed to update store: " +
        (typeof err.response?.data === "string"
          ? err.response.data
          : JSON.stringify(err.response?.data ?? err.message))
      );
    } else if (err instanceof Error) {
      return "❌ Failed to update store: " + err.message;
    } else {
      return "❌ Failed to update store: Unknown error";
    }
  }
};
