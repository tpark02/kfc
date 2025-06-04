import axios from "axios";
import { useEffect, useRef } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { Match } from "../../types/Match";

const LeagueScheduleViewer = () => {
  const didRun = useRef(false);
  const {
    myUserId,
    mySelectedClubId,
    selectedMyPlayers,
    matches,
    myTeamName,
    myTeamOvr,
    setMatches,
    setHoveredMatchIndex,
  } = useSquadStore();

  const fetchSchedule = async () => {
    console.log("my team name - ", myTeamName);
    try {
      const response = await axios.post<Match[]>(
        "http://localhost:8080/simulate/generate-schedule",
        {
          myTeamName: myTeamName,
          userId: myUserId,
          clubId: mySelectedClubId,
        }
      );
      setMatches(response.data);
    } catch (error) {
      console.error("🔥 일정 생성 실패:", error);
    }
  };

  useEffect(() => {
    if (!didRun.current) {
      const players = selectedMyPlayers;

      if (players.length === 0) {
        console.log("선수가 없습니다.");
        return; // 아무것도 없으면 계산 안 함
      }

      fetchSchedule(); // 이 시점에 보내면 서버에도 올바른 선수 전달됨
      didRun.current = true;
    }
  }, [selectedMyPlayers]);

  return (
    <div
      style={{
        outline: "1px solid blue",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div>📅 리그 일정</div>
      <div>
        My Team Ovr : {myTeamOvr}
        <div
          style={{
            outline: "1px solid red",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            width: "100%",
            height: "100%",
          }}
        >
          {matches
            ? matches.map((match, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "stretch",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    outline: "1px solid red",
                  }}
                  onMouseEnter={() => setHoveredMatchIndex(idx)}
                  onMouseLeave={() => setHoveredMatchIndex(null)}
                >
                  Round {match.round}: {match.homeTeam} vs {match.awayTeam}, ovr
                  : {match.ovr} {" ==> "} {match.res}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default LeagueScheduleViewer;
