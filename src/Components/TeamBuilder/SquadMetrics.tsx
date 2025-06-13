import React from "react";

import { useSquadStore } from "../../store/useSquadStore";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SquadRadarChart from "./squadRadarChart";

import { shallow } from "zustand/shallow";
import { getImgByCountryName } from "../../data/countryData";
import "../../style/Squad.css";

const SquadMetrics: React.FC = () => {
  // const metricsData = metrics(players);
  const {
    // dropPlayers,
    myTeamName,
    myLogoImgUrl,
    mySelectedPlayers,
    myTeamOvr,
    myTeamSquadValue,
  } = useSquadStore(
    (s) => ({
      // dropPlayers: s.dropPlayers,
      myTeamName: s.myTeamName,
      myLogoImgUrl: s.myLogoImgUrl,
      mySelectedPlayers: s.mySelectedPlayers,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
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

  return (
    <div className="squad-overview">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "stretch",
          // width: "90%",
          // margin: "1px auto",
        }}
      >
        <div className="squad-metrics-section">
          <img src={myLogoImgUrl} style={{ width: "50%", height: "auto" }} />
          <Typography variant="h3">{myTeamName}</Typography>
        </div>
        <div className="squad-metrics-section">
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
              <div>&nbsp;</div>
            )}
          </Box>
        </div>
        {/* <div className="squad-metrics-section"> */}
        {/* <Typography variant="subtitle2" gutterBottom>
            Leagues
          </Typography> */}
        {/* <Box display="flex" flexWrap="wrap" gap={1} sx={{ padding: "15px" }}> */}
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
        {/* </Box> */}
        {/* </div> */}
      </div>
    </div>
    // </div>
  );
};

export default SquadMetrics;
