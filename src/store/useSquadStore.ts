// src/store/useSquadStore.ts
import { MyPlayer, Player } from "../types/player";
import { Match } from "../types/match";
// import { TOTAL_DROP_ZONES } from "../data/formations";
import { MyClubData } from "../types/club";
import { DropZone } from "../types/dropZone";
import { createWithEqualityFn } from "zustand/traditional";

export type DropPlayers = { [index: number]: Player | null };

type SquadStore = {
  myUniformImgUrl: string;
  myLogoImgUrl: string;
  myLogoId: number;
  myNation: string;
  joinedSeasonId: number;
  myUserId: number;
  myUserEmail: string;
  myUserName: string;
  mySelectedClubId: number;
  myTeamName: string;
  myFormation: string;
  //dropPlayers: Player[];
  // benchPlayers: Player[];
  isDropZoneSelected: boolean;
  myTeamOvr: number;
  myTeamSquadValue: number;
  myTeamAge: number;
  myTeamPace: number;
  myTeamDefense: number;
  myTeamAttack: number;
  myTeamClubCohesion: number;
  myTeamStamina: number;
  // unused
  selectedDropZone: { index: number; pos: string };
  position: string;
  myClubs: MyClubData | null;
  dropZoneList: DropZone[];
  mySelectedPlayers: MyPlayer[];
  HasRedCard: boolean;
  setMyLogoImgUrl: (s: string) => void;
  setMyLogoId: (n: number) => void;
  setMyNation: (nation: string) => void;
  // setMyUniformImgUrl: (s: string) => void;
  setJoinedSeasonId: (n: number) => void;
  setUserEmail: (s: string) => void;
  setUserName: (s: string) => void;
  setMySelectedClubId: (n: number) => void;
  setMySelectedPlayers: (players: MyPlayer[]) => void;
  setMyUserId: (userId: number) => void;
  setMyClubs: (clubs: MyClubData | null) => void;
  setMyTeamOvr: (ovr: number) => void; // 추가된 부분
  setMyTeamName: (f: string) => void;
  setMyFormation: (f: string) => void;
  // updateDropPlayer: (idx: number, player: Player) => void;
  // setDropPlayers: (players: Player[]) => void;
  // setBenchPlayers: (players: Player[]) => void;
  setIsDropZoneSelected: (val: boolean) => void;
  setMyTeamSquadValue: (value: number) => void;
  setMyTeamAge: (age: number) => void;
  setMyTeamPace: (pace: number) => void;
  setMyTeamDefense: (defense: number) => void;
  setMyTeamAttack: (attack: number) => void;
  setMyTeamClubCohesion: (cohesion: number) => void;
  setMyTeamStamina: (stamina: number) => void;
  resetSquadMetric: () => void;
  setDropZoneList: (lst: DropZone[], d: DropZone) => void;
  resetDropZoneList: () => void;
  // unused
  // setSelectedDropZone: (info: { index: number; pos: string }) => void;
  // setPosition: (p: string) => void;
  // resetSquad: () => void;

  // league simulator
  selectedIdx: number;
  setSelectedIdx: (index: number | null) => void;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
};

export const useSquadStore = createWithEqualityFn<SquadStore>()((set) => ({
  dropZoneList: [],
  myLogoId: -1,
  myNation: "",
  joinedSeasonId: -1,
  myUserEmail: "",
  myUserName: "",
  myUserId: -1,
  mySelectedClubId: 1,
  myTeamName: "",
  myFormation: "442",
  // dropPlayers: [],
  // dropPlayers: Object.fromEntries(
  //   Array.from({ length: TOTAL_DROP_ZONES }, (_, i) => [i, null])
  // ),
  // benchPlayers: Array(15).fill(null),
  myLogoImgUrl: "",
  selectedDropZone: { index: -1, pos: "" },
  isDropZoneSelected: false,
  position: "",
  myTeamSquadValue: 0,
  myTeamAge: 0,
  myTeamPace: 0,
  myTeamDefense: 0,
  myTeamAttack: 0,
  myTeamClubCohesion: 0,
  myTeamStamina: 0,
  myTeamOvr: 0,
  myClubs: null,
  mySelectedPlayers: [],
  HasRedCard: false,
  myUniformImgUrl: "",
  setMyLogoId: (n: number) => {
    set({ myLogoId: n });
  },
  setUserEmail: (s: string) => {
    set({ myUserEmail: s });
  },
  setUserName: (s: string) => {
    set({ myUserName: s });
  },
  setMySelectedClubId: (n: number) => {
    set({ mySelectedClubId: n });
  },
  setMySelectedPlayers: (players: MyPlayer[]) =>
    set({
      mySelectedPlayers: players,
      HasRedCard: players
        .sort((a, b) => a.idx - b.idx)
        .slice(0, 11)
        .some((p) => p.redCard > 0),
    }),
  setMyUserId: (userId: number) => set({ myUserId: userId }),
  setMyClubs: (clubs: MyClubData | null) => set({ myClubs: clubs }),
  setMyTeamOvr: (ovr: number) => {
    set({ myTeamOvr: ovr });
  },
  // setMyUniformImgUrl: (s: string) => set({ myUniformImgUrl: s}),
  setMyNation: (nation: string) => set({ myNation: nation }),
  setJoinedSeasonId: (n: number) => set({ joinedSeasonId: n }),
  setMyTeamName: (s: string) => set({ myTeamName: s }),
  setMyFormation: (f: string) => set({ myFormation: f }),
  // updateDropPlayer: (idx: number, player: Player) =>
  //   set((state) => {
  //     const updatedPlayers = [...state.dropPlayers];
  //     updatedPlayers[idx] = player;
  //     return { dropPlayers: updatedPlayers };
  //   }),
  // setDropPlayers: (players: Player[]) => set({ dropPlayers: players }),
  // setBenchPlayers: (players: Player[]) => set({ benchPlayers: players }),
  setMyTeamSquadValue: (value: number) => set({ myTeamSquadValue: value }),
  setMyTeamAge: (age: number) => set({ myTeamAge: age }),
  setMyTeamPace: (pace: number) => set({ myTeamPace: pace }),
  setMyTeamDefense: (defense: number) => set({ myTeamDefense: defense }),
  setMyTeamAttack: (attack: number) => set({ myTeamAttack: attack }),
  setMyTeamClubCohesion: (cohesion: number) =>
    set({ myTeamClubCohesion: cohesion }),
  setMyTeamStamina: (stamina: number) => set({ myTeamStamina: stamina }),
  setMyLogoImgUrl: (s: string) => set({ myLogoImgUrl: s }),
  resetSquadMetric: () =>
    set({
      myTeamSquadValue: 0,
      myTeamAge: 0,
      myTeamPace: 0,
      myTeamDefense: 0,
      myTeamAttack: 0,
      myTeamClubCohesion: 0,
      myTeamStamina: 0,
      myTeamOvr: 0,
    }),
  setIsDropZoneSelected: (val) => set({ isDropZoneSelected: val }),

  setDropZoneList: (lst, d) =>
    set({
      dropZoneList: [...lst, d],
    }),
  resetDropZoneList: () => set({ dropZoneList: [] }),
  // unused
  // setSelectedDropZone: (info) => set({ selectedDropZone: info }),
  // setPosition: (p) => set({ position: p }),
  // resetSquad: () =>
  //   set({
  //     myFormation: "442",
  //     dropPlayers: Array(TOTAL_DROP_ZONES).fill(null),
  //     // benchPlayers: Array(15).fill(null),
  //     selectedDropZone: { index: -1, pos: "" },
  //     isDropZoneSelected: false,
  //     position: "",
  //   }),
  // league simulator
  selectedIdx: -1,
  setSelectedIdx: (index) => set({ selectedIdx: index }),
  matches: [],
  setMatches: (matches) => set({ matches: matches }),
}));

// set my club info
