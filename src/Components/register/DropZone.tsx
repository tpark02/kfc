// DropZone.tsx
import React from "react";
import { useDrop } from "react-dnd";
import { Box, Typography } from "@mui/material";
import { MyPlayer } from "../../types/player";

interface DropZoneProps {
  position: string;
  onDropPlayer: (player: MyPlayer, position: string) => void;
  currentPlayer?: MyPlayer | null;
}

const DropZone: React.FC<DropZoneProps> = ({ position, onDropPlayer, currentPlayer }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "PLAYER",
    drop: (item: { player: MyPlayer }) => {
      onDropPlayer(item.player, position);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Box
      ref={dropRef}
      sx={{
        width: 80,
        height: 100,
        border: "2px dashed #888",
        borderRadius: 2,
        backgroundColor: isOver && canDrop ? "#e0f7fa" : "#1e1e1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {currentPlayer ? (
        <Typography variant="body2" color="white" align="center">
          {currentPlayer.name}
        </Typography>
      ) : (
        <Typography variant="caption" color="gray">
          {position}
        </Typography>
      )}
    </Box>
  );
};

export default DropZone;