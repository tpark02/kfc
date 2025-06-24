import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Team } from "../types/team";
import { TeamPage } from "../types/teamPage";
import axiosInstance from "../app/axiosInstance";

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
    axiosInstance
      .get<TeamPage>("/teams")
      .then((response) => {
        setTeams(response.data.content);
      })
      .catch((err) => console.error(err));
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredTeams.map((team) => (
        <Box
          className="filter-box"
          key={team.id}
          display="flex"
          alignItems="center"
          mb={1}
          style={{ cursor: "pointer" }}
          onClick={() => {
            const alreadySelected = prevList.some((c) => c.name === team.name);
            if (alreadySelected) return;

            const newList = [...prevList, team];
            onSelectTeam(newList);
          }}
        >
          <img
            src={team.url !== "" ? team.url : "/img/fallback.png"}
            alt={team.name}
            style={{
              width: "8%",
              height: "8%",
              marginRight: 8,
              backgroundColor: "white",
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/img/fallback.png";
            }}
          />
          <Typography variant="body2">{team.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TeamModal;
