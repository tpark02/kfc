import "./Modal.css";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { playerPosData } from "../data/playerPosData";
import { PlayerPosList } from "../types/PlayerPosition";

interface PlayerPosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayerPos: (playerPositions: PlayerPosList) => void; // 배열 전달
  prevList: PlayerPosList;
}

const PlayerPosModal: React.FC<PlayerPosModalProps> = ({
  isOpen,
  onClose,
  onSelectPlayerPos,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPositions = playerPosData.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop secondary">
      <div className="modal-content small">
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
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {/* ✅ 필터링된 포지션 리스트 */}
          {filteredPositions.map((playerPos) => (
            <Box
              key={playerPos.code}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
              borderRadius={1}
              onClick={() => {
                const alreadySelected = prevList.some(
                  (c) => c.playerPos.code === playerPos.code
                );
                if (alreadySelected) return;

                const newList = [...prevList, { playerPos }];
                onSelectPlayerPos(newList);
              }}
            >
              <Typography variant="body2">
                {playerPos.code.toUpperCase()}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={onClose}
          sx={{ marginLeft: 1 }}
        >
          close
        </Button>
      </div>
    </div>
  );
};

export default PlayerPosModal;
