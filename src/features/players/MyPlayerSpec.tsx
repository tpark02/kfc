// ✅ React & Router
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ✅ Types
import { Team } from "../../types/team";
import { TeamPage } from "../../types/teamPage";
import { MyPlayer, Player } from "../../types/player";

// ✅ Components & Utils
import RadarStatChart from "./RadarStatsChart";
import { getOvrColor } from "../../util/util";

// ✅ Data
import { countryData } from "../../data/countryData";

// ✅ Styles
import CroppedAvatar from "../squad/CroppedAvatar";
import axiosInstance from "../../app/axiosInstance";
import { Box } from "@mui/system";
import "../../style/PlayerSpec.css";

const MyPlayerSpec: React.FC = () => {
  const location = useLocation();
  const player = (location.state as { player: MyPlayer })?.player;

  const countryCode =
    countryData.find((d) =>
      d.name.toLowerCase().includes(player.nation.toLowerCase())
    )?.code ?? "unknown";

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axiosInstance
      .get<TeamPage>("/teams") // 👈 baseURL 생략 가능
      .then((response) => {
        console.log(response.data.content);
        setTeams(response.data.content);
      })
      .catch((err) => console.error(err));
  }, [location.pathname]);

  const getValue = (
    key: keyof MyPlayer,
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
      {/* <button className="player-spec-backbutton" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button> */}

      <Box className="player-content">
        <Box className="player-basic-info">
          <Box className="player-img-container">
            <CroppedAvatar
              src={player.img}
              fallbackSrc="/img/avatar.jpg"
              width={250}
              height={350}
              fallBackWidth={200}
              fallBackHeight={200}
              aspectRatio={4 / 3}
            />
            {/* <Box className="player-name-row">{player.name}</Box> */}
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
            {/* ✅ 국가 코드에 해당하는 flag 이미지 추가 */}
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
                    backgroundColor: "white", // ✅ add white background
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

              {/* {getValue("positioning", "Positioning")}
              {getValue("finishing", "Finishing")}
              {getValue("shotPower", "Shot Power")}
              {getValue("longShots", "Long Shots")}
              {getValue("volleys", "Volleys")}
              {getValue("crossing", "Crossing")}
              {getValue("freeKickAccuracy", "Free Kick Accuracy")}
              {getValue("curve", "Curve")} */}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">DRIBBLING</Box>
              {getValue("dribbling", "Dribbling")}
              {getValue("balance", "Balance")}
              {/* {getValue("reactions", "Reactions")} */}
              {getValue("ballControl", "Ball Control")}
              {getValue("agility", "Agility")}
              {/* {getValue("composure", "Composure")} */}
            </Box>
            <Box className="player-info-stats-row">
              <Box className="player-info-cell-label">PASSING</Box>
              {/* {getValue("vision", "Vision")} */}
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

export default MyPlayerSpec;
