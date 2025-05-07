import "./Modal.css";
import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { playerPosData } from "../data/playerPosData";
import { PlayerPos } from "../types/PlayerPosition";

interface PlayerPosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayerPos: (playerPositions: PlayerPos[]) => void; // 배열 전달
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
      {/* ✅ 검색 입력창 */}
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
            color: "white", // ✅ 입력 텍스트 색
            "& input::placeholder": {
              color: "gray", // ✅ placeholder 색
              opacity: 1, // ✅ 일부 브라우저에서 회색 제대로 보이게
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
        {/* ✅ 필터링된 포지션 리스트 */}
        {filteredPositions.map((playerPos) => (
          <Box
            className="filter-box"
            key={playerPos.code}
            display="flex"
            alignItems="center"
            mb={1}
            style={{ cursor: "pointer" }}
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
        ))}
      </Box>
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
        sx={{ marginLeft: 1 }}
      >
        close
      </Button> */}
    </Box>
  );
};

export default PlayerPosModal;
