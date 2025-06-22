import React from "react";

import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Country } from "../../types/country";
import { Team } from "../../types/team";
import { PlayerPos } from "../../types/playerPosition";
import { League } from "../../types/league";

interface FilterProps {
  selectedCountries: Country[];
  selectedTeams: Team[];
  selectedPosition: PlayerPos[];
  selectedLeagues: League[];
  fetchPage: (
    page: number,
    searchTerm: string,
    sortType: string,
    selectedCountries: Country[],
    selectedTeams: Team[],
    selectedLeagues: League[],
    selectedPosition: PlayerPos[]
  ) => void;
  searchTerm: string;
  sortType: string;
  setSelectedCountries: (countries: Country[]) => void;
  setSelectedTeams: (teams: Team[]) => void;
  setSelectedLeagues: (leagues: League[]) => void;
  setSelectedPosition: (positions: PlayerPos[]) => void;
}

const Filters: React.FC<FilterProps> = ({
  selectedCountries,
  selectedTeams,
  selectedLeagues,
  selectedPosition,
  fetchPage,
  searchTerm,
  sortType,
  setSelectedCountries,
  setSelectedTeams,
  setSelectedLeagues,
  setSelectedPosition,
}) => {
  return (
    <>
      {(selectedCountries.length > 0 ||
        selectedTeams.length > 0 ||
        selectedLeagues.length > 0 ||
        selectedPosition.length > 0) && (
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{
            width: "100%", 
            maxWidth: "100%",
            margin: "10px",
          }}
        >
          {selectedCountries.map((country) => (
            <Button
              key={country.code}
              variant="contained"
              onClick={() => {
                const newList = selectedCountries.filter((c) => {
                  console.log(c.name);
                  return c.code !== country.code;
                });
                fetchPage(
                  0,
                  searchTerm,
                  sortType,
                  newList,
                  selectedTeams,
                  selectedLeagues,
                  selectedPosition
                );
                setSelectedCountries(newList);
              }}
            >
              {/* {country.name} */}
              <img
                src={`https://flagcdn.com/w40/${country.code}.png`}
                alt={country.name}
                style={{ width: 25, height: 20 }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "../../img/fallback.png";
                }}
              />
              <CloseIcon fontSize="small" />
            </Button>
          ))}

          {/* ✅ Team filter */}
          {selectedTeams.map((team) => (
            <Button
              key={team.id}
              variant="contained"
              onClick={() => {
                const newList = selectedTeams.filter((t) => t.id !== team.id);
                fetchPage(
                  0,
                  searchTerm,
                  sortType,
                  selectedCountries,
                  newList,
                  selectedLeagues,
                  selectedPosition
                );
                setSelectedTeams(newList);
              }}
            >
              {/* {team.name} */}
              <img
                src={`${team.url}`}
                alt={team.name}
                style={{ width: 25, height: 20 }}
              />
              <CloseIcon fontSize="small" />
            </Button>
          ))}

          {/* ✅ League filter */}
          {selectedLeagues.map((league) => (
            <Button
              key={league.id}
              variant="contained"
              onClick={() => {
                const newList = selectedLeagues.filter(
                  (l) => l.id !== league.id
                );
                fetchPage(
                  0,
                  searchTerm,
                  sortType,
                  selectedCountries,
                  selectedTeams,
                  newList,
                  selectedPosition
                );
                setSelectedLeagues(newList);
              }}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {/* {league.name} */}
              <img
                src={`${league.url}`}
                alt={league.name}
                style={{ width: 25, height: 20 }}
              />
              <CloseIcon fontSize="small" />
            </Button>
          ))}

          {/* ✅ Position filter */}
          {selectedPosition.map((position) => (
            <Button
              key={position.code}
              variant="contained"
              onClick={() => {
                const newList = selectedPosition.filter(
                  (p) => p.code !== position.code
                );
                fetchPage(
                  0,
                  searchTerm,
                  sortType,
                  selectedCountries,
                  selectedTeams,
                  selectedLeagues,
                  newList
                );
                setSelectedPosition(newList);
              }}
            >
              {position.code}
              <CloseIcon fontSize="small" />
            </Button>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Filters;
