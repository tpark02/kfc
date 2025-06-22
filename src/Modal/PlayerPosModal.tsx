import "./Modal.css";
import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { playerPosData } from "../data/playerPosData";
import { PlayerPos } from "../types/playerPos";
import { getPosColor } from "../util/util";

interface PlayerPosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayerPos: (playerPositions: PlayerPos[]) => void;
  prevList: PlayerPos[];
}

const PlayerPosModal: React.FC<PlayerPosModalProps> = ({
  isOpen,
  onSelectPlayerPos,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredPositions = playerPosData.filter((d) =>
    d.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& input::placeholder": {
              color: "gray",
              opacity: 1,
            },
            "& fieldset": {
              borderColor: "gray",
            },
            "&:hover fieldset": {
              borderColor: "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray",
            },
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "auto",
          maxHeight: "auto",
        }}
      >
        {filteredPositions.map((playerPos) => {
          const posColor = getPosColor(playerPos.code);
          return (
            <Box
              className="filter-box"
              key={playerPos.code}
              display="flex"
              alignItems="center"
              mb={1}
              style={{ cursor: "pointer", color: posColor }}
              onClick={() => {
                const alreadySelected = prevList.some(
                  (c) => c.code === playerPos.code
                );
                if (alreadySelected) return;

                const newList = [...prevList, playerPos];
                onSelectPlayerPos(newList);
              }}
            >
              <Typography variant="body2">
                {playerPos.code.toUpperCase()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PlayerPosModal;
