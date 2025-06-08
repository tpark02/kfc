import React from "react";

import { Player } from "../../types/Player";
import { getImgByCountryName } from "../../data/countryData";
import { useSquadStore } from "../../store/useSquadStore";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import SquadRadarChart from "./SquadRadarChart";

import { shallow } from "zustand/shallow";

import "../../style/Squad.css";

const getNationalitySpread = (players: Record<number, Player | null>) => {
  const nations = new Set(Object.values(players).map((p) => p?.nation));

  return nations;
};

const getLeagueSpread = (players: Record<number, Player | null>) => {
  const leagues = new Set(Object.values(players).map((p) => p?.league));
  return leagues;
};

const SquadMetrics: React.FC = () => {
  // const metricsData = metrics(players);
  const { 
    // dropPlayers, 
    myTeamOvr, 
    myTeamSquadValue } = useSquadStore(
    (s) => ({
      // dropPlayers: s.dropPlayers,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
    }),
    shallow
  );
  // const nationalSpread = getNationalitySpread(dropPlayers);
  // const leagueSpread = getLeagueSpread(dropPlayers);

  return (
    <div className="squad-overview">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "stretch",
          width: "90%",
          margin: "1px auto",
        }}
      >
        <div
          style={{
            outline: "1px solid gray",
            borderRadius: "8px",
            width: "100%",
            margin: "0 0 10px 0",
          }}
        >
          <Typography>OVR</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {typeof myTeamOvr === "number" && !isNaN(myTeamOvr)
              ? myTeamOvr
              : "N/A"}
          </Typography>
        </div>
        <div className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Total Value
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {typeof myTeamSquadValue === "number" && !isNaN(myTeamSquadValue)
              ? "$" + myTeamSquadValue.toLocaleString()
              : "$0"}
          </Typography>
        </div>
        <div className="squad-metrics-section">
          <SquadRadarChart />
        </div>
        <div className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Nations
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ padding: "15px" }}>
            {/* {Array.from(nationalSpread).length > 0 ? (
              Array.from(nationalSpread).map(
                (nation, idx) =>
                  nation && getImgByCountryName(nation ?? "", idx, 35, 25)
              )
            ) : (
              <div>&nbsp;</div>
            )} */}
          </Box>
        </div>
        <div className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Leagues
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ padding: "15px" }}>
            {/* {leagueSpread.size > 0 ? (
              Array.from(leagueSpread).map(
                (league, idx) =>
                  league && (
                    <Chip
                      key={league ?? `league-${idx}`}
                      label={league ?? "Unknown"}
                      size="small"
                      color="secondary"
                    />
                  )
              )
            ) : (
              <div>&nbsp;</div>
            )} */}
          </Box>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SquadMetrics;
