// src/components/PlayerList.tsx
import { useNavigate } from "react-router-dom";
import { Player } from "../../types/player";
import { getStatDisplay } from "../../style/playerStyle";
import { Button } from "@mui/material";
import { buyPlayer } from "../../util/myStoreUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
// import CroppedAvatar from "../teambuilder/CroppedAvatar";
import "../../style/Player.css";

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const navigate = useNavigate();
  const { myUserId } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
    }),
    shallow
  );
  return (
    <>
      {players.map((repo) => (
        <div
          className="player-table"
          key={repo.id}
          style={{ cursor: "pointer" }}
        >
          {/* <div style={{ display: "flex" }}> */}
          <div
            className="player-row"
            onClick={() =>
              navigate(`/player/${repo.id}`, { state: { player: repo } })
            }
          >            
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
          </div>{" "}
          <Button
            variant="contained"
            style={{ outline: "1px solid red" }}
            onClick={async () => {
              console.log("buy button clicked!");
              const message = await buyPlayer(myUserId, repo.id);
              alert(message); // 혹은 toast 등으로 출력
            }}
          >
            Buy
          </Button>
          {/* </div> */}
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
