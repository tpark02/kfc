import React, { useEffect } from "react";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { useSquadStore } from "../../store/useSquadStore";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SquadRadarChart from "./SquadRadarChart";

import { shallow } from "zustand/shallow";
import { getImgByCountryName } from "../../data/countryData";
import { setCrest } from "../../data/countryData";

import "../../style/Squad.css";

const SquadMetrics: React.FC = () => {
  const {
    myTeamName,
    mySelectedPlayers,
    myTeamOvr,
    myTeamSquadValue,
    myLogoImgUrl,
  } = useSquadStore(
    (s) => ({
      myTeamName: s.myTeamName,
      mySelectedPlayers: s.mySelectedPlayers,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      myLogoImgUrl: s.myLogoImgUrl,
    }),
    shallow
  );

  const nationalSpread = Array.from(
    new Set(
      mySelectedPlayers
        .map((player) => player.nation)
        .filter((nation): nation is string => !!nation)
    )
  );

  const leagueSpread = Array.from(
    new Set(
      mySelectedPlayers.map((p) => p.leagueUrl).filter((l): l is string => !!l)
    )
  );

  const clubSpread = Array.from(
    new Set(
      mySelectedPlayers.map((p) => p.teamUrl).filter((l): l is string => !!l)
    )
  );

  useEffect(() => {
    console.log("my team ovr", mySelectedPlayers);

    if (
      myTeamName !== "" &&
      myLogoImgUrl !== "" &&
      mySelectedPlayers &&
      mySelectedPlayers.length > 0
    ) {
      useLoadingSpinnerStore.getState().setIsLoading(false);
    }
  }, [myTeamName, myLogoImgUrl, mySelectedPlayers]);

  return (
    <Box className="squad-overview">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "stretch",
          // width: "90%",
          // margin: "1px auto",
        }}
      >
        <Box className="squad-metrics-section">
          <img src={myLogoImgUrl} style={{ width: "50%", height: "auto" }} />
          <Typography variant="h3">{myTeamName}</Typography>
        </Box>
        <Box className="squad-metrics-section">
          <Typography>OVR</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {typeof myTeamOvr === "number" && !isNaN(myTeamOvr)
              ? myTeamOvr
              : "N/A"}
          </Typography>
        </Box>
        <Box className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Total Value
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {typeof myTeamSquadValue === "number" && !isNaN(myTeamSquadValue)
              ? "$" + myTeamSquadValue.toLocaleString()
              : "$0"}
          </Typography>
        </Box>
        <Box className="squad-metrics-section">
          <SquadRadarChart />
        </Box>
        <Box className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Nations
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ padding: "15px" }}>
            {nationalSpread.length > 0 ? (
              nationalSpread.map((nation, idx) => {
                const safeKey = `${
                  nation?.replace(/\s/g, "-") || "unknown"
                }-${idx}`;
                return (
                  <React.Fragment key={safeKey}>
                    {getImgByCountryName(nation ?? "", idx, 35, 25)}
                  </React.Fragment>
                );
              })
            ) : (
              <Box>&nbsp;</Box>
            )}
          </Box>
        </Box>
        <Box className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Leagues
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ padding: "15px" }}>
            {leagueSpread.length > 0 &&
              Array.from(leagueSpread).map((league, idx) => (
                <React.Fragment key={`league-${league}-${idx}`}>
                  {setCrest(league, 35, 25)}
                </React.Fragment>
              ))}
          </Box>
        </Box>
        <Box className="squad-metrics-section">
          <Typography variant="subtitle2" gutterBottom>
            Clubs
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ padding: "15px" }}>
            {clubSpread.length > 0 &&
              Array.from(clubSpread).map((team, idx) => (
                <React.Fragment key={`club-${team}-${idx}`}>
                  {setCrest(team, 35, 25)}
                </React.Fragment>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SquadMetrics;
