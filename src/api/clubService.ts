// src/api/clubService.ts
import axiosInstance from "../app/axiosInstance";
import { handleApiError } from "./handleError";
import { MyClubData } from "../types/club";
import { MyPlayer } from "../types/player";
import { UserInfoResponse, SeasonResponse } from "../types/response";

export const fetchUserInfo = async (userId: number) => {
  try {
    const res = await axiosInstance.post<UserInfoResponse>("/api/userInfo", { userId });
    return res;
  } catch (error) {
    handleApiError(error, "fetchUserInfo");
    return null;
  }
};

export const fetchSeasonInfo = async (seasonId: string) => {
  try {
    const res = await axiosInstance.get<SeasonResponse>(`/season/getSeason/${seasonId}`);
    return res.data;
  } catch (error) {
    handleApiError(error, "fetchSeasonInfo");
    return null;
  }
};

export const fetchMyClubs = async (userId: number): Promise<MyClubData[]> => {
  try {
    const res = await axiosInstance.get(`/users/${userId}/myclubs`);
    return Array.isArray(res.data) ? res.data : [res.data];
  } catch (error) {
    handleApiError(error, "fetchMyClubs");
    return [];
  }
};

export const updateMyClub = async (
  mySelectedPlayers: MyPlayer[],
  userId: number,
  clubId: number,
  newClubName: string,
  myFormation: string,
  myTeamOvr: number,
  myTeamSquadValue: number,
  myTeamAge: number,
  myTeamPace: number,
  myTeamDefense: number,
  myTeamAttack: number,
  myTeamClubCohesion: number,
  myTeamStamina: number
): Promise<string> => {
  try {
    const res = await axiosInstance.put(`/updatemyclub/${userId}/${clubId}`, {
      clubName: newClubName,
      formationName: myFormation,
      players: mySelectedPlayers,
      ovr: myTeamOvr,
      price: myTeamSquadValue,
      age: myTeamAge,
      pace: myTeamPace,
      defense: myTeamDefense,
      clubCohesion: myTeamClubCohesion,
      attack: myTeamAttack,
      stamina: myTeamStamina,
    });
    return res.data;
  } catch (error) {
    return handleApiError(error, "updateMyClub");
  }
};

export const deleteMyClub = async (userId: number, clubId: number): Promise<string> => {
  try {
    const res = await axiosInstance.delete(`/deletemyclub/${userId}/${clubId}`);
    return res.data;
  } catch (error) {
    return handleApiError(error, "deleteMyClub");
  }
};
