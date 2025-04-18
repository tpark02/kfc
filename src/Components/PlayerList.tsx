// src/components/PlayerList.tsx
import { useNavigate } from "react-router-dom";

import React from "react";
import { Player } from "../types/Player";
import { getStatDisplay } from "../Style/PlayerStyle";
import "../Player.css";
interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* {players.map((repo) => (
        <div
          className="player-card"
          key={repo.id}
          onClick={() =>
            navigate(`/player/${repo.id}`, { state: { player: repo } })
          }
          style={{ cursor: "pointer" }}
        >
          <table className="player-table">
            <tbody>
              <tr>
                <td rowSpan={2}>
                  <img src={repo.img} alt={repo.name} className="player-img" />
                </td>
                <td rowSpan={2} className="cell">
                  {repo.name}
                </td>
                <td rowSpan={2} className="cell">
                  {repo.pos}
                </td>
                <td className="cell">{repo.age}</td>
                <td rowSpan={2} className="cell">
                  {getStatDisplay("OVR", repo.ovr)}
                </td>
                <td className="cell">{getStatDisplay("PAC", repo.pac)}</td>
                <td className="cell">{getStatDisplay("SHO", repo.sho)}</td>
                <td className="cell">{getStatDisplay("PAS", repo.pas)}</td>
              </tr>
              <tr>
                <td className="cell">{repo.height}</td>
                <td className="cell">{getStatDisplay("DRI", repo.dri)}</td>
                <td className="cell">{getStatDisplay("DEF", repo.def)}</td>
                <td className="cell">{getStatDisplay("PHY", repo.phy)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))} */}
      {/* <div className="player-list"> */}
      {players.map((repo) => (
        <div
          className="player-card"
          key={repo.id}
          onClick={() =>
            navigate(`/player/${repo.id}`, { state: { player: repo } })
          }
          style={{ cursor: "pointer" }}
        >
          <div className="player-row top-row">
            <img src={repo.img} alt={repo.name} className="player-img" />
            <div className="player-name">{repo.name}</div>
            <div className="player-cell">{repo.age}</div>
            <div className="player-cell">{repo.pos}</div>
            <div className="player-cell">{getStatDisplay("OVR", repo.ovr)}</div>
            <div className="player-cell">{getStatDisplay("PAC", repo.pac)}</div>
            <div className="player-cell">{getStatDisplay("SHO", repo.sho)}</div>
            <div className="player-cell">{getStatDisplay("PAS", repo.pas)}</div>
            <div className="player-cell">{getStatDisplay("DRI", repo.dri)}</div>
            <div className="player-cell">{getStatDisplay("DEF", repo.def)}</div>
            <div className="player-cell">{getStatDisplay("PHY", repo.phy)}</div>
          </div>
          {/* <div className="player-row bottom-row">
              <div className="player-cell" style={{ visibility: "hidden" }}>
                placeholder
              </div>
              <div className="player-cell" style={{ visibility: "hidden" }}>
                {repo.height}
              </div>
              <div className="player-cell">
                {getStatDisplay("DRI", repo.dri)}
              </div>
              <div className="player-cell">
                {getStatDisplay("DEF", repo.def)}
              </div>
              <div className="player-cell">
                {getStatDisplay("PHY", repo.phy)}
              </div>
            </div> */}
        </div>
      ))}
      {/* </div> */}
    </>
  );
};

export default PlayerList;
