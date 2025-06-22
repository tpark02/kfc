// src/api/myClubUtil.ts
import axiosInstance, { isAxiosError } from "../app/axiosInstance";
import { MyClubData } from "../types/club";
import { MyPlayer } from "../types/player";
import { totalNumberOfPlayers } from "../types/team";
import { UserInfoResponse, SeasonResponse } from "../types/response";

const handleApiError = (error: unknown, context: string): string => {
  if (isAxiosError(error)) {
    console.error(`🔥 Axios Error in ${context}:`, error.response?.data);
    return typeof error.response?.data === "string"
      ? error.response.data
      : JSON.stringify(error.response?.data ?? `${context} failed`);
  } else {
    console.error(`🚨 Unknown Error in ${context}:`, error);
    return `${context} failed`;
  }
};

export const fetchUserInfo = async (
  userId: number
): Promise<UserInfoResponse | null> => {
  try {
    const res = await axiosInstance.get<UserInfoResponse>(`/api/users/${userId}`);
    return res.data;
  } catch (err) {
    handleApiError(err, "fetchUserInfo");
    return null;
  }
};

export const fetchMyClubs = async (
  userId: number
): Promise<MyClubData | null> => {
  try {
    const res = await axiosInstance.get(`/api/users/${userId}/clubs`);
    console.log("fetch my club - ", res.data);
    return res.data;
  } catch (error) {
    handleApiError(error, "fetchMyClubs");
    return null;
  }
};

export const deleteMyClub = async (
  userId: number,
  clubId: number
): Promise<string> => {
  try {
    const res = await axiosInstance.delete(`/api/users/${userId}/clubs/${clubId}`);
    return res.data;
  } catch (error) {
    return handleApiError(error, "deleteMyClub");
  }
};

export const adjustTeamOvr = (myPlayer: MyPlayer[]): number =>
  Math.floor(
    myPlayer.reduce(
      (acc, p) => acc + (p.ovr - p.yellowCard * 5 - p.redCard * 10),
      0
    ) / totalNumberOfPlayers
  );

export const getOvrIndicator = (
  ovr: number,
  yellow: number,
  red: number
): string => {
  const adjusted = ovr - yellow * 5 - red * 10;
  return ovr === adjusted ? "⚪" : ovr > adjusted ? "🔴🔻" : "🟢🔺";
};

export const getTeamOvrIndicator = (a: number, b: number): string =>
  a === b ? "⚪" : a < b ? "🔴🔻" : "🟢🔺";

export const updateMyClub = async (
  myNation: string,
  myLogoId: number,
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
    console.log("registerMyInfo data:", {
      myNation,
      myLogoId,
      userId,
      clubId,
      newClubName,
      myFormation,
      mySelectedPlayers,
      myTeamOvr,
      myTeamSquadValue,
      myTeamAge,
      myTeamPace,
      myTeamDefense,
      myTeamAttack,
      myTeamClubCohesion,
      myTeamStamina,
    });
    const res = await axiosInstance.put(`/api/users/${userId}/clubs/${clubId}`, {
      myNation: myNation,
      myLogoId: myLogoId,
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
    return handleApiError(error, "updatemyinfo");
  }
};

export const updatePlayer = async (
  userId: number,
  idx: number
): Promise<string> => {
  try {
    console.log("user id", userId, "idx", idx);
    const res = await axiosInstance.put(`/api/users/${userId}/players/${idx}`, {
      userId: userId,
      idx: idx,
    });

    return res.data;
  } catch (error) {
    console.log("delete player err - ", error);
    return handleApiError(error, "updateplayer");
  }
};
