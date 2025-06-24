import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { League } from "../types/league";
import { LeaguePage } from "../types/leaguePage";
import axiosInstance, { isAxiosError } from "../app/axiosInstance";

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
    axiosInstance
      .get<LeaguePage>("/leagues")
      .then((response) => {
        setLeagues(response.data.content);
      })
      .catch((err: unknown) => {
        if (isAxiosError(err)) {
          console.error("Axios error:", err.response?.data);
        } else {
          console.error("Unknown error:", err);
        }
      });
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
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

      {filteredLeagues.map((league) => (
        <Box
          className="filter-box"
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
            src={league.url !== "" ? league.url : "/img/fallback.png"}
            alt={league.name}
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
          <Typography>{league.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LeagueModal;
