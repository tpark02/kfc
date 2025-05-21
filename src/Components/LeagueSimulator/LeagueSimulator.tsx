// import LeagueScheduleViewer from "../../components/LeagueSimulator/LeagueScheduleViewer";
// import LeagueMyTeam from "../../components/LeagueSimulator/LeagueMyTeam";
// import LeagueOpponentTeam from "../../components/LeagueSimulator/LeagueOpponentTeam";

import SeasonLobby from "../SeasonSimulator/SeasonLobby";

const LeagueSimulator = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background-color)",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        // justifyContent: "center",
        // alignContent: "stretch",        
        alignItems: "center",
        width: "100%",
        height: "100%",
        outline: "1px solid red",
        margin: "50px 0 0 0",
      }}
    >
      {/* <LeagueMyTeam />
      <LeagueScheduleViewer />
      <LeagueOpponentTeam /> */}

      {/* <JoinSeasonButton seasonId={1} /> */}
      {/* <ChampionsBracket seasonId={1} /> */}
      <SeasonLobby/>
    </div>
  );
};

export default LeagueSimulator;
