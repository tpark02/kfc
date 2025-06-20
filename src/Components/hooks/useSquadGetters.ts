// src/hooks/useSquadGetters.ts
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";

export const useSquadGetters = () =>
  useSquadStore(
    (s) => ({
      myCoin: s.myCoin,
      myNation: s.myNation,
      myLogoId: s.myLogoId,
      myUserId: s.myUserId,
      mySelectedClubId: s.mySelectedClubId,
      myFormation: s.myFormation,
      mySelectedPlayers: s.mySelectedPlayers,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      myTeamAge: s.myTeamAge,
      myTeamPace: s.myTeamPace,
      myTeamDefense: s.myTeamDefense,
      myTeamAttack: s.myTeamAttack,
      myTeamClubCohesion: s.myTeamClubCohesion,
      myTeamStamina: s.myTeamStamina,
      myClubs: s.myClubs,
    }),
    shallow
  );
