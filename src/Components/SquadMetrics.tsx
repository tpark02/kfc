import React from "react";
import { Player } from "../types/Player";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import SquadRadarChart from "./SquadRadarChart";
import { getImgByCountryName } from "../data/countryData";

interface SquadMetricsProp {
  players: Record<number, Player | null>;
}
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

const estimateValue = (player: { ovr: number; pos: string }) => {
  const baseValue = Math.pow(player.ovr, 2) * 1000;
  return Math.round(baseValue * (positionMultiplier[player.pos] ?? 1));
};

const getTotalSquadValue = (players: Record<number, Player | null>) => {
  return Object.values(players).reduce(
    (sum, player) => sum + (player ? estimateValue(player) : 0),
    0
  );
};

const getPaceIndex = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalPace = validPlayers.reduce((sum, p) => sum + (p!.pac ?? 0), 0);
  return Math.round(totalPace / validPlayers.length);
};

const getDefenseAttackSplit = (players: Record<number, Player | null>) => {
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

const getTeamStamina = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalStamina = validPlayers.reduce(
    (sum, p) => sum + (p!.stamina ?? 0),
    0
  );
  return Math.round(totalStamina / validPlayers.length);
};

const getNationalitySpread = (players: Record<number, Player | null>) => {
  const nations = new Set(Object.values(players).map((p) => p?.nation));

  return nations;
};

const getLeagueSpread = (players: Record<number, Player | null>) => {
  const leagues = new Set(Object.values(players).map((p) => p?.league));
  return leagues;
};

const getClubCohesion = (players: Record<number, Player | null>) => {
  const clubCount: Record<string, number> = {};

  Object.values(players).forEach((p) => {
    if (p?.team) {
      clubCount[p.team] = (clubCount[p.team] || 0) + 1;
    }
  });

  return Math.max(...Object.values(clubCount), 0);
};

const getTeamOvr = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalOvr = validPlayers.reduce((sum, p) => sum + (p!.ovr ?? 0), 0);
  return Math.round(totalOvr / validPlayers.length);
};

const getTeamAge = (players: Record<number, Player | null>) => {
  const validPlayers = Object.values(players).filter((p) => p);
  if (validPlayers.length === 0) return 0;

  const totalAge = validPlayers.reduce((sum, p) => sum + (p!.age ?? 0), 0);
  return Math.round(totalAge / validPlayers.length);
};

const metrics = (players: Record<number, Player | null>) => {
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

interface SquadMetricsProp {
  players: Record<number, Player | null>;
}

const SquadMetrics: React.FC<SquadMetricsProp> = ({ players }) => {
  const metricsData = metrics(players);
  const nationalSpread = getNationalitySpread(players);
  const leagueSpread = getLeagueSpread(players);

  return (
    <div className="squad-random-team">
      <Card
        sx={{ mb: 2 }}
        style={{ color: "white", backgroundColor: "#242424" }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Squad Overview
          </Typography>
          <Box
            sx={{ mb: 2 }}
            style={{
              outline: "1px solid gray",
              borderRadius: "8px",
              padding: "5px",
            }}
          >
            <Typography>OVR</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {metricsData.teamovr}
            </Typography>
          </Box>
          <Box
            sx={{ mb: 2 }}
            style={{
              outline: "1px solid gray",
              borderRadius: "8px",
              padding: "5px",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Total Value
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {"$" + metricsData.squadvalue.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <SquadRadarChart players={players} />
          </Box>
          <Box
            sx={{ mb: 2 }}
            style={{
              outline: "1px solid gray",
              borderRadius: "8px",
              padding: "5px",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Nations
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Array.from(nationalSpread).length > 0 ? (
                Array.from(nationalSpread).map((nation, idx) =>
                  getImgByCountryName(nation ?? "", idx, 35, 25)
                )
              ) : (
                <div>&nbsp;</div>
              )}
            </Box>
          </Box>
          <Box
            style={{
              outline: "1px solid gray",
              borderRadius: "8px",
              padding: "5px",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Leagues
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {leagueSpread.size > 0 ? (
                Array.from(leagueSpread).map((league, idx) => (
                  <Chip
                    key={league ?? `league-${idx}`}
                    label={league ?? "Unknown"}
                    size="small"
                    color="secondary"
                  />
                ))
              ) : (
                <div>&nbsp;</div>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SquadMetrics;
