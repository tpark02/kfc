import { useState, useEffect, useCallback } from "react";

import { Player } from "../../types/player";
import { Team } from "../../types/team";
import { PlayerPos } from "../types/playerPos";
import { Country } from "../../types/country";
import { ResponsePlayerPage } from "../../types/response";
import { League } from "../../types/league";
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";

import PlayerList from "./PlayerList";
import Filters from "./Filter";
import FilterModal from "../../modal/filterModal";
import { fetchPlayers } from "../../api/playerApi";
import { Box, Button, Select, TextField, MenuItem } from "@mui/material";
import "../../style/Player.css";

export const Players: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<PlayerPos[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<League[]>([]);

  const [pageInfo, setPageInfo] = useState<
    Omit<ResponsePlayerPage, "playerList">
  >({
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 20,
  });

  const { myUserId } = useSquadStore(
    (s) => ({ myUserId: s.myUserId, setMyUserId: s.setMyUserId }),
    shallow
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<
    "OVR_DESC" | "OVR_ASC" | "RANK_DESC" | "RANK_ASC" | "AGE_ASC" | "AGE_DESC"
  >("OVR_DESC");

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    fetchPage(0, searchTerm, "OVR_DESC");
  }, []);

  useEffect(() => {
    console.log("setting user id:", myUserId);
  }, []);

  const fetchPage = (
    page: number,
    searchTerm: string,
    sortType: string,
    selectedCountries: Country[] = [],
    selectedTeams: Team[] = [],
    selectedLeagues: League[] = [],
    selectedPosition: PlayerPos[] = []
  ) => {
    fetchPlayers({
      page,
      size: pageInfo.size || 10,
      search: searchTerm,
      sortType,
      countryFilter: selectedCountries,
      teamFilter: selectedTeams,
      leagueFilter: selectedLeagues,
      playerPositionFilter: selectedPosition,
    })
      .then((data) => {
        setPlayers(data.playerList);
        setPageInfo({
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          number: data.number,
          size: data.size,
        });
      })
      .catch((err) => {
        console.error("❌ 플레이어 불러오기 실패:", err);
      });
  };

  const handleSearch = () => {
    fetchPage(
      0,
      searchTerm,
      sortType,
      selectedCountries,
      selectedTeams,
      selectedLeagues,
      selectedPosition
    );
  };

  return (
    <Box className="player-list">
      <Box className="search-bar">
        <TextField
          type="text"
          placeholder="name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            height: "38px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& input": {
              padding: "0 14px",
            },
          }}
        />
        <Button onClick={handleSearch} variant="contained">
          Search
        </Button>
        <Select
          id="sortType"
          value={sortType}
          onChange={(e) => {
            const newSort = e.target.value as
              | "OVR_DESC"
              | "OVR_ASC"
              | "RANK_DESC"
              | "RANK_ASC";
            setSortType(newSort);
            fetchPage(
              0,
              searchTerm,
              newSort,
              selectedCountries,
              selectedTeams,
              selectedLeagues,
              selectedPosition
            );
          }}
          sx={{
            height: "38px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& input": {
              padding: "0 14px",
            },
          }}
        >
          <MenuItem value="OVR_DESC">ovr desc</MenuItem>
          <MenuItem value="OVR_ASC">ovr asc</MenuItem>
          <MenuItem value="RANK_DESC">rank desc</MenuItem>
          <MenuItem value="RANK_ASC">rank asc</MenuItem>
        </Select>

        <Button onClick={() => setModalOpen(true)} variant="contained">
          Filter
        </Button>
      </Box>

      <FilterModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSelectCountry={(newCountryList) => {
          setSelectedCountries(newCountryList);
          fetchPage(
            0,
            searchTerm,
            sortType,
            newCountryList,
            selectedTeams,
            selectedLeagues,
            selectedPosition
          );
        }}
        onSelectTeam={(newTeamList) => {
          console.log("TeamList: ", newTeamList);
          setSelectedTeams(newTeamList);
          fetchPage(
            0,
            searchTerm,
            sortType,
            selectedCountries,
            newTeamList,
            selectedLeagues,
            selectedPosition
          );
        }}
        onSelectLeague={(newLeagueList) => {
          setSelectedLeagues(newLeagueList);
          fetchPage(
            0,
            searchTerm,
            sortType,
            selectedCountries,
            selectedTeams,
            newLeagueList,
            selectedPosition
          );
        }}
        onSelectPlayerPos={(newPositionList) => {
          setSelectedPosition(newPositionList);
          fetchPage(
            0,
            searchTerm,
            sortType,
            selectedCountries,
            selectedTeams,
            selectedLeagues,
            newPositionList
          );
        }}
        prevList={selectedCountries}
        prevTeamList={selectedTeams}
        prevLeagueList={selectedLeagues}
        prevplayerPositionList={selectedPosition}
      />

      <Filters
        selectedCountries={selectedCountries}
        selectedTeams={selectedTeams}
        selectedLeagues={selectedLeagues}
        selectedPosition={selectedPosition}
        fetchPage={fetchPage}
        searchTerm={searchTerm}
        sortType={sortType}
        setSelectedCountries={setSelectedCountries}
        setSelectedTeams={setSelectedTeams}
        setSelectedLeagues={setSelectedLeagues}
        setSelectedPosition={setSelectedPosition}
      />
      <PlayerList players={players} />

      <Box style={{ marginTop: "16px", textAlign: "center" }}>
        {(() => {
          const maxButtons = 10;
          const currentPage = pageInfo.number;
          const totalPages = pageInfo.totalPages;

          let start = Math.max(0, currentPage - Math.floor(maxButtons / 2));
          const end = Math.min(totalPages, start + maxButtons);

          if (end - start < maxButtons) {
            start = Math.max(0, end - maxButtons);
          }

          const visiblePages = Array.from(
            { length: end - start },
            (_, i) => i + start
          );

          return (
            <>
              {currentPage > 0 && (
                <Button
                  onClick={() =>
                    fetchPage(
                      currentPage - 1,
                      searchTerm,
                      sortType,
                      selectedCountries,
                      selectedTeams,
                      selectedLeagues,
                      selectedPosition
                    )
                  }
                  style={{ margin: "0 4px", padding: "4px 8px" }}
                >
                  ◀
                </Button>
              )}

              {visiblePages.map((page) => (
                <Button
                  key={page}
                  onClick={() =>
                    fetchPage(
                      page,
                      searchTerm,
                      sortType,
                      selectedCountries,
                      selectedTeams,
                      selectedLeagues,
                      selectedPosition
                    )
                  }
                  style={{
                    margin: "0 4px",
                    padding: "4px 8px",
                    fontWeight: page === currentPage ? "bold" : "normal",
                  }}
                >
                  {page + 1}
                </Button>
              ))}

              {currentPage < totalPages - 1 && (
                <Button
                  onClick={() =>
                    fetchPage(
                      currentPage + 1,
                      searchTerm,
                      sortType,
                      selectedCountries,
                      selectedTeams,
                      selectedLeagues,
                      selectedPosition
                    )
                  }
                  style={{ margin: "0 4px", padding: "4px 8px" }}
                >
                  ▶
                </Button>
              )}
            </>
          );
        })()}
      </Box>
    </Box>
  );
};
