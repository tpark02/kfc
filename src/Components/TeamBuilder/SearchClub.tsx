import React, { useState, useEffect } from "react";
import axios from "axios";
import { Team } from "../../types/Team";
import { TeamPage } from "../../types/TeamPage";
import {
  Autocomplete,
  TextField,
  Box,
  InputAdornment,
  Card,
} from "@mui/material";
import Popper, { PopperProps } from "@mui/material/Popper";
import "../../style/Squad.css";

interface SearchClubProp {
  setSearchTermClub: (term: string) => void;
  setClub: (teams: Team[]) => void;
  prevList: Team[];
}

const SearchClub: React.FC<SearchClubProp> = ({ setClub, prevList }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const CustomPopper = (props: PopperProps) => (
    <Popper
      {...props}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
      ]}
      sx={{
        "& .MuiAutocomplete-paper": {
          backgroundColor: "#242424",
          color: "white",
          boxShadow: "none",
          border: "1px solid #444",
        },
      }}
    />
  );

  useEffect(() => {
    if (open && teams.length === 0) {
      setLoading(true);
      axios
        .get<TeamPage>("http://localhost:8080/teams")
        .then((response) => {
          setTeams(response.data.content);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  return (
    <Card sx={{ margin: "10px" }}>
      <Autocomplete
        PopperComponent={CustomPopper}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={teams}
        loading={loading}
        value={selectedTeam}
        onChange={(_, newValue) => {
          if (!newValue) return;

          const alreadySelected = prevList.some((p) => p.id === newValue.id);
          if (alreadySelected) {
            return;
          }

          setClub([
            ...prevList,
            { id: newValue.id, name: newValue.name, url: newValue.url },
          ]);
          setSelectedTeam(null);
        }}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => {
          const { key, ...rest } = props;

          return (
            <li
              key={option.id} // 🔥 key를 명시적으로 전달
              {...rest}
              style={{
                backgroundColor: "#242424",
                color: "white",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#242424";
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <img
                  src={option.url || "../../img/fallback.png"}
                  alt={option.name}
                  style={{
                    width: 20,
                    height: 15,
                    objectFit: "cover",
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "../../img/fallback.png";
                  }}
                />
                {option.name}
              </Box>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select Club"
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment:
                selectedTeam && selectedTeam.id ? (
                  <InputAdornment position="start">
                    <img
                      src={selectedTeam.url}
                      alt={selectedTeam.name}
                      style={{
                        width: 20,
                        height: 15,
                        objectFit: "cover",
                        borderRadius: 2,
                        backgroundColor: "white",
                        marginRight: 5,
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "../../img/fallback.png";
                      }}
                    />
                  </InputAdornment>
                ) : null,
            }}
            sx={{
              backgroundColor: "#242424",
              input: { color: "#fff" },

              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
                "& svg": { color: "white" },
              },
            }}
          />
        )}
        sx={{
          backgroundColor: "#242424",
          color: "#fff",
        }}
      />
    </Card>
  );
};

export default SearchClub;
