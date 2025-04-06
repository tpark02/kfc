import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Player } from "./types/Player";
import { PlayerPage } from "./types/PlayerPage";
import FilterModal from "./Modal/FilterModal";
import { Button } from "@mui/material";
import { CountryList } from "./types/Country";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<CountryList>([]);
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

  useEffect(() => {
    fetchPage(0, searchTerm, "AGE_DESC"); // 초기 첫 페이지
  }, []);

  const getCurrentFilters = () =>
    selectedCountries.map((c) => ({
      name: c.country.name,
      code: c.country.code,
    }));
  // const fetchPage = (page: number, search: string = "") => {
  //   axios
  //     .get<PlayerPage>(
  //       `http://localhost:8080/api/player?page=${page}&size=${pageInfo.size}&search=${search}`
  //     )
  //     .then((response) => {
  //       setPlayers(response.data.content);
  //       setPageInfo({
  //         totalPages: response.data.totalPages,
  //         totalElements: response.data.totalElements,
  //         number: response.data.number,
  //         size: response.data.size,
  //       });
  //     })
  //     .catch((err) => console.error(err));
  // };

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
    filters: { name: string; code: string }[] = []
  ) => {
    axios
      .post<PlayerPage>("http://localhost:8080/api/player", {
        page,
        size: pageInfo.size || 10,
        search,
        sortType: sort,
        filters,
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
    console.log("sortType : " + sortType);

    // const filters = selectedCountries.map((c) => ({
    //   name: c.country.name,
    //   code: c.country.code,
    // }));

    fetchPage(0, searchTerm, sortType, getCurrentFilters());
  };

  return (
    <>
      {/* 🔍 Search UI */}
      {/* 🔍 Search + Sort 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          margin: "16px auto",
        }}
      >
        {/* 왼쪽: 검색창 + 버튼 */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* 오른쪽: 정렬 드롭다운 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* <label htmlFor="sortType">정렬:</label> */}
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
                // const filters = selectedCountries.map((c) => ({
                //   name: c.country.name,
                //   code: c.country.code,
                // }));

                fetchPage(0, searchTerm, newSort, getCurrentFilters());
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
          </div>
          {/* 모달 버튼 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0px",
            }}
          >
            <button onClick={() => setModalOpen(true)}>Filter</button>
            <FilterModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onSelectCountry={(newCountryList) => {
                setSelectedCountries(newCountryList);
                const filters =
                  newCountryList.length > 0
                    ? newCountryList.map((country) => ({
                        name: country.country.name,
                        code: country.country.code,
                      }))
                    : [];
                fetchPage(0, searchTerm, sortType, filters);
              }}
              prevList={selectedCountries}
            />
          </div>
        </div>
      </div>
      {selectedCountries.length > 0 && (
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "16px",
          }}
        >
          {selectedCountries.map((country) => (
            <Button
              key={country.country.code}
              variant="contained"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              onClick={() => {
                const newList = selectedCountries.filter(
                  (c) => c.country.code !== country.country.code
                );
                const filters =
                  newList.length > 0
                    ? newList.map((country) => ({
                        name: country.country.name,
                        code: country.country.code,
                      }))
                    : [];
                fetchPage(0, searchTerm, sortType, filters);
                setSelectedCountries(newList);
              }}
            >
              {country.country.name}
              <img
                src={`https://flagcdn.com/w40/${country.country.code}.png`}
                alt={country.country.name}
                style={{ width: 25, height: 20 }}
              />
              <CloseIcon fontSize="small" />
            </Button>
          ))}
        </div>
      )}

      {/* 🧾 Player Table */}
      <table style={{ width: "90%", margin: "0 auto" }}>
        <tbody>
          {players.map((repo) => (
            <React.Fragment key={repo.id}>
              <tr>
                <td rowSpan={2}>
                  <img
                    src={repo.img}
                    alt={repo.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td className="player-name" rowSpan={2}>
                  {repo.name}
                </td>
                <td className="player-pos" rowSpan={2}>
                  {" "}
                  {repo.pos}{" "}
                </td>
                <td>{repo.age}</td>
                <td rowSpan={2}>{repo.ovr}</td>
                <td>{repo.pac}</td>
                <td>{repo.sho}</td>
                <td>{repo.pas}</td>
              </tr>
              <tr>
                <td>{repo.height}</td>
                <td>{repo.dri}</td>
                <td>{repo.def}</td>
                <td>{repo.phy}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* 📄 Pagination */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        {Array.from({ length: pageInfo.totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() =>
              fetchPage(index, searchTerm, sortType, getCurrentFilters())
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
    </>
  );
}

export default App;
