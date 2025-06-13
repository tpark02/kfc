import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

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

interface Props {
  player: MyPlayer;
  index: number;
  onSwap: (sourceIndex: number, targetIndex: number) => void;
}

const DraggableAndDroppablePlayerCard: React.FC<Props> = ({
  player,
  index,
  onSwap,
}) => {
  // 👇 indexRef 추가
  const indexRef = useRef(index);
  indexRef.current = index;
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "PLAYER",
    item: () => ({ index: indexRef.current }), // ✅ 항상 최신 index 제공
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

  // if (!player || player.name === "dummy") return null;
  const posColor = getPosColor(player.pos);
  const [firstName, lastName] = player.name.split(" ");

  return player.name === "dummy" ? (
    <Box
      ref={(node: HTMLDivElement | null) => dragRef(dropRef(node))}
      sx={outerCardStyle(isDragging)}
    >
      <Box sx={{ ...rowStyle }}>
        <Typography
          variant="body2"
          component="span"
          sx={{
            width: "100%",
          }}
        >
          EMPTY
        </Typography>

        {/* <Box sx={nameBoxStyle}>
          <Typography component="span" sx={firstNameStyle}>
            {firstName}
          </Typography>
          <Typography component="span" sx={lastNameStyle}>
            {lastName}
          </Typography>
        </Box>

        <Typography variant="body2" component="span" sx={ovrStyle}>
          {getStatDisplay("", player.ovr)}
        </Typography> */}
      </Box>
    </Box>
  ) : (
    <Box
      ref={(node: HTMLDivElement | null) => dragRef(dropRef(node))}
      sx={outerCardStyle(isDragging)}
    >
      <Box sx={rowStyle}>
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
          {getStatDisplay("", player.ovr)}
        </Typography>
      </Box>
    </Box>
  );
};

export default DraggableAndDroppablePlayerCard;
