import { useNavigate } from "react-router-dom";
import { Player } from "../../types/player";
import {
  getPlayerStatDisplay,
  getPlayerStringDisplay,
} from "../../style/playerStyle";
import { Button } from "@mui/material";
import { buyPlayer } from "../../util/myStoreUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { getPosColor } from "../../util/util";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useConfirmDialogStore } from "../../store/useConfirmDialogStore";
import { useLoadingMyCoin } from "../../hooks/useLoadingMyCoin";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";

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
  const { reload } = useLoadingMyCoin(myUserId);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {players.map((repo) => {
        const posColor = getPosColor(repo.pos ?? "");

        return (
          <Box
            className="player-table"
            key={repo.id}
            sx={{
              cursor: "pointer",
              backgroundColor: "#1b1f26",
              padding: "10px",
              margin: "1rem",
            }}
          >
            {isMobile ? (
              // ✅ Mobile Layout
              <Box
                className="player-row-mobile"
                onClick={() =>
                  navigate(`/player/${repo.id}`, { state: { player: repo } })
                }
              >
                <Box className="player-name" sx={{ textAlign: "center" }}>
                  {repo.name}
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box
                    className="player-cell"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {getPlayerStringDisplay("POS", repo.pos, posColor)}
                  </Box>
                  <Box className="player-cell" sx={{ color: posColor }}>
                    {getPlayerStatDisplay("OVR", repo.ovr)}
                  </Box>
                  <Box className="player-cell" sx={{ color: posColor }}>
                    {getPlayerStatDisplay("Price", repo.price)}
                  </Box>
                </Box>
              </Box>
            ) : (
              // ✅ Desktop Layout
              <Box
                className="player-row"
                onClick={() =>
                  navigate(`/player/${repo.id}`, { state: { player: repo } })
                }
              >
                <Box className="player-name">{repo.name}</Box>
                <Box className="player-cell" sx={{ color: posColor }}>
                  {repo.pos}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("OVR", repo.ovr)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("SHO", repo.sho)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("DRI", repo.dri)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("PAS", repo.pas)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("DEF", repo.def)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("PAC", repo.pac)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("PHY", repo.phy)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("GK", repo.gkReflexes)}
                </Box>
                <Box className="player-cell">
                  {getPlayerStatDisplay("Price", repo.price)}
                </Box>
              </Box>
            )}
            <Button
              variant="text"
              onClick={async () => {
                showConfirmDialog(
                  "Confirmation",
                  `Do you want to purchase ?\n`,
                  repo.name,
                  async () => {
                    const res = await buyPlayer(myUserId, repo.id);
                    if (res.updatedMyPlayers.length > 0)
                      setMySelectedPlayers(res.updatedMyPlayers);
                    useSnackbarStore.getState().setSnackbar(res.msg, true);
                  },
                  () => {}
                );
                reload();
              }}
            >
              Recruit
            </Button>
          </Box>
        );
      })}
    </>
  );
};

export default PlayerList;
