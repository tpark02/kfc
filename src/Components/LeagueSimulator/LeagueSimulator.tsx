import { useEffect } from "react";
import LeagueScheduleViewer from "./LeagueScheduleViewer";
import LeagueMyTeam from "./LeagueMyTeam";
import LeagueOpponentTeam from "./LeagueOpponentTeam";
import { Button } from "@mui/material";
import { fetchSchedule } from "../../util/LeagueUtil";
import { useSquadStore } from "../../store/useSquadStore";

const LeagueSimulator = () => {
  const {
    myUserId,
    mySelectedClubId,
    selectedMyPlayers,
    matches,
    myTeamName,
    setMatches,
  } = useSquadStore();

  const fetchData = async () => {
    const players = selectedMyPlayers;

    if (players.length === 0) {
      console.log("선수가 없습니다.");
      return;
    }

    try {
      const response = await fetchSchedule(
        myTeamName,
        myUserId,
        mySelectedClubId
      );
      if (response !== undefined) setMatches(response.data);
    } catch (err) {
      console.error("❌ 경기 일정 불러오기 실패:", err);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          fetchData();
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
        <LeagueScheduleViewer matches={matches} />
        <LeagueOpponentTeam />
      </div>
    </div>
  );
};

export default LeagueSimulator;
