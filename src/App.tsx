import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Player } from "./types/Player";
import { PlayerPage } from "./types/PlayerPage";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pageInfo, setPageInfo] = useState<Omit<PlayerPage, "content">>({
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 5,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPage(0, searchTerm); // 초기 첫 페이지
  }, []);

  const fetchPage = (page: number, search: string = "") => {
    axios
      .get<PlayerPage>(
        `http://localhost:8080/api/player?page=${page}&size=${pageInfo.size}&search=${search}`
      )
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
    fetchPage(0, searchTerm); // 검색은 항상 0페이지부터
  };

  return (
    <>
      {/* 🔍 Search UI */}
      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <input
          type="text"
          placeholder="이름으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px", fontSize: "14px", width: "200px" }}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: "8px", padding: "6px 12px" }}
        >
          검색
        </button>
      </div>

      {/* 🧾 Player Table */}
      <table>
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
                <td className="player-name">{repo.name}</td>
                <td>{repo.pac}</td>
                <td>{repo.sho}</td>
                <td>{repo.pas}</td>
              </tr>
              <tr>
                <td className="player-pos">{repo.pos}</td>
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
            onClick={() => fetchPage(index, searchTerm)}
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
