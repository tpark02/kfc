import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Box, InputAdornment } from "@mui/material";
import { League } from "../types/League";
import { LeaguePage } from "../types/LeaguePage"; // 필요하면 타입 만들어
import "../Squad.css";

interface SearchLeagueProp {
  setSelectedLeague: (league: League[]) => void;
  prevList: League[];
}

const SearchLeague: React.FC<SearchLeagueProp> = ({
  setSelectedLeague,
  prevList,
}) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLeague, setSelectedLeagueInternal] = useState<League | null>(
    null
  );

  useEffect(() => {
    if (open && leagues.length === 0) {
      setLoading(true);
      axios
        .get<LeaguePage>("http://localhost:8080/api/leagues")
        .then((response) => {
          setLeagues(response.data.content);
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
      options={leagues}
      loading={loading}
      value={selectedLeague}
      onChange={(_, newValue) => {
        if (!newValue) return;
        const alreadySelected = prevList.some((p) => p.id === newValue.id);
        if (alreadySelected) return;
        setSelectedLeague([...prevList, newValue]);
        setSelectedLeagueInternal(newValue);
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            key={option.id}
            component="li"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            {...rest}
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
          label="Select League"
          variant="outlined"
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment:
              selectedLeague && selectedLeague.id ? (
                <InputAdornment position="start">
                  <img
                    src={selectedLeague.url}
                    alt={selectedLeague.name}
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
      sx={{ backgroundColor: "#242424", color: "#fff" }}
    />
  );
};

export default SearchLeague;
