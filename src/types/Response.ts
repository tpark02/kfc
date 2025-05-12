import { Player } from "./Player";

export type ResponseSearch = { content: Player[] };

export type ResponsePlayerPage = {
  content: Player[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 번호
  size: number; // 한 페이지당 개수
};

export type ResponseSaveSquad = {
  isSuccessful: string;
};

export type ResponseLoadSquad = {
  content: Player[];
  name: string;
  myTeamName: string;
  myTeamOvr: number;
};

export type ResponseRandomSquad = {
  content: Player[];
  myTeamOvr: number;
  chemistry: number;
  myTeamName: string;
  myTeamSquadValue: number;
  myTeamAge: number;
  myTeamPace: number;
  myTeamDef: number;
  myTeamAtk: number;
  myTeamClubCohesion: number;
  myTeamStamina: number;
  benchPlayers: Player[];
};
