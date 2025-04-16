// src/components/PlayerList.tsx
import { useNavigate } from "react-router-dom";

import React from "react";
import { Player } from "../types/Player";
import { getStatDisplay } from "../style/PlayerStyle";

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const navigate = useNavigate();

  return (
    <>
      {players.map((repo) => (
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
      ))}
    </>
  );
};

export default PlayerList;
