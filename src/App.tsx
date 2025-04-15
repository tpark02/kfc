import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// 스타일
import "./App.css";

// 모달
import FilterModal from "./Modal/FilterModal";

// 타입
import { Player } from "./types/Player";
import { PlayerPage } from "./types/PlayerPage";
import { Country } from "./types/Country";
import { Team } from "./types/Team";
import { PlayerPos } from "./types/PlayerPosition";
import { League } from "./types/League";

import PlayerList from "./Components/PlayerList";
import Filters from "./Components/Filter";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<PlayerPos[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<League[]>([]);

  const [pageInfo, setPageInfo] = useState<Omit<PlayerPage, "content">>({
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 100,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<
    "AGE_ASC" | "AGE_DESC" | "RANK_DESC" | "RANK_ASC" | "OVR_DESC" | "OVR_ASC"
  >("AGE_DESC");

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    fetchPage(0, searchTerm, "AGE_DESC"); // 초기 첫 페이지
  }, []);

  const fetchPage = (
    page: number,
    search: string = "",
    sort:
      | "AGE_ASC"
      | "AGE_DESC"
      | "RANK_DESC"
      | "RANK_ASC"
      | "OVR_DESC"
      | "OVR_ASC" = sortType,
    countryFilter: { name: string; code: string }[] = [],
    teamFilter: { id: number; name: string }[] = [],
    leagueFilter: { id: number; name: string }[] = [],
    playerPositionFilter: { name: string; code: string }[] = []
  ) => {
    axios
      .post<PlayerPage>("http://localhost:8080/api/player", {
        page,
        size: pageInfo.size || 10,
        search,
        sortType: sort,
        countryFilter,
        teamFilter,
        leagueFilter,
        playerPositionFilter,
      })
      .then((response) => {
        setPlayers(response.data.content);
        setPageInfo({
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          number: response.data.number,
          size: response.data.size,
        });
      })
      .catch((err) => console.error(err));
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
    <>
      <div className="app-container">
        <div className="card-wrapper">
          <div className="search-bar">
            <div className="left-group">
              <input
                type="text"
                placeholder="name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "6px", fontSize: "14px", width: "200px" }}
              />
              <button onClick={handleSearch} style={{ padding: "6px 12px" }}>
                search
              </button>
            </div>

            <div className="right-group">
              <select
                id="sortType"
                value={sortType}
                onChange={(e) => {
                  const newSort = e.target.value as
                    | "AGE_ASC"
                    | "AGE_DESC"
                    | "RANK_DESC"
                    | "RANK_ASC"
                    | "OVR_DESC"
                    | "OVR_ASC";
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
                style={{ padding: "6px", fontSize: "14px" }}
              >
                <option value="AGE_DESC">age desc</option>
                <option value="AGE_ASC">age asc</option>
                <option value="RANK_DESC">rank desc</option>
                <option value="RANK_ASC">rank asc</option>
                <option value="OVR_DESC">ovr desc</option>
                <option value="OVR_ASC">ovr asc</option>
              </select>

              <button onClick={() => setModalOpen(true)}>Filter</button>
            </div>
          </div>

          <FilterModal
            isOpen={isModalOpen}
            onClose={() => {
              handleClose();
            }}
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

          {/* 🧾 Filter  */}
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

          {/* 🧾 Player Table */}
          <PlayerList players={players} />

          {/* 📄 Pagination */}
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            {Array.from({ length: pageInfo.totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  fetchPage(
                    index,
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
                  fontWeight: index === pageInfo.number ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
