// src/utils/setSquadStateFromClubData.ts
import { MyClubData } from "../types/club";

export const setSquadStateFromClubData = async (
  data: MyClubData,
  setters: {
    setMySelectedPlayers: (p: MyClubData["players"]) => void;
    setMyTeamOvr: (n: number) => void;
    setMyTeamSquadValue: (n: number) => void;
    setMyTeamAge: (n: number) => void;
    setMyTeamPace: (n: number) => void;
    setMyTeamDefense: (n: number) => void;
    setMyTeamAttack: (n: number) => void;
    setMyTeamClubCohesion: (n: number) => void;
    setMyTeamStamina: (n: number) => void;
  }
): Promise<void> => {
  try {
    console.log("🟨 setSquadStateFromClubData 시작", data);

    await Promise.resolve(setters.setMySelectedPlayers(data.players));
    await Promise.resolve(setters.setMyTeamOvr(data.ovr));
    await Promise.resolve(setters.setMyTeamSquadValue(data.price));
    await Promise.resolve(setters.setMyTeamAge(data.age));
    await Promise.resolve(setters.setMyTeamPace(data.pace));
    await Promise.resolve(setters.setMyTeamDefense(data.defense));
    await Promise.resolve(setters.setMyTeamAttack(data.attack));
    await Promise.resolve(setters.setMyTeamClubCohesion(data.clubCohesion));
    await Promise.resolve(setters.setMyTeamStamina(data.stamina));

    console.log("✅ setSquadStateFromClubData 완료");
  } catch (err) {
    console.error("❌ setSquadStateFromClubData 중 오류 발생:", err);
    console.error("⚠️ 입력 데이터 확인:", data);
  }
};
