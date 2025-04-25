import { useState, useEffect } from "react";
import { League } from "../types/League";
import { LeaguePage } from "../types/LeaguePage";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import axios from "axios";

interface SearchLeagueProp {
  setSearchLeauge: (term: string) => void;
  setLeague: (league: League) => void;
}
const SearchLeague: React.FC<SearchLeagueProp> = ({
  setSearchLeauge,
  setLeague,
}) => {
  const [leagues, recvLeague] = useState<League[]>([]);
  const [selectedLeague, setLeagueValue] = useState<League>();

  useEffect(() => {
    axios
      .get<LeaguePage>("http://localhost:8080/api/leagues", {})
      .then((response) => {
        recvLeague(response.data.content);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="label">League</InputLabel>
      <Select
        labelId="league-label"
        value={selectedLeague?.id ?? ""}
        onChange={(e) => {
          const l = leagues.find((league) => {
            return league.id === Number(e.target.value);
          });

          if (l) {
            setLeague(l);
            setLeagueValue(l);
          }
        }}
        label="League"
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
        {leagues.map((league) => (
          <MenuItem key={league.id} value={league.id}>
            <Box display="flex" alignItems="center">
              <img
                src={league.url || "../../img/fallback.png"}
                alt={league.name}
                style={{
                  width: 20,
                  height: 15,
                  marginRight: 8,
                  backgroundColor: "white",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
              {league.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchLeague;
