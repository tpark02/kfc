import axiosInstance from "../axiosInstance"; // 👈 custom axios with interceptor
import { Country } from "../types/country";
import { League } from "../types/league";
import { ResponseRandomSquad } from "../types/response";
import { Team } from "../types/team";

export const fetchRandomSquad = async (data: {
  name: string;
  countries: Country[];
  leagues: League[];
  clubs: Team[];
  userId: number;
}): Promise<ResponseRandomSquad> => {
  const response = await axiosInstance.post("/randomteam", data);
  return response.data;
};
