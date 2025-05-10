import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { Player } from "../../types/Player";

interface Match {
  homeTeam: string;
  awayTeam: string;
  round: number;
  ovr: number;
  res: string;
  members: Player[];
}

const LeagueOpponentTeam: React.FC = () => {
  const { myTeamName, dropPlayers } = useSquadStore();
  const [matches, setMatches] = useState<Match[]>([]);

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
    <>
      {
        <div style={{ margin: "50px" }}>
          <h2>Opponent Team</h2>
          {/* <div>Formation:{myFormation}</div> */}
          <div>Team Name: {matches[0]?.awayTeam}</div>
          {/* <div>Squad Value: {myTeamSquadValue}</div> */}
          <div>OVR: {matches[0]?.ovr}</div>
          <div>Players:</div>
          <ul>
            {matches[0]?.members ? (
              matches[0].members.map((player, idx) => (
                <li key={idx}>
                  {player.name} - {player.pos} - OVR: {player.ovr}
                </li>
              ))
            ) : (
              <div>선수가 없습니다.</div>
            )}
          </ul>
        </div>
      }
    </>
  );
};
export default LeagueOpponentTeam;
