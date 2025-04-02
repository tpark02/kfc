import "./App.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

type Player = {
  id: number;
  rank: number;
  name: string;
  ovr: number;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  acceleration: number;
  sprintSpeed: number;
  positioning: number;
  finishing: number;
  shotPower: number;
  longShots: number;
  volleys: number;
  penalties: number;
  vision: number;
  crossing: number;
  freeKickAccuracy: number;
  shortPassing: number;
  longPassing: number;
  curve: number;
  dribbling: number;
  agility: number;
  balance: number;
  reactions: number;
  ballControl: number;
  composure: number;
  interceptions: number;
  headingAccuracy: number;
  defAwareness: number;
  standingTackle: number;
  slidingTackle: number;
  jumping: number;
  stamina: number;
  strength: number;
  aggression: number;
  pos: string;
  weakFoot: number;
  skillMoves: number;
  preferredFoot: string;
  height: string;
  weight: string;
  alternativePositions: string;
  age: number;
  nation: string;
  league: string;
  team: string;
  playStyle: string;
  url: string;
  img: string;
  gkDiving: number;
  gkHandling: number;
  gkKicking: number;
  gkPositioning: number;
  gkReflexes: number;
};

function App() {
  const [reopdata, setReopdata] = useState<Player[]>([]);

  useEffect(() => {
    axios
      .get<Player[]>(`http://localhost:8080/api/players`)
      .then((response) => setReopdata(response.data))
      .catch((err) => console.error(err));
  });
  return (
    <>
      {
        <table>
          <tbody>
            {reopdata.map((repo) => (
              <React.Fragment key={repo.id}>
                {/* 1행: 이미지 + 이름 + PAC/SHO/PAS */}
                <tr>
                  <td rowSpan={2}>
                    <img
                      src={repo.img}
                      alt={repo.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td className="player-name">{repo.name}</td>
                  <td>{repo.pac}</td>
                  <td>{repo.sho}</td>
                  <td>{repo.pas}</td>
                </tr>
                {/* 2행: 포지션 + DRI/DEF/PHY */}
                <tr>
                  <td className="player-pos">{repo.pos}</td>
                  <td>{repo.dri}</td>
                  <td>{repo.def}</td>
                  <td>{repo.phy}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      }
    </>
  );
}

export default App;
