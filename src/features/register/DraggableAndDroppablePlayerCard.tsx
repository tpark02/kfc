import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { MyPlayer } from "../../types/player";
import {
  outerCardStyle,
  rowStyle,
  posStyle,
  nameBoxStyle,
  firstNameStyle,
  lastNameStyle,
  ovrStyle,
} from "../../style/playerCardStyles";
import { getStatDisplay } from "../../style/playerStyle";
import { getPosColor } from "../../util/util";
import { useConfirmDialogStore } from "../../store/useConfirmDialogStore";
import { updatePlayer } from "../../util/myClubUtil";
import { useSquadGetters } from "../../hooks/useSquadGetters";
import { useSnackbarStore } from "../../store/userSnackBarStore";

interface Props {
  player: MyPlayer;
  index: number;
  onSwap: (sourceIndex: number, targetIndex: number) => void;
  isDelete: boolean;
}

const DraggableAndDroppablePlayerCard: React.FC<Props> = ({
  player,
  index,
  onSwap,
  isDelete,
}) => {
  const showConfirmDialog = useConfirmDialogStore.getState().showConfirm;

  const {myUserId} = useSquadGetters();

  const navigate = useNavigate();
  const indexRef = useRef(index);
  indexRef.current = index;
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "PLAYER",
    item: () => ({ index: indexRef.current }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: "PLAYER",
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        onSwap(item.index, index);
      }
    },
  });

  const posColor = getPosColor(player.pos);
  const [firstName, lastName] = player.name.split(" ");

  if (isDelete) {
    return player.name === "dummy" ? (
      <Box sx={outerCardStyle(false)}>
        <Box sx={{ ...rowStyle }}>
          <Typography
            variant="body2"
            component="span"
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            EMPTY
          </Typography>
        </Box>
      </Box>
    ) : (
      <Box
        component="button"
        onClick={async () => {
          showConfirmDialog(
            "Confirmation",
            `Do you want to delete ?\n`,
            player.name,
            async () => {
              const res = await updatePlayer(myUserId, player.idx);              
              useSnackbarStore.getState().setSnackbar(res);
            },
            () => {}
          );
        }}
        sx={{
          ...outerCardStyle(false),
          backgroundColor: "red",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2a2e35 !important",
          },
        }}
      >
        <Box
          ref={(node: HTMLDivElement | null) => dragRef(dropRef(node))}
          sx={rowStyle}
        >
          <Typography variant="body2" component="span" sx={posStyle(posColor)}>
            {player.pos}
          </Typography>

          <Box sx={nameBoxStyle}>
            <Typography component="span" sx={firstNameStyle}>
              {firstName}
            </Typography>
            <Typography component="span" sx={lastNameStyle}>
              {lastName}
            </Typography>
          </Box>

          <Typography variant="body2" component="span" sx={ovrStyle}>
            {getStatDisplay(player.ovr)}
          </Typography>
          {/* </Box> */}
        </Box>
      </Box>
    );
  } else {
    return player.name === "dummy" ? (
      <Box
        sx={outerCardStyle(isDragging)}
      >
        <Box sx={{ ...rowStyle }}>
          <Typography
            variant="body2"
            component="span"
            sx={{
              width: "100%",
              textAlign: "center",
              boxShadow:"none",
            }}
          >
            EMPTY
          </Typography>
        </Box>
      </Box>
    ) : (
      <Box
        component="button"
        onClick={() =>
          navigate(`/myPlayer/${player.id}`, { state: { player: player } })
        }
        sx={{
          ...outerCardStyle(isDragging),
          backgroundColor: "#1b1f26 !important", 
          boxShadow:"none",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2a2e35 !important",
          },
        }}
      >
        <Box
          ref={(node: HTMLDivElement | null) => dragRef(dropRef(node))}
          sx={rowStyle}
        >
          {/* <Box sx={rowStyle}> */}
          <Typography variant="body2" component="span" sx={posStyle(posColor)}>
            {player.pos}
          </Typography>

          <Box sx={nameBoxStyle}>
            <Typography component="span" sx={firstNameStyle}>
              {firstName}
            </Typography>
            <Typography component="span" sx={lastNameStyle}>
              {lastName}
            </Typography>
          </Box>

          <Typography variant="body2" component="span" sx={ovrStyle}>
            {getStatDisplay(player.ovr)}
          </Typography>
          {/* </Box> */}
        </Box>
      </Box>
    );
  }
};

export default DraggableAndDroppablePlayerCard;
