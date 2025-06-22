import axiosInstance from "../app/axiosInstance";
import { BuyResponse } from "../types/response";

export const buyPlayer = async (
  userId: number,
  playerId: number
): Promise<BuyResponse> => {
    const response = await axiosInstance.put<BuyResponse>(
      "/api/store/players/purchase",
      {
        userId,
        playerId,
      }
    );
    return response.data;
};
