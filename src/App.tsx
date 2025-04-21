import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// 스타일
import "./App.css";
import "./Player.css";

// 모달
import FilterModal from "./modal/FilterModal";

// 타입
import { Player } from "./types/Player";
import { PlayerPage } from "./types/PlayerPage";
import { Country } from "./types/Country";
import { Team } from "./types/Team";
import { PlayerPos } from "./types/PlayerPosition";
import { League } from "./types/League";

import PlayerList from "./components/PlayerList";
import PlayerSpec from "./components/PlayerSpec";
import Filters from "./components/Filter";
import Squad from "./components/Squad"; // 💡 make sure the path is correct
import NavBar from "./components/NavBar"; // 💡 make sure the path is correct

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
    size: 20,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<
    "OVR_DESC" | "OVR_ASC" | "RANK_DESC" | "RANK_ASC" | "AGE_ASC" | "AGE_DESC"
  >("OVR_DESC");

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    fetchPage(0, searchTerm, "OVR_DESC"); // 초기 첫 페이지
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
    axios
      .post<PlayerPage>("http://localhost:8080/api/players", {
        page,
        size: pageInfo.size || 10,
        search: searchTerm,
        sortType: sortType,
        countryFilter: selectedCountries,
        teamFilter: selectedTeams,
        leagueFilter: selectedLeagues,
        playerPositionFilter: selectedPosition,
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
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="app-container">
                {/* <div className="card-wrapper"> */}
                <div className="player-list">
                  <div className="search-bar">
                    <div className="left-group">
                      <input
                        type="text"
                        placeholder="name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          padding: "6px",
                          fontSize: "14px",
                          width: "200px",
                        }}
                      />
                      <button
                        onClick={handleSearch}
                        style={{ padding: "6px 12px" }}
                      >
                        Search
                      </button>
                    </div>

                    <div className="right-group">
                      <select
                        id="sortType"
                        value={sortType}
                        onChange={(e) => {
                          const newSort = e.target.value as
                            | "OVR_DESC"
                            | "OVR_ASC"
                            | "RANK_DESC"
                            | "RANK_ASC"
                            | "AGE_ASC"
                            | "AGE_DESC";
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
                        <option value="OVR_DESC">ovr desc</option>
                        <option value="OVR_ASC">ovr asc</option>
                        <option value="RANK_DESC">rank desc</option>
                        <option value="RANK_ASC">rank asc</option>
                        <option value="AGE_DESC">age desc</option>
                        <option value="AGE_ASC">age asc</option>
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
                    {(() => {
                      const maxButtons = 10;
                      const currentPage = pageInfo.number;
                      const totalPages = pageInfo.totalPages;

                      let start = Math.max(
                        0,
                        currentPage - Math.floor(maxButtons / 2)
                      );
                      const end = Math.min(totalPages, start + maxButtons);

                      // 마지막에 걸칠 때 start 보정
                      if (end - start < maxButtons) {
                        start = Math.max(0, end - maxButtons);
                      }

                      const visiblePages = Array.from(
                        { length: end - start },
                        (_, i) => i + start
                      );

                      return (
                        <>
                          {/* ◀ 이전 버튼 */}
                          {currentPage > 0 && (
                            <button
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
                            </button>
                          )}

                          {/* 페이지 번호 버튼 */}
                          {visiblePages.map((page) => (
                            <button
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
                                fontWeight:
                                  page === currentPage ? "bold" : "normal",
                              }}
                            >
                              {page + 1}
                            </button>
                          ))}

                          {/* ▶ 다음 버튼 */}
                          {currentPage < totalPages - 1 && (
                            <button
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
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/player/:id"
            element={<PlayerSpec />} // Example: Pass the first player as a prop
          />
          <Route path="/squad" element={<Squad />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
