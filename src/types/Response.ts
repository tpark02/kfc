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
  myTeamSquadValue: number;
  myTeamAge: number;
  myTeamPace: number;
  myTeamDef: number;
  myTeamAtk: number;
  myTeamClubCohesion: number;
  myTeamStamina: number;
  benchPlayers: Player[];
};

export type SeasonResponse = {
  id: number;
  name: string;
  started: boolean;
  createdAt: string;
  finishedAt: string | null;
  participantNames: string[];
  remainingSeconds: number;
}