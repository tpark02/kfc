import { Player } from "./Player";

export type Match = {
  homeTeam: string;
  awayTeam: string;
  round: number;
  ovr: number;
  res: string;
  members: Player[];
  addStats: number;
};
