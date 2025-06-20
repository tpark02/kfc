// src/hooks/useSquadSetters.ts
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";

export const useSquadSetters = () =>
  useSquadStore(
    (s) => ({
      setMyCoin: s.setMyCoin,
      setMyUserId: s.setMyUserId,
      setMyFormation: s.setMyFormation,
      setMyTeamName: s.setMyTeamName,
      setMyLogoImgUrl: s.setMyLogoImgUrl,
      setMyLogoId: s.setMyLogoId,
      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
    }),
    shallow
  );
