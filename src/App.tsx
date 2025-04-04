import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Player } from "./types/Player";
import { PlayerPage } from "./types/PlayerPage";
import FilterModal from "./Modal/FilterModal";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
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
      | "OVR_ASC" = sortType
  ) => {
    axios
      .get<PlayerPage>("http://localhost:8080/api/player", {
        params: {
          page,
          size: pageInfo.size,
          search,
          sortType: sort,
        },
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
    fetchPage(0, searchTerm, sortType); // 검색은 항상 0페이지부터
  };

  return (
    <>
      {/* 🔍 Search UI */}
      {/* 🔍 Search + Sort 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // 🔥 좌우 끝 정렬
          alignItems: "center",
          width: "90%",
          margin: "16px auto",
        }}
      >
        {/* 왼쪽: 검색창 + 버튼 */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            placeholder="이름으로 검색"
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
                fetchPage(0, searchTerm, newSort);
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
            />
          </div>
        </div>
      </div>
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
            onClick={() => fetchPage(index, searchTerm, sortType)}
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
