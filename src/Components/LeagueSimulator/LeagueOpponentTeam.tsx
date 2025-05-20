import React from "react";
import { useSquadStore } from "../../store/useSquadStore";

const LeagueOpponentTeam: React.FC = () => {
  const { matches, hoveredMatchIndex } = useSquadStore();
  // const [matches, setMatches] = useState<Match[]>([]);

  // const fetchSchedule = async () => {
  //   try {
  //     const response = await axios.post<Match[]>(
  //       "http://localhost:8080/simulate/generate-schedule",
  //       {
  //         myTeamName: myTeamName,
  //         myTeamMembers: Object.values(dropPlayers).filter(
  //           (p): p is Player => p !== null
  //         ),
  //       }
  //     );
  //     setMatches(response.data);
  //   } catch (error) {
  //     console.error("🔥 일정 생성 실패:", error);
  //   }
  // };

  // useEffect(() => {
  //   const players = Object.values(dropPlayers).filter(
  //     (p): p is Player => p !== null
  //   );

  //   if (players.length === 0) {
  //     console.log("선수가 없습니다.");
  //     return; // 아무것도 없으면 계산 안 함
  //   }

  //   fetchSchedule(); // 이 시점에 보내면 서버에도 올바른 선수 전달됨
  // }, [dropPlayers]);

  const hoveredMatch =
    hoveredMatchIndex !== null ? matches[hoveredMatchIndex] : matches[0];

  return (
    <>
      <div
        style={{
          outline: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div>Opponent Team</div>
        {/* <div>Formation:{myFormation}</div> */}
        <div>Team Name: {hoveredMatch?.awayTeam}</div>
        {/* <div>Squad Value: {myTeamSquadValue}</div> */}
        <div>OVR: {hoveredMatch?.ovr}</div>
        <div>Players:</div>
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
          {hoveredMatch?.members ? (
            hoveredMatch.members.map((player, idx) => (
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
              >
                {player.name} - {player.pos} - OVR: {player.ovr}
              </div>
            ))
          ) : (
            <div>선수가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default LeagueOpponentTeam;
