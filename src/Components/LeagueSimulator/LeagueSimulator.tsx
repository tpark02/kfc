import LeagueScheduleViewer from "../../components/LeagueSimulator/LeagueScheduleViewer";
import LeagueMyTeam from "../../components/LeagueSimulator/LeagueMyTeam";
import LeagueOpponentTeam from "../../components/LeagueSimulator/LeagueOpponentTeam";

const LeagueSimulator = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background-color)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
        // alignContent: "stretch",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        outline: "1px solid red",
        margin: "50px 0 0 0",
      }}
    >
      <LeagueMyTeam />
      <LeagueScheduleViewer />
      <LeagueOpponentTeam />
    </div>
  );
};

export default LeagueSimulator;
