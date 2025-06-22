// src/api/fetchPlayers.ts
import axiosInstance from "../app/axiosInstance";
import { ResponsePlayerPage } from "../types/response";
import { Country } from "../types/country";
import { Team } from "../types/team";
import { League } from "../types/league";
import { PlayerPos } from "../types/playerPos";

interface FetchPlayerParams {
  page: number;
  size: number;
  search: string;
  sortType: string;
  countryFilter?: Country[];
  teamFilter?: Team[];
  leagueFilter?: League[];
  playerPositionFilter?: PlayerPos[];
}

export const fetchPlayers = async (params: FetchPlayerParams): Promise<ResponsePlayerPage> => {
  const response = await axiosInstance.post<ResponsePlayerPage>("/api/players", params);
  return response.data;
};
