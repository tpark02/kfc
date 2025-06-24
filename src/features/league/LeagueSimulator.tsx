import { useEffect } from "react";
import LeagueScheduleViewer from "./LeagueScheduleViewer";
import LeagueMyTeam from "./LeagueMyTeam";
import LeagueOpponentTeam from "./LeagueOpponentTeam";
import { useLoadingMyCoin } from "../../hooks/useLoadingMyCoin";
import { fetchSchedule } from "../../util/leagueUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

const LeagueSimulator = () => {
  const {
    HasRedCard,
    myUserId,
    mySelectedClubId,
    mySelectedPlayers,
    matches,
    setMatches,
    setTotalAddStatPoints,
  } = useSquadStore(
    (s) => ({
      HasRedCard: s.HasRedCard,
      myUserId: s.myUserId,
      mySelectedClubId: s.mySelectedClubId,
      mySelectedPlayers: s.mySelectedPlayers,
      matches: s.matches,

      setMatches: s.setMatches,
      setTotalAddStatPoints: s.setTotalAddStatPoints,
    }),
    shallow
  );

  const { reload } = useLoadingMyCoin(myUserId);

  useEffect(() => {
    if (matches.length === 0) fetchData();
  }, []);

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
    useLoadingSpinnerStore.getState().setIsLoading(true);
    console.log("fetch data !!!");
    const players = mySelectedPlayers;

    if (players.length === 0) {
      console.log("No players selected.");
      return;
    }

    try {
      const response = await fetchSchedule(myUserId, mySelectedClubId);
      if (response !== undefined) {        
        setMatches(response.data);
        setTotalAddStatPoints(response.data.reduce((acc, m) => acc + m.addStats, 0));
      }
      reload();
    } catch (err) {
      console.error("❌ Failed to load match schedule:", err);
    } finally {
      useLoadingSpinnerStore.getState().setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={2}>
          <LeagueMyTeam fetchData={fetchData} HasRedCard={HasRedCard} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LeagueScheduleViewer matches={matches} />
        </Grid>
        <Grid item xs={12} md={2}>
          <LeagueOpponentTeam />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeagueSimulator;
