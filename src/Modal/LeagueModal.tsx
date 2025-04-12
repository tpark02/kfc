import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { League } from "../types/League";
import { LeaguePage } from "../types/LeaguePage";
import axios from "axios";

interface LeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLeague: (leagues: League[]) => void;
  prevList: League[];
}

const LeagueModal: React.FC<LeagueModalProps> = ({
  isOpen,
  onClose,
  onSelectLeague,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leagues, setLeagues] = useState<League[]>([]);

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

  useEffect(() => {
    axios
      .get<LeaguePage>("http://localhost:8080/api/leagues", {})
      .then((response) => {
        console.log(response.data.content);
        setLeagues(response.data.content);
      })
      .catch((err) => console.error(err));
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* ✅ 리그 리스트 */}
        {filteredLeagues.map((league) => (
          <Box
            key={league.id}
            display="flex"
            alignItems="center"
            mb={1}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const alreadySelected = prevList.some(
                (c) => c.name === league.name
              );
              if (alreadySelected) return;

              const newList = [...prevList, league];
              onSelectLeague(newList);
            }}
          >
            <img
              src={league.url !== "" ? league.url : "../../img/fallback.png"}
              alt={league.name}
              style={{
                width: "8%",
                height: "8%",
                marginRight: 8,
                backgroundColor: "white", // ✅ add white background
              }}
              onError={(e) => {
                e.currentTarget.onerror = null; // 무한 루프 방지
                e.currentTarget.src = "../../img/fallback.png"; // 대체 이미지 경로
              }}
            />
            <Typography>{league.name}</Typography>
          </Box>
        ))}
        {/* ✅ 취소 버튼 */}
        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginTop: 16 }}
          fullWidth
        >
          close
        </Button>
      </div>
    </div>
  );
};

export default LeagueModal;
