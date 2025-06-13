import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

import { CardContent, Box, Typography } from "@mui/material";
import { MyPlayer } from "../../types/player";
import { playerCardStyle, playerRowStyle } from "../../style/playerCardStyles";
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

  if (!player || player.name === "dummy") return null;
  const posColor = getPosColor(player.pos);

  return (
    <CardContent
      ref={(node) => dragRef(dropRef(node))}
      sx={{
        ...playerCardStyle,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <Box sx={playerRowStyle}>
        <Typography variant="body2" sx={{ flex: "0 0 40px", color: posColor }}>
          {player.pos}
        </Typography>
        <Typography sx={{ flex: 1, fontWeight: 600, textAlign: "center" }}>
          {player.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ flex: "0 0 50px", textAlign: "center" }}
        >
          {getStatDisplay("", player.ovr)}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default DraggableAndDroppablePlayerCard;
