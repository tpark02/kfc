import React from "react";

import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Country } from "../types/Country";
import { Team } from "../types/Team";
import { PlayerPos } from "../types/PlayerPosition";
import { League } from "../types/League";

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
      {console.log(selectedCountries.map((c) => c.name))}
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
            width: "100%", // ✅ app-container 기준
            maxWidth: "100%", // ✅ 절대 넘치지 않게
            // marginLeft: 5,
            // marginBottom: 2,
          }}
        >
          {/* ✅ 국가 필터 */}
          {selectedCountries.map((country) => {
            console.log(country.name);
          })}
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
              />
              <CloseIcon fontSize="small" />
            </Button>
          ))}

          {/* ✅ 팀 필터 */}
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

          {/* ✅ 리그 필터 */}
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

          {/* ✅ 포지션 필터 */}
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
