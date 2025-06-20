import { useEffect } from "react";
import LeagueScheduleViewer from "./LeagueScheduleViewer";
import LeagueMyTeam from "./LeagueMyTeam";
import LeagueOpponentTeam from "./LeagueOpponentTeam";
import { useLoadingMyCoin } from "../hooks/useLoadingMyCoin";
import { fetchSchedule } from "../../util/leagueUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { Grid } from "@mui/material";

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
  const { error, reload } = useLoadingMyCoin(myUserId);

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

    const players = mySelectedPlayers;

    if (players.length === 0) {
      console.log("선수가 없습니다.");
      return;
    }

    try {
      const response = await fetchSchedule(myUserId, mySelectedClubId);
      if (response !== undefined) {
        console.log("League Simulator MatchDto - ", response.data);
        setMatches(response.data);
      }
      reload();
    } catch (err) {
      console.error("❌ 경기 일정 불러오기 실패:", err);
    } finally {
      useLoadingSpinnerStore.getState().setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={2}>
          <LeagueMyTeam
            matches={matches}
            fetchData={fetchData}
            HasRedCard={HasRedCard}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
