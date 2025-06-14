// src/api/myClubUtil.ts
import axiosInstance, { isAxiosError } from "../axiosInstance";
import { MyClubData } from "../types/club";
import { MyPlayer } from "../types/player";
import { totalNumberOfPlayers } from "../types/team";
import { UserInfoResponse, SeasonResponse } from "../types/response";

// ✅ 공통 에러 처리 함수
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

// ✅ 유저 정보
export const fetchUserInfo = async (userId: number) => {
  try {
    const res = await axiosInstance.post<UserInfoResponse>("/api/userInfo", {
      userId,
    });
    return res;
  } catch (err) {
    handleApiError(err, "fetchUserInfo");
    return null;
  }
};

// ✅ 시즌 정보
export const fetchSeasonInfo = async (seasonId: string) => {
  try {
    const res = await axiosInstance.get<SeasonResponse>(
      `/season/getSeason/${seasonId}`
    );
    return res.data;
  } catch (err) {
    handleApiError(err, "fetchSeasonInfo");
    return null;
  }
};

export const fetchMyClubs = async (userId: number): Promise<MyClubData | null> => {
  try {
    const data: MyClubData = await axiosInstance.get(`/users/${userId}/myclubs`);   
    console.log("fetch my club - ", data);
    return data;
  } catch (error) {
    handleApiError(error, "fetchMyClubs");
    return null;
  }
};

// ✅ 클럽 업데이트
// export const updateMyClub = async (
//   mySelectedPlayers: MyPlayer[],
//   userId: number,
//   clubId: number,
//   newClubName: string,
//   myFormation: string,
//   myTeamOvr: number,
//   myTeamSquadValue: number,
//   myTeamAge: number,
//   myTeamPace: number,
//   myTeamDefense: number,
//   myTeamAttack: number,
//   myTeamClubCohesion: number,
//   myTeamStamina: number
// ): Promise<string> => {
//   try {
//     console.log("Updating club with data:", {
//       userId,
//       clubId,
//       newClubName,
//       myFormation,
//       mySelectedPlayers,
//       myTeamOvr,
//       myTeamSquadValue,
//       myTeamAge,
//       myTeamPace,
//       myTeamDefense,
//       myTeamAttack,
//       myTeamClubCohesion,
//       myTeamStamina,
//     });
//     const res = await axiosInstance.put(`/updatemyclub/${userId}/${clubId}`, {
//       clubName: newClubName,
//       formationName: myFormation,
//       players: mySelectedPlayers,
//       ovr: myTeamOvr,
//       price: myTeamSquadValue,
//       age: myTeamAge,
//       pace: myTeamPace,
//       defense: myTeamDefense,
//       clubCohesion: myTeamClubCohesion,
//       attack: myTeamAttack,
//       stamina: myTeamStamina,
//     });
//     return res.data;
//   } catch (error) {
//     return handleApiError(error, "updateMyClub");
//   }
// };

// ✅ 클럽 삭제
export const deleteMyClub = async (
  userId: number,
  clubId: number
): Promise<string> => {
  try {
    const res = await axiosInstance.delete(`/deletemyclub/${userId}/${clubId}`);
    return res.data;
  } catch (error) {
    return handleApiError(error, "deleteMyClub");
  }
};

// ✅ OVR 계산 유틸
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

// ✅ 클럽 업데이트
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
    const res = await axiosInstance.put(`/updatemyclub/${userId}/${clubId}`, {
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
