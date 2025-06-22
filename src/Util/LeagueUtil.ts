import axiosInstance from "../app/axiosInstance"
import { Match } from "../types/match";

export const fetchSchedule = async (userid: number, clubid: number) => {
  try {
    const response = await axiosInstance.post<Match[]>(
      "/api/simulations/schedule",
      {
        userId: userid,
        clubId: clubid,
      }
    );
    return response;
  } catch (error) {
    console.error("🔥 failed to create league schedule:", error);
    return undefined;
  }
};