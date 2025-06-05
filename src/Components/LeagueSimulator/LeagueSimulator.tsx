import { useEffect, useState } from "react";
import LeagueScheduleViewer from "./LeagueScheduleViewer";
import LeagueMyTeam from "./LeagueMyTeam";
import LeagueOpponentTeam from "./LeagueOpponentTeam";
import { Button } from "@mui/material";
import { fetchSchedule } from "../../util/LeagueUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { Snackbar } from "@mui/material";

const LeagueSimulator = () => {
  const {
    HasRedCard,
    myUserId,
    mySelectedClubId,
    mySelectedPlayers,
    matches,
    myTeamName,
    setMatches,
  } = useSquadStore(
    (s) => ({
      HasRedCard: s.HasRedCard,
      myUserId: s.myUserId,
      mySelectedClubId: s.mySelectedClubId,
      mySelectedPlayers: s.mySelectedPlayers,
      matches: s.matches,
      myTeamName: s.myTeamName,
      setMatches: s.setMatches,
    }),
    shallow
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (HasRedCard) {
      setSnackbarMessage(
        "You cannot have a red carded player in the starting member"
      );
      setSnackbarOpen(true);
    }
  }, [HasRedCard]);

  const fetchData = async () => {
    const players = mySelectedPlayers;

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
      if (response !== undefined) {
        console.log("League Simulator MatchDto - ", response.data);
        setMatches(response.data);
      }
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
        disabled={HasRedCard}
        sx={{ margin: "10px" }}
      >
        START
      </Button>
      <div
        style={{
          backgroundColor: "var(--background-color)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "stretch",
          width: "100%",
          height: "auto",
          outline: "1px solid red",
          margin: "50px 0 0 0",
        }}
      >
        <LeagueMyTeam matches={matches} />
        <LeagueScheduleViewer matches={matches} />
        <LeagueOpponentTeam />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default LeagueSimulator;
