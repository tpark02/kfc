import "./App.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Player } from "./types/Player";
import { PlayerPage } from "./types/PlayerPage";

function App() {
  //const [reopdata, setReopdata] = useState<Player[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);
  const [pageInfo, setPageInfo] = useState<Omit<PlayerPage, "content">>({
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 5,
  });

  // useEffect(() => {
  //   axios
  //     .get<Player[]>(`http://localhost:8080/api/playerpage`)
  //     .then((response) => setReopdata(response.data))
  //     .catch((err) => console.error(err));
  // });
  // useEffect(() => {
  //   axios
  //     .get<PlayerPage>("http://localhost:8080/api/playerpage?page=1&size=5")
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
  // }, []);
  useEffect(() => {
    fetchPage(0); // 초기 로딩 시 첫 페이지 가져오기
  }, []);

  const fetchPage = (page: number) => {
    console.log("보내는 page 값:", page);

    axios
      .get<PlayerPage>(
        `http://localhost:8080/api/playerpage?page=${page}&size=${pageInfo.size}`
      )
      .then((response) => {
        console.log("서버 응답 page:", response.data.number);
        console.log(
          "응답 데이터:",
          response.data.content.map((p) => p.name)
        );
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

  return (
    <>
      <table>
        <tbody>
          {players.map((repo) => (
            <React.Fragment key={repo.id}>
              {/* 1행: 이미지 + 이름 + PAC/SHO/PAS */}
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
              {/* 2행: 포지션 + DRI/DEF/PHY */}
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
      {/* ✅ 여기에 버튼 배치 */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        {Array.from({ length: pageInfo.totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => fetchPage(index)}
            style={{ margin: "0 4px", padding: "4px 8px" }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
