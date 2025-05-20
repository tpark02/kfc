import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  Box,
  InputAdornment,
  Card,
} from "@mui/material";
import { League } from "../../types/League";
import { LeaguePage } from "../../types/LeaguePage"; // 필요하면 타입 만들어
import Popper from "@mui/material/Popper";
import "../../style/Squad.css";

interface SearchLeagueProp {
  setSelectedLeague: (league: League[] | null) => void;
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
  const CustomPopper = (props: any) => (
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
    if (open && leagues.length === 0) {
      setLoading(true);
      axios
        .get<LeaguePage>("http://localhost:8080/leagues")
        .then((response) => {
          setLeagues(response.data.content);
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
        options={leagues}
        loading={loading}
        value={selectedLeague}
        onChange={(_, newValue) => {
          if (!newValue) return;
          const alreadySelected = prevList.some((p) => p.id === newValue.id);
          if (alreadySelected) return;
          setSelectedLeague([...prevList, newValue]);
          setSelectedLeagueInternal(null);
        }}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => {
          const { key, ...rest } = props;

          return (
            <li
              key={key}
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
                component="div"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
            placeholder="Select League"
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
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
                "& svg": { color: "white" },
              },
            }}
          />
        )}
        sx={{ backgroundColor: "#242424", color: "#fff" }}
      />
    </Card>
  );
};

export default SearchLeague;
