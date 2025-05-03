import { Player } from "../types/Player";
import { baseFormations } from "../data/formations";

export const centerFormationVertically = (
  formation: { pos: string; top: number; left: number }[]
) => {
  const tops = formation.map((p) => p.top);
  const center = (Math.min(...tops) + Math.max(...tops)) / 2;
  const offset = 45 - center;
  const offsetL = -5;

  return formation.map((p) => ({
    ...p,
    top: p.top + offset,
    left: p.left + offsetL,
  }));
};

export const formations = Object.fromEntries(
  Object.entries(baseFormations).map(([key, value]) => [
    key,
    centerFormationVertically(value),
  ])
);

// ---------- Metrics ----------

const positionMultiplier: Record<string, number> = {
  GK: 0.9,
  CB: 1.0,
  LB: 1.0,
  RB: 1.0,
  CDM: 1.05,
  CM: 1.1,
  CAM: 1.15,
  LM: 1.1,
  RM: 1.1,
  LW: 1.2,
  RW: 1.2,
  ST: 1.3,
  CF: 1.25,
};

const defenders = ["GK", "CB", "LB", "RB", "LWB", "RWB", "CDM"];
const attackers = ["ST", "CF", "CAM", "LW", "RW", "LM", "RM"];

export const estimateValue = (player: { ovr: number; pos: string }) => {
  const baseValue = Math.pow(player.ovr, 2) * 1000;
  return Math.round(baseValue * (positionMultiplier[player.pos] ?? 1));
};

export const getTotalSquadValue = (players: Record<number, Player | null>) => {
  return Object.values(players).reduce(
    (sum, player) => sum + (player ? estimateValue(player) : 0),
    0
  );
};

export const getPaceIndex = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalPace = validPlayers.reduce((sum, p) => sum + (p!.pac ?? 0), 0);
  return Math.round(totalPace / validPlayers.length);
};

export const getDefenseAttackSplit = (
  players: Record<number, Player | null>
) => {
  const values = Object.values(players);
  const defPlayers = values.filter((p) => p && defenders.includes(p.pos));
  const atkPlayers = values.filter((p) => p && attackers.includes(p.pos));

  const avgDefending =
    defPlayers.reduce((sum, p) => sum + (p!.def ?? 0), 0) /
    (defPlayers.length || 1);
  const avgShooting =
    atkPlayers.reduce((sum, p) => sum + (p!.sho ?? 0), 0) /
    (atkPlayers.length || 1);

  return {
    defense: Math.round(avgDefending),
    attack: Math.round(avgShooting),
  };
};

export const getTeamStamina = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalStamina = validPlayers.reduce(
    (sum, p) => sum + (p!.stamina ?? 0),
    0
  );
  return Math.round(totalStamina / validPlayers.length);
};

export const getNationalitySpread = (
  players: Record<number, Player | null>
) => {
  const nations = new Set(Object.values(players).map((p) => p?.nation));
  return nations;
};

export const getLeagueSpread = (players: Record<number, Player | null>) => {
  const leagues = new Set(Object.values(players).map((p) => p?.league));
  return leagues;
};

export const getClubCohesion = (players: Record<number, Player | null>) => {
  const clubCount: Record<string, number> = {};

  Object.values(players).forEach((p) => {
    if (p?.team) {
      clubCount[p.team] = (clubCount[p.team] || 0) + 1;
    }
  });

  return Math.max(...Object.values(clubCount), 0);
};

export const getTeamOvr = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalOvr = validPlayers.reduce((sum, p) => sum + (p!.ovr ?? 0), 0);
  return Math.round(totalOvr / validPlayers.length);
};

export const getTeamAge = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalAge = validPlayers.reduce((sum, p) => sum + (p!.age ?? 0), 0);
  return Math.round(totalAge / validPlayers.length);
};

export const metrics = (players: Record<number, Player | null>) => {
  const { defense, attack } = getDefenseAttackSplit(players);

  return {
    teamovr: getTeamOvr(players),
    teamage: getTeamAge(players),
    squadvalue: getTotalSquadValue(players),
    nationalityspread: getNationalitySpread(players),
    leaguespread: getLeagueSpread(players),
    clubcohesion: getClubCohesion(players),
    teamstamina: getTeamStamina(players),
    teamdef: defense,
    teamattack: attack,
    teampace: getPaceIndex(players),
  };
};
