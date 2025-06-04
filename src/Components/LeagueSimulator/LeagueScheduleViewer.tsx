import { useSquadStore } from "../../store/useSquadStore";
import { Match } from "../../types/Match";

interface LeagueScheduleViewerProps {
  matches: Match[];
}

const LeagueScheduleViewer: React.FC<LeagueScheduleViewerProps> = ({
  matches,
}) => {
  const { setHoveredMatchIndex } = useSquadStore();
  return (
    <div
      style={{
        outline: "1px solid blue",
        minWidth: "300px", // ✅ prevent items from becoming too small
        flex: "1 1 30%", // ✅ flexible but constrained
        maxWidth: "100%", // ✅ responsive on shrink
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
      }}
    >
      <div>📅 리그 일정</div>
      <div>
        <div
          style={{
            outline: "1px solid red",
            display: "flex",
            flexDirection: "column",
            // flexWrap: "nowrap",
            width: "100%",
            height: "auto",
          }}
        >
          {matches
            ? matches.map((match, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // flexWrap: "nowrap",
                    justifyContent: "stretch",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
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
