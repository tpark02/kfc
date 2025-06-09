import { MyPlayer } from "./player";

export interface MatchDto {
  id: number;
  round: number;
  player1Name: string;
  player2Name: string;
  winnerName: string;
  myPlayerList1: MyPlayer[];
  myPlayerList2: MyPlayer[];
}