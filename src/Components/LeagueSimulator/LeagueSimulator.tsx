import { useState } from "react";
// import simulateLeague from "../../Components/LeagueSimulator/SimulateLeague";
// import { useSquadStore } from "../../store/useSquadStore";
// import { Player } from "../../types/Player";
import LeagueScheduleViewer from "../../components/LeagueSimulator/LeagueScheduleViewer";
import LeagueMyTeam from "../../components/LeagueSimulator/LeagueMyTeam";
import LeagueOpponentTeam from "../../components/LeagueSimulator/LeagueOpponentTeam";

const LeagueSimulator = () => {
  // const { dropPlayers } = useSquadStore();
  const [showSchedule, setShowSchedule] = useState(false); // ✅ 토글용 상태
  const [showMyTeam, setShowMyTeam] = useState(false); // ✅ 토글용 상태
  const [showOpponentTeam, setShowOpponentTeam] = useState(false); // ✅ 토글용 상태
  // interface LeagueResult {
  //   table: Record<
  //     string,
  //     {
  //       pts: number;
  //       wins: number;
  //       draws: number;
  //       losses: number;
  //       gf: number;
  //       ga: number;
  //     }
  //   >;
  //   logs: string[];
  // }

  // const [result, setResult] = useState<LeagueResult | null>(null);

  // // 타입 가드: null 제거
  // const players: Player[] = Object.values(dropPlayers).filter(
  //   (p): p is Player => p !== null
  // );

  // const handleSimulate = async () => {
  //   const teams = ["Solar FC", "Lunar FC", "Nova SC", "Atlas FC"];
  //   const data = await simulateLeague(teams);
  //   setResult(data);
  // };

  return (
    <div style={{ margin: "50px" }}>
      {/* <button onClick={handleSimulate}>리그 시뮬레이션 시작</button> */}
      <button onClick={() => setShowSchedule(!showSchedule)}>
        리그 일정 보기
      </button>
      <button onClick={() => setShowMyTeam(!showMyTeam)}>My Team</button>
      <button onClick={() => setShowOpponentTeam(!showOpponentTeam)}>
        Opponent Team
      </button>
      {<LeagueMyTeam />}
      {<LeagueOpponentTeam />}
      {<LeagueScheduleViewer />}
      {/* {result && (
        <div>
          <h2>리그 테이블</h2>
          {Object.entries(result.table).map(([team, stat]) => (
            <div key={team}>
              {team}: {stat.pts} pts (W:{stat.wins} D:{stat.draws} L:
              {stat.losses} GF:{stat.gf} GA:{stat.ga})
            </div>
          ))}
          <h2>경기 로그</h2>
          <ul>
            {result.logs.map((log: string, idx: number) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
          <h2>Formation Players</h2>
          <ul>
            {players.length > 0 ? (
              players.map((player, idx) => <li key={idx}>{player.name}</li>)
            ) : (
              <li>No players available</li>
            )}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default LeagueSimulator;
