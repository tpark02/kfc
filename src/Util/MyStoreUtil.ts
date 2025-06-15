import axiosInstance from "../axiosInstance";
import { BuyResponse } from "../types/response";

export const buyPlayer = async (
  userId: number,
  playerId: number
): Promise<BuyResponse> => {
    const response = await axiosInstance.put<BuyResponse>(
      "/mystore/buyplayer/",
      {
        userId,
        playerId,
      }
    );
    return response.data;
};
