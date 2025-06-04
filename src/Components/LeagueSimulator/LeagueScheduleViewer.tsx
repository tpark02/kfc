import { useSquadStore } from "../../store/useSquadStore";
import { Match } from "../../types/Match";

interface LeagueScheduleViewerProps {
  matches: Match[];
}

const LeagueScheduleViewer: React.FC<LeagueScheduleViewerProps> = ({ matches }) => {
  const {myTeamOvr, setHoveredMatchIndex} = useSquadStore();
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
