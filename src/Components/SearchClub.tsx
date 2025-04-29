import React, { useState, useEffect } from "react";
import axios from "axios";
import { Team } from "../types/Team";
import { TeamPage } from "../types/TeamPage";
import { Autocomplete, TextField, Box, InputAdornment } from "@mui/material";
import "../Squad.css";

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

  useEffect(() => {
    if (open && teams.length === 0) {
      setLoading(true);
      axios
        .get<TeamPage>("http://localhost:8080/api/teams")
        .then((response) => {
          setTeams(response.data.content);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  return (
    <Autocomplete
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
          <Box
            component="li"
            key={option.id} // 🔥 key를 명시적으로 따로 지정
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              outline: 1,
              outlineColor: "red",
            }}
            {...rest} // 나머지 props만 spread
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
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Club"
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
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />
      )}
      sx={{
        backgroundColor: "#242424",
        color: "#fff",
      }}
    />
  );
};

export default SearchClub;
