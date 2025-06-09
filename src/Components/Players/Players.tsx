import { useState, useEffect, useCallback } from "react";

import { Player } from "../../types/player";
import { Team } from "../../types/team";
import { PlayerPos } from "../../types/playerPosition";
import { Country } from "../../types/country";
import { ResponsePlayerPage } from "../../types/response";
import { League } from "../../types/league";
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";

import PlayerList from "./PlayerList";
import Filters from "./Filter";
import FilterModal from "../../modal/filterModal";
import { fetchPlayers } from "../../api/playerApi"; // 👈 새 유틸 추가

export const Players: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<PlayerPos[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<League[]>([]);

  const [pageInfo, setPageInfo] = useState<Omit<ResponsePlayerPage, "content">>(
    {
      totalPages: 0,
      totalElements: 0,
      number: 0,
      size: 20,
    }
  );

  const { myUserId, setMyUserId } = useSquadStore(
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
    fetchPage(0, searchTerm, "OVR_DESC"); // 초기 첫 페이지
  }, []);

  useEffect(() => {
    setMyUserId(1); // 임시 user id
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
        setPlayers(data.content);
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
            <button onClick={handleSearch} style={{ padding: "6px 12px" }}>
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

            let start = Math.max(0, currentPage - Math.floor(maxButtons / 2));
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
                      fontWeight: page === currentPage ? "bold" : "normal",
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
  );
};
