// ✅ React & Router
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ✅ Types
import { Team } from "../../types/team";
import { TeamPage } from "../../types/teamPage";
import { Player } from "../../types/player";

// ✅ Components & Utils
import RadarStatChart from "./RadarStatsChart";
import { getOvrColor } from "../../util/util";

// ✅ Data
import { countryData } from "../../data/countryData";

// ✅ Styles
import "../../style/PlayerSpec.css";
import axiosInstance from "../../axiosInstance";

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
      .get<TeamPage>("/teams") // 👈 baseURL 생략 가능
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
      <div className="player-info-cell-group">
        {isStat ? (
          <>
            <div className="player-info-cell">{name}</div>
            <div
              className="player-info-cell"
              style={{
                color: getOvrColor(player[key] as number),
                width: "20%",
                borderRadius: "3px",
              }}
            >
              {player[key] ? player[key] : "N/A"}
            </div>
          </>
        ) : (
          <>
            <div className="player-info-cell-label">{name}</div>
            <div
              className="player-info-cell"
              style={{
                borderRadius: "3px",
              }}
            >
              {player[key]}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="player-spec-body">
      {/* <button className="player-spec-backbutton" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button> */}

      <div className="player-content">
        <div className="player-basic-info">
          {/* <div className="player-img-container"> */}
            <div className="player-name-row">{player.name}</div>
          {/* </div> */}
          <RadarStatChart
            pac={player.pac}
            sho={player.sho}
            pas={player.pas}
            dri={player.dri}
            def={player.def}
            phy={player.phy}
          />
          <div className="player-info">
            {/* ✅ 국가 코드에 해당하는 flag 이미지 추가 */}
            <div className="player-info-cell-group">
              <div className="player-info-cell-label">Nation</div>
              <div
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
                <div
                  className="player-info-cell"
                  style={{
                    borderRadius: "3px",
                  }}
                >
                  {player.nation}
                </div>
              </div>
            </div>            
            {getValue("rank", "Rank", false)}
            {getValue("ovr", "OVR", false)}           
            {getValue("pos", "Position", false)}
            {getValue("age", "Age", false)}
            {getValue("height", "Height", false)}
            {getValue("weight", "Weight", false)}
          </div>
        </div>

        <div className="player-info-stats">
          <>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">SHOOTING</div>
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
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">DRIBBLING</div>
              {getValue("dribbling", "Dribbling")}
              {getValue("balance", "Balance")}
              {/* {getValue("reactions", "Reactions")} */}
              {getValue("ballControl", "Ball Control")}
              {getValue("agility", "Agility")}
              {/* {getValue("composure", "Composure")} */}
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">PASSING</div>
              {/* {getValue("vision", "Vision")} */}
              {getValue("crossing", "Crossing")}
              {getValue("shortPassing", "Short Passing")}
              {getValue("longPassing", "Long Passing")}
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">DEFENDING</div>
              {getValue("defAwareness", "Def. Awareness")}
              {getValue("standingTackle", "Standing Tackle")}
              {getValue("slidingTackle", "Sliding Tackle")}
              {getValue("interceptions", "Interceptions")}
            </div>

            <div className="player-info-stats-row">
              <div className="player-info-cell-label">PACE</div>
              {getValue("acceleration", "Acceleration")}
              {getValue("sprintSpeed", "Sprint Speed")}
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">PHYSICALITY</div>
              {getValue("jumping", "Jumping")}
              {getValue("stamina", "Stamina")}
              {getValue("strength", "Strength")}
              {getValue("aggression", "Aggression")}
            </div>            
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">GOALKEEPING</div>
              {getValue("gkDiving", "Diving")}
              {getValue("gkHandling", "Handling")}
              {getValue("gkKicking", "Kicking")}
              {getValue("gkPositioning", "Positioning")}
              {getValue("gkReflexes", "Reflexes")}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default PlayerSpec;
