import LeagueScheduleViewer from "./LeagueScheduleViewer";
import LeagueMyTeam from "./LeagueMyTeam";
import LeagueOpponentTeam from "./LeagueOpponentTeam";
import { Button } from "@mui/material";

const LeagueSimulator = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {          
        }}
        sx={{ margin: "10px" }}
      >
        START
      </Button>
      <div
        style={{
          backgroundColor: "var(--background-color)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignContent: "stretch",
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
    </div>
  );
};

export default LeagueSimulator;
