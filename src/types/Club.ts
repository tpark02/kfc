import { MyPlayer } from './player';

export type MyClubData = {
  clubId?: number;
  name: string;
  formationName: string;
  players: MyPlayer[];
  ovr: number;
  price: number;
  age: number;
  pace: number;
  defense: number;
  attack: number;
  clubCohesion: number;
  stamina: number;

  nation: string;           // ✅ new
  teamLogoImg: string;      // ✅ new
};
