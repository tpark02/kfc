import axios from "axios";
import { useEffect, useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { Player } from "../../types/Player";

interface Match {
  homeTeam: string;
  awayTeam: string;
  round: number;
  ovr: number;
  res: string;
}

export const LeagueScheduleViewer = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const { myTeamName, dropPlayers, myTeamOvr } = useSquadStore();

  const fetchSchedule = async () => {
    try {
      const response = await axios.post<Match[]>(
        "http://localhost:8080/api/simulate/generate-schedule",
        {
          myTeamName: myTeamName,
          myTeamMembers: Object.values(dropPlayers).filter(
            (p): p is Player => p !== null
          ),
        }
      );
      setMatches(response.data);
    } catch (error) {
      console.error("🔥 일정 생성 실패:", error);
    }
  };

  useEffect(() => {
    const players = Object.values(dropPlayers).filter(
      (p): p is Player => p !== null
    );

    if (players.length === 0) {
      console.log("선수가 없습니다.");
      return; // 아무것도 없으면 계산 안 함
    }

    fetchSchedule(); // 이 시점에 보내면 서버에도 올바른 선수 전달됨
  }, [dropPlayers]);

  return (
    <div>
      <h2>📅 리그 일정</h2>
      <ul>
        My Team Ovr : {myTeamOvr}
        {matches
          ? matches.map((match, idx) => (
              <li key={idx}>
                Round {match.round}: {match.homeTeam} vs {match.awayTeam}, ovr :{" "}
                {match.ovr} {" ==> "} {match.res}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
