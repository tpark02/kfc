// src/store/useSquadStore.ts
import { create } from "zustand";
import { Player } from "../types/Player";
import { Match } from "../types/Match";
type DropPlayers = { [index: number]: Player | null };

type SquadStore = {
  myTeamName: string;
  myFormation: string;
  dropPlayers: DropPlayers;
  benchPlayers: Player[];
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

  setMyTeamOvr: (ovr: number) => void; // 추가된 부분
  setMyTeamName: (f: string) => void;
  setMyFormation: (f: string) => void;
  updateDropPlayer: (idx: number, player: Player | null) => void;
  setDropPlayers: (players: DropPlayers) => void;
  setBenchPlayers: (players: Player[]) => void;
  setIsDropZoneSelected: (val: boolean) => void;

  setMyTeamSquadValue: (value: number) => void;
  setMyTeamAge: (age: number) => void;
  setMyTeamPace: (pace: number) => void;
  setMyTeamDefense: (defense: number) => void;
  setMyTeamAttack: (attack: number) => void;
  setMyTeamClubCohesion: (cohesion: number) => void;
  setMyTeamStamina: (stamina: number) => void;
  resetSquadMetric: () => void;

  // unused
  setSelectedDropZone: (info: { index: number; pos: string }) => void;
  setPosition: (p: string) => void;
  resetSquad: () => void;

  // league simulator
  hoveredMatchIndex: number | null;
  setHoveredMatchIndex: (index: number | null) => void;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
};

export const useSquadStore = create<SquadStore>((set) => ({
  myTeamName: "N/A",
  myFormation: "442",
  dropPlayers: {},
  benchPlayers: Array(15).fill(null),
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

  setMyTeamOvr: (ovr: number) => set({ myTeamOvr: ovr }),
  setMyTeamName: (s: string) => set({ myTeamName: s }),
  setMyFormation: (f: string) => set({ myFormation: f }),
  updateDropPlayer: (idx: number, player: Player | null) =>
    set((state) => ({
      dropPlayers: { ...state.dropPlayers, [idx]: player },
    })),
  setDropPlayers: (players: DropPlayers) => set({ dropPlayers: players }),
  setBenchPlayers: (players: Player[]) => set({ benchPlayers: players }),
  setMyTeamSquadValue: (value: number) => set({ myTeamSquadValue: value }),
  setMyTeamAge: (age: number) => set({ myTeamAge: age }),
  setMyTeamPace: (pace: number) => set({ myTeamPace: pace }),
  setMyTeamDefense: (defense: number) => set({ myTeamDefense: defense }),
  setMyTeamAttack: (attack: number) => set({ myTeamAttack: attack }),
  setMyTeamClubCohesion: (cohesion: number) =>
    set({ myTeamClubCohesion: cohesion }),
  setMyTeamStamina: (stamina: number) => set({ myTeamStamina: stamina }),
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
  // unused
  setSelectedDropZone: (info) => set({ selectedDropZone: info }),
  setIsDropZoneSelected: (val) => set({ isDropZoneSelected: val }),
  setPosition: (p) => set({ position: p }),
  resetSquad: () =>
    set({
      myFormation: "442",
      dropPlayers: {},
      benchPlayers: Array(15).fill(null),
      selectedDropZone: { index: -1, pos: "" },
      isDropZoneSelected: false,
      position: "",
    }),
  // league simulator
  hoveredMatchIndex: null,
  setHoveredMatchIndex: (index) => set({ hoveredMatchIndex: index }),
  matches: [],
  setMatches: (matches) => set({ matches: matches }),
}));
