import axios from "axios";
import { Club } from "../../types/Club";
import { Player } from "../../types/Player";

export const fetchMyClubs = async (userId: number): Promise<Club[]> => {
  try {
    console.log("📦 fetchMyClubs:", userId);
    const response = await axios.get(
      `http://localhost:8080/api/users/${userId}/myclubs`
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
  clubId: number,
  newClubName: string,
  myFormation: string,
  dropPlayers: { [index: number]: Player | null },
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
    const players = Array.from(
      { length: 26 },
      (_, i) => dropPlayers[i]?.id ?? null
    );
  
    console.log("🛰 보내는 데이터:", {
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
      `http://localhost:8080/api/updatemyclub/${clubId}`,
      {
        clubName: newClubName,
        formationName: myFormation, // ✅ 정확한 이름만 보내기
        players, // ✅ 반드시 26개 (null 포함 가능)
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
      console.error("❌ 400 오류 응답:", error.response.data);
      return error.response.data as string;
    } else {
      console.error("❌ 저장 실패:", error);
      return "알 수 없는 오류가 발생했습니다.";
    }
  }
};

export const deleteMyClub = async (clubId: number): Promise<string> => {
  try {
    await axios.delete(`http://localhost:8080/api/deletemyclub/${clubId}`);
    console.log("✔ 삭제 완료");
    return "삭제 완료";
  } catch (error) {
    console.error("❌ 삭제 실패:", error);
    return "삭제 실패";
  }
};