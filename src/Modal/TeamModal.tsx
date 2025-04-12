import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Team } from "../types/Team";
import { TeamPage } from "../types/TeamPage";
import axios from "axios";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (teams: Team[]) => void;
  prevList: Team[];
}

const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  onSelectTeam,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);

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
      .get<TeamPage>("http://localhost:8080/api/teams", {})
      .then((response) => {
        console.log(response.data.content);
        setTeams(response.data.content);
      })
      .catch((err) => console.error(err));
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* ✅ 필터링된 팀 리스트 */}
        {filteredTeams.map((team) => (
          <Box
            key={team.id}
            display="flex"
            alignItems="center"
            mb={1}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const alreadySelected = prevList.some(
                (c) => c.name === team.name
              );
              if (alreadySelected) return;

              const newList = [...prevList, team];
              onSelectTeam(newList);
            }}
          >
            <img
              src={team.url !== "" ? team.url : "../../img/fallback.png"}
              alt={team.name}
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

            <Typography variant="body2">{team.name}</Typography>
          </Box>
        ))}

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

export default TeamModal;
