import React, { useState, useEffect } from "react";
import axios from "axios";
import { Team } from "../types/Team";
import { TeamPage } from "../types/TeamPage";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import "../Squad.css";

interface SearchClubProp {
  setSearchTermClub: (term: string) => void;
  setClub: (teams: Team) => void;
}
const SearchClub: React.FC<SearchClubProp> = ({
  setSearchTermClub,
  setClub,
}) => {
  const [teams, recvTeams] = useState<Team[]>([]);
  const [selectedTeam, setClubValue] = useState<Team>();

  useEffect(() => {
    axios
      .get<TeamPage>("http://localhost:8080/api/teams", {})
      .then((response) => {
        //console.log(response.data.content);
        recvTeams(response.data.content);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel id="label">Club</InputLabel>
        <Select
          labelId="club-label"
          value={selectedTeam?.id ?? ""}
          onChange={(e) => {
            const t = teams.find((team) => {
              return team.id === Number(e.target.value);
            });

            if (t) {
              setClub(t);
              setClubValue(t);
            }
          }}
          label="Club"
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#242424",
                color: "#fff",
              },
            },
          }}
          sx={{
            backgroundColor: "#242424",
            color: "#fff",
            "& .MuiSelect-icon": {
              color: "#fff",
              borderLeft: "none",
            },
          }}
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              <Box display="flex" alignItems="center">
                <img
                  src={team.url || "../../img/fallback.png"}
                  alt={team.name}
                  style={{
                    width: 20,
                    height: 15,
                    marginRight: 8,
                    backgroundColor: "white",
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null; // 무한 루프 방지
                    e.currentTarget.src = "../../img/fallback.png"; // 대체 이미지 경로
                  }}
                />
                {team.name}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SearchClub;
