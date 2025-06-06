import axios from "axios";
import { MyClubData } from "../types/Club";
import { MyPlayer, Player } from "../types/Player";
import { totalNumberOfPlayers } from "../types/Team";
import { UserInfoResponse, SeasonResponse } from "../types/Response";
import { playerToMyPlayer } from "../types/Player";

export const fetchUserInfo = async (userId: number) => {
  try {
    const response = await axios.post<UserInfoResponse>(
      "http://localhost:8080/userInfo/",
      {
        userId: userId,
      }
    );
    return response;
  } catch (err) {
    console.log("❌ failed to load user info", err);
    return null;
  }
};

export const fetchSeasonInfo = async (seasonId: string) => {
  try {
    const res = await axios.get<SeasonResponse>(
      `http://localhost:8080/season/getSeason/${seasonId}`
    );
    return res.data;
  } catch (err) {
    console.error("❌ Failed to load season info:", err);
    return null;
  }
};

export const fetchMyClubs = async (userId: number): Promise<MyClubData[]> => {
  try {
    console.log(`📦 fetchMyClubs: userId=${userId}`);

    const response = await axios.get(
      `http://localhost:8080/users/${userId}/myclubs`
    );
    const clubs = Array.isArray(response.data)
      ? response.data
      : [response.data];
    return clubs;
  } catch (error) {
    console.error("❌ 클럽 목록 불러오기 실패:", error);
    return [];
  }
};

export const updateMyClub = async (
  mySelectedPlayers: MyPlayer[],
  userId: number,
  clubId: number,
  newClubName: string,
  myFormation: string,
  dropPlayers: Player[],
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
    //console.log(dropPlayers);
    // const players: (number | null)[] = Array(totalNumberOfPlayers).fill(null);
    const players: (MyPlayer | null)[] = Array(totalNumberOfPlayers).fill(null);

    Object.values(dropPlayers).forEach((player) => {
      if (player) {
        const mPlayer = mySelectedPlayers.find((p) => p.playerId === player.id);
        const myPlayer: MyPlayer = playerToMyPlayer(
          player,
          userId,
          clubId,
          mPlayer?.yellowCard ?? 0,
          mPlayer?.redCard ?? 0,
          mPlayer?.id ?? 0, // id가 필요 없으면 별도 처리하거나 -1 등 기본값 설정
          mPlayer?.ovr ?? player.ovr
        );

        players[player.idx] = myPlayer;
      }
    });

    console.log("🛰 request data:", {
      clubName: newClubName,
      formationName: myFormation,
      players,
      ovr: myTeamOvr,
      price: myTeamSquadValue,
      age: myTeamAge,
      pace: myTeamPace,
      defense: myTeamDefense,
      clubCohesion: myTeamClubCohesion,
      attack: myTeamAttack,
      stamina: myTeamStamina,
    });

    const response = await axios.put(
      `http://localhost:8080/updatemyclub/${userId}/${clubId}`,
      {
        clubName: newClubName,
        formationName: myFormation, // ✅ 정확한 이름만 보내기
        players, // ✅ 반드시 16개 (null 포함 가능)
        ovr: myTeamOvr,
        price: myTeamSquadValue,
        age: myTeamAge,
        pace: myTeamPace,
        defense: myTeamDefense,
        clubCohesion: myTeamClubCohesion,
        attack: myTeamAttack,
        stamina: myTeamStamina,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      console.error("❌ 400 response error:", error.response.data);
      return error.response.data as string;
    } else {
      console.error("❌ 저장 실패:", error);
      return "unknown error occurred";
    }
  }
};

export const deleteMyClub = async (
  userId: number,
  clubId: number
): Promise<string> => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/deletemyclub/${userId}/${clubId}`
    );
    return response.data;
  } catch (error) {
    console.error("❌ 삭제 실패:", error);
    if (axios.isAxiosError(error)) {
      return error.response?.data || "club deletion failed";
    }
    return "club deletion failed";
  }
};

export const adjustTeamOvr = (myPlayer: MyPlayer[]): number => {
  return Math.floor(
    myPlayer
      .map((p) => p.ovr - p.yellowCard * 5 - p.redCard * 10)
      .reduce((acc, curr) => acc + curr, 0) / totalNumberOfPlayers
  );
};

export const getOvrIndicator = (
  ovr: number,
  yellow: number,
  red: number
): string => {
  const adjusted = ovr - yellow * 5 - red * 10;
  if (ovr === adjusted) return "⚪";
  return ovr > adjusted ? "🔴🔻" : "🟢🔺";
};

export const getTeamOvrIndicator = (a: number, b: number): string => {
  if (a === b) return "⚪";
  return a < b ? "🔴🔻" : "🟢🔺";
};
