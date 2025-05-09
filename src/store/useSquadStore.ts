// src/store/useSquadStore.ts
import { create } from "zustand";
import { Player } from "../types/Player";

type DropPlayers = { [index: number]: Player | null };

type SquadStore = {
  myTeamName: string;
  myFormation: string;
  dropPlayers: DropPlayers;
  isDropZoneSelected: boolean;
  myTeamOvr: number;
  // unused
  selectedDropZone: { index: number; pos: string };
  position: string;

  setMyTeamOvr: (ovr: number) => void; // 추가된 부분
  setMyTeamName: (f: string) => void;
  setMyFormation: (f: string) => void;
  updateDropPlayer: (idx: number, player: Player | null) => void;
  setDropPlayers: (players: DropPlayers) => void;
  setIsDropZoneSelected: (val: boolean) => void;

  // unused
  setSelectedDropZone: (info: { index: number; pos: string }) => void;
  setPosition: (p: string) => void;
  resetSquad: () => void;
};

export const useSquadStore = create<SquadStore>((set) => ({
  myTeamName: "N/A",
  myFormation: "442",
  dropPlayers: {},
  selectedDropZone: { index: -1, pos: "" },
  isDropZoneSelected: false,
  position: "",

  myTeamOvr: 0, // 초기값 설정
  setMyTeamOvr: (ovr) => set({ myTeamOvr: ovr }), // 추가된 부분
  setMyTeamName: (s) => set({ myTeamName: s }),
  setMyFormation: (f) => set({ myFormation: f }),
  updateDropPlayer: (idx, player) =>
    set((state) => ({
      dropPlayers: { ...state.dropPlayers, [idx]: player },
    })),
  setDropPlayers: (players) => set({ dropPlayers: players }),
  // unused
  setSelectedDropZone: (info) => set({ selectedDropZone: info }),
  setIsDropZoneSelected: (val) => set({ isDropZoneSelected: val }),
  setPosition: (p) => set({ position: p }),
  resetSquad: () =>
    set({
      myFormation: "442",
      dropPlayers: {},
      selectedDropZone: { index: -1, pos: "" },
      isDropZoneSelected: false,
      position: "",
    }),
}));
