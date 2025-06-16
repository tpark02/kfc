import { useEffect } from "react";
import LeagueScheduleViewer from "./LeagueScheduleViewer";
import LeagueMyTeam from "./LeagueMyTeam";
import LeagueOpponentTeam from "./LeagueOpponentTeam";

import { fetchSchedule } from "../../util/leagueUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { Grid, Box, Button, Typography } from "@mui/material";

const LeagueSimulator = () => {
  const {
    HasRedCard,
    myUserId,
    mySelectedClubId,
    mySelectedPlayers,
    matches,
    // myTeamName,
    setMatches,
  } = useSquadStore(
    (s) => ({
      HasRedCard: s.HasRedCard,
      myUserId: s.myUserId,
      mySelectedClubId: s.mySelectedClubId,
      mySelectedPlayers: s.mySelectedPlayers,
      matches: s.matches,
      // myTeamName: s.myTeamName,
      setMatches: s.setMatches,
    }),
    shallow
  );

  useEffect(() => {
    if (HasRedCard) {
      useSnackbarStore
        .getState()
        .setSnackbar(
          "You cannot have a red carded player in the starting member"
        );
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
        // myTeamName,
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
    <div style={{ display: "flex", flexDirection: "column" }}>
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
      {/* <div
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
          margin: "10px 0 0 0",
        }}
      > */}
      <Grid
        container
        spacing={1}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Grid item xs={12} md={2}>
          <LeagueMyTeam matches={matches} />
        </Grid>
        <Grid item xs={12} md={8}>
          <LeagueScheduleViewer matches={matches} />
        </Grid>
        <Grid item xs={12} md={2}>
          <LeagueOpponentTeam />
        </Grid>
      </Grid>
    </div>
    // </div>
  );
};

export default LeagueSimulator;
