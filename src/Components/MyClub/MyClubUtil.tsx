import axios from "axios";
import { MyClubData } from "../../types/Club";
import { Player } from "../../types/Player";
import { totalNumberOfPlayers } from "../../types/Team";

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
    console.log(dropPlayers);
    const players: (number | null)[] = Array(totalNumberOfPlayers).fill(null);

    Object.values(dropPlayers).forEach((player) => {
      if (player) players[player.idx] = player.id;
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
