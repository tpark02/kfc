import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Team } from "../../types/team";
import { TeamPage } from "../../types/teamPage";
import { Player } from "../../types/player";

import RadarStatChart from "./RadarStatsChart";
import { getOvrColor } from "../../util/util";

import { countryData, setCrest } from "../../data/countryData";

import axiosInstance from "../../app/axiosInstance";
import CroppedAvatar from "../squad/CroppedAvatar";
import { Box } from "@mui/system";
import "../../style/PlayerSpec.css";

const PlayerSpec: React.FC = () => {
  const location = useLocation();
  const player = (location.state as { player: Player })?.player;

  const countryCode =
    countryData.find((d) =>
      d.name.toLowerCase().includes(player.nation.toLowerCase())
    )?.code ?? "unknown";

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axiosInstance
      .get<TeamPage>("/teams")
      .then((response) => {
        console.log(response.data.content);
        setTeams(response.data.content);
      })
      .catch((err) => console.error(err));
  }, [location.pathname]);

  const getValue = (
    key: keyof Player,
    name: string,
    isStat: boolean = true
  ) => {
    return (
      <Box className="player-info-cell-group">
        {isStat ? (
          <>
            <Box className="player-info-cell">{name}</Box>
            <Box
              className="player-info-cell"
              style={{
                color: getOvrColor(player[key] as number),
                width: "20%",
                borderRadius: "3px",
              }}
            >
              {player[key] ? player[key] : "N/A"}
            </Box>
          </>
        ) : (
          <>
            <Box className="player-info-cell-label">{name}</Box>
            <Box
              className="player-info-cell"
              style={{
                borderRadius: "3px",
              }}
            >
              {player[key]}
            </Box>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box className="player-spec-body">
      <Box className="player-content">
        <Box className="player-basic-info">
          <Box className="player-img-container">
            <CroppedAvatar
              src={player.img}
              fallbackSrc="/img/avatar.jpg"
              width={250}
              height={350}
              fallBackWidth={250}
              fallBackHeight={250}
              aspectRatio={4 / 3}
            />
          </Box>
          <RadarStatChart
            pac={player.pac}
            sho={player.sho}
            pas={player.pas}
            dri={player.dri}
            def={player.def}
            phy={player.phy}
          />
          <Box className="player-info">
            <Box className="player-info-cell-group">
              <Box className="player-info-cell-label">Nation</Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={`https://flagcdn.com/w40/${countryCode}.png`}
                  alt={countryCode}
                  style={{
                    width: "auto",
                    height: "15px",
                    backgroundColor: "white",
                    margin: "0 5px",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "../../img/fallback.png";
                  }}
                />
                <Box
                  className="player-info-cell"
                  style={{
                    borderRadius: "3px",
                  }}
                >
                  {player.nation}
                </Box>
              </Box>
            </Box>
            <Box className="player-info-cell-group">
              <Box className="player-info-cell-label">League</Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-evenly",
                }}
              >
                {setCrest(player.leagueUrl, 35, 25)}
                <Box
                  className="player-info-cell"
                  style={{
                    borderRadius: "3px",
                    textAlign: "end",
                  }}
                >
                  {player.league}
                </Box>
              </Box>
            </Box>
            <Box className="player-info-cell-group">
              <Box className="player-info-cell-label">Club</Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-evenly",
                }}
              >
                {setCrest(player.teamUrl, 35, 25)}
                <Box
                  className="player-info-cell"
                  style={{
                    borderRadius: "3px",
                    textAlign: "end",
                  }}
                >
                  {player.team}
                </Box>
              </Box>
            </Box>
            {getValue("rank", "Rank", false)}
            {getValue("ovr", "OVR", false)}
            {getValue("pos", "Position", false)}
            {getValue("age", "Age", false)}
            {getValue("height", "Height", false)}
            {getValue("weight", "Weight", false)}
          </Box>
        </Box>

        <Box className="player-info-stats">
          <>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">SHOOTING</Box>
              {getValue("shotPower", "Shot Power")}
              {getValue("longShots", "Long Shots")}
              {getValue("freeKickAccuracy", "Free Kick Accuracy")}
              {getValue("curve", "Curve")}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">DRIBBLING</Box>
              {getValue("dribbling", "Dribbling")}
              {getValue("balance", "Balance")}
              {getValue("ballControl", "Ball Control")}
              {getValue("agility", "Agility")}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">PASSING</Box>
              {getValue("crossing", "Crossing")}
              {getValue("shortPassing", "Short Passing")}
              {getValue("longPassing", "Long Passing")}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">DEFENDING</Box>
              {getValue("defAwareness", "Def. Awareness")}
              {getValue("standingTackle", "Standing Tackle")}
              {getValue("slidingTackle", "Sliding Tackle")}
              {getValue("interceptions", "Interceptions")}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">PACE</Box>
              {getValue("acceleration", "Acceleration")}
              {getValue("sprintSpeed", "Sprint Speed")}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">PHYSICALITY</Box>
              {getValue("jumping", "Jumping")}
              {getValue("stamina", "Stamina")}
              {getValue("strength", "Strength")}
              {getValue("aggression", "Aggression")}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">GOALKEEPING</Box>
              {getValue("gkBoxing", "Boxing")}
              {getValue("gkHandling", "Handling")}
              {getValue("gkKicking", "Kicking")}
              {getValue("gkPositioning", "Positioning")}
              {getValue("gkReflexes", "Reflexes")}
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerSpec;
