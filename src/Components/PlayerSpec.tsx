import { useLocation, useNavigate } from "react-router-dom";
import { Player } from "../types/Player";
import "../PlayerSpec.css"; // 스타일은 여기에 따로 분리할게
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RadarStatChart from "./RadarStatsChart";

const PlayerSpec: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const player = (location.state as { player: Player })?.player;
  const getValue = (key: keyof Player, name: string) => {
    return (
      <>
        <div className="player-info-cell-group">
          <div className="player-info-cell">{name}</div>
          <div className="player-info-cell">
            {player[key] !== null ? String(player[key]) : "N/A"}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="player-spec-body">
      <button className="player-spec-backbutton" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button>

      <div className="player-content">
        <div className="player-basic-info">
          <div className="player-img-container">
            <img
              className="player-spec-img"
              src={player.img}
              alt={player.name}
            />
            <div className="player-name-row">
              <h2 className="player-name">{player.name}</h2>
            </div>
          </div>

          <RadarStatChart
            pac={player.pac}
            sho={player.sho}
            pas={player.pas}
            dri={player.dri}
            def={player.def}
            phy={player.phy}
          />

          <div className="player-info">
            {getValue("nation", "Nation")}
            {getValue("league", "League")}
            {getValue("rank", "Rank")}
            {getValue("ovr", "OVR")}
            {getValue("team", "Club")}
            {getValue("pos", "Position")}
            {getValue("age", "Age")}
            {getValue("height", "Height")}
            {getValue("weight", "Weight")}
          </div>
        </div>
        <div className="player-info-stats">
          <>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">SHOOTING</div>
              {getValue("positioning", "Positioning")}
              {getValue("finishing", "Finishing")}
              {getValue("shotPower", "Shot Power")}
              {getValue("longShots", "Long Shots")}
              {getValue("volleys", "Volleys")}
              {getValue("crossing", "Crossing")}
              {getValue("freeKickAccuracy", "Free Kick Accuracy")}
              {getValue("curve", "Curve")}
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">DRIBBLING</div>
              {getValue("dribbling", "Dribbling")}
              {getValue("balance", "Balance")}
              {getValue("reactions", "Reactions")}
              {getValue("ballControl", "Ball Control")}
              {getValue("agility", "Agility")}
              {getValue("composure", "Composure")}
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">PASSING</div>
              {getValue("vision", "Vision")}
              {getValue("crossing", "Crossing")}
              {getValue("shortPassing", "Short Passing")}
              {getValue("longPassing", "Long Passing")}
            </div>
            <div className="player-info-stats-row">
              <div className="player-info-cell-label">DEFENDING</div>
              {getValue("defAwareness", "Defensive Awareness")}
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
              <div className="player-info-cell-label">MENTALITY</div>
              {getValue("vision", "Vision")}
              {getValue("penalties", "Penalties")}
              {getValue("composure", "Composure")}
              {getValue("interceptions", "Interceptions")}
              {getValue("defAwareness", "Defensive Awareness")}
              {getValue("aggression", "Aggression")}
              {getValue("reactions", "Reactions")}
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
