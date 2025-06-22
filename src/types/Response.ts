import { MyPlayer, Player } from "./player";

export type ResponseSearch = { content: Player[] };

export type ResponsePlayerPage = {
  playerList: Player[];
  totalPages: number;
  totalElements: number;
  number: number; 
  size: number; 
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
  myPlayerList: MyPlayer[];
  myTeamOvr: number;  
  myTeamClubCohesion: number;
  myTeamStamina: number;  
  myTeamAge: number;
  myTeamAtk: number;
  myTeamDef: number;
  myTeamPace: number;  
  myTeamSquadValue: number;  
};

export type SeasonResponse = {
  id: number;
  name: string;
  started: boolean;
  createdAt: string;
  finishedAt: string | null;
  participantNames: string[];
  remainingSeconds: number;
};

export type UserInfoResponse = {
  id: number;
  username: string;
  email: string;
  password: string;
  coin: number;
  tournamentToken: number;
  leagueToken: number;
  isAi: string;
};

export type BuyResponse = {
  updatedMyPlayers: MyPlayer[];
  msg: string;
  purchasedPlayer: string;
};
