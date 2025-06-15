// src/components/PlayerList.tsx
import { useNavigate } from "react-router-dom";
import { Player } from "../../types/player";
import { getPlayerStatDisplay } from "../../style/playerStyle";
import { Button } from "@mui/material";
import { buyPlayer } from "../../util/myStoreUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { getPosColor } from "../../util/util";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useConfirmDialogStore } from "../../store/useConfirmDialogStore";

import "../../style/Player.css";

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const navigate = useNavigate();
  const { myUserId, setMySelectedPlayers } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
      setMySelectedPlayers: s.setMySelectedPlayers,
    }),
    shallow
  );
  const showConfirmDialog = useConfirmDialogStore.getState().showConfirm;

  return (
    <>
      {players.map((repo) => {
        const posColor = getPosColor(repo.pos ?? "");

        return (
          <div
            className="player-table"
            key={repo.id}
            style={{
              cursor: "pointer",
              backgroundColor: "#1e1e1e",
              padding: "10px",
            }}
          >
            {/* <div style={{ display: "flex" }}> */}
            <div
              className="player-row"
              onClick={() =>
                navigate(`/player/${repo.id}`, { state: { player: repo } })
              }
            >
              <div className="player-name">{repo.name}</div>
              {/* <div className="player-cell">{repo.age}</div> */}
              <div className="player-cell" style={{ color: posColor }}>
                {repo.pos}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("OVR", repo.ovr)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("SHO", repo.sho)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("DRI", repo.dri)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("PAS", repo.pas)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("DEF", repo.def)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("PAC", repo.pac)}
              </div>

              <div className="player-cell">
                {getPlayerStatDisplay("PHY", repo.phy)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("GK", repo.gkReflexes)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("Price", repo.price)}
              </div>
            </div>{" "}
            <Button
              variant="text"
              onClick={async () => {
                showConfirmDialog(
                  "Confirmation",
                  `Do you want to purchase ?\n`,
                  repo.name,
                  async () => {
                    // ✅ onConfirm logic
                    const res = await buyPlayer(myUserId, repo.id);
                    if (res.updatedMyPlayers.length > 0)
                      setMySelectedPlayers(res.updatedMyPlayers);
                    useSnackbarStore.getState().setSnackbar(res.msg);
                  },
                  () => {}
                );
              }}
            >
              Recruit
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
                {getPlayerStatDisplay("DRI", repo.dri)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("DEF", repo.def)}
              </div>
              <div className="player-cell">
                {getPlayerStatDisplay("PHY", repo.phy)}
              </div>
            </div> */}
          </div>
        );
      })}
      {/* </div> */}
    </>
  );
};

export default PlayerList;
