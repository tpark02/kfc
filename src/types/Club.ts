import { Player } from './Player';

export type Club = {
  clubId?: number;
  name: string;
  formationName: string;
  players: Player[];
  ovr: number;
  price: number;
  age: number;
  pace: number;
  defense: number;
  attack: number;
  clubCohesion: number;
  stamina: number;
}