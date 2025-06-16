import axiosInstance from "../../axiosInstance"; // 👈 custom axios with interceptor
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SeasonResponse } from "../../types/response";
import { devMatchTimer } from "../../util/util";

import CreateSeasonForm from "./CreateSeasonForm";
import SeasonTimerLobby from "./SeasonTimerLobby"; // ✅ 실시간 타이머 컴포넌트 추가
import { shallow } from "zustand/shallow";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Paper,
} from "@mui/material";
import { useSquadStore } from "../../store/useSquadStore";
import { fetchMyClubs } from "../../util/myClubUtil";

interface Season {
  id: number;
  name: string;
  started: boolean;
  createdAt: string;
  finishedAt: string;
}
import { useSnackbarStore } from "../../store/userSnackBarStore";

export default function SeasonLobby() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  const {
    HasRedCard,
    myUserId,
    mySelectedClubId,
    joinedSeasonId,
    setJoinedSeasonId,
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyFormation,
    setMySelectedClubId,
  } = useSquadStore(
    (s) => ({
      HasRedCard: s.HasRedCard,
      myUserId: s.myUserId,
      mySelectedClubId: s.mySelectedClubId,
      joinedSeasonId: s.joinedSeasonId,
      setJoinedSeasonId: s.setJoinedSeasonId,
      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyFormation: s.setMyFormation,
      setMySelectedClubId: s.setMySelectedClubId,
    }),
    shallow
  );

  const fetchSeasons = async () => {
    const res = await axiosInstance.get("/season/all");
    const data: Season[] = res.data;
    setSeasons(data);
  };

  useEffect(() => {
    // setMyUserId(1); // 임시 user id
    console.log("setting user id:", myUserId);
  }, []);

  useEffect(() => {
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (joinedSeasonId === -1) return;

    const interval = setInterval(async () => {
      try {
        const res = await axiosInstance.get<SeasonResponse>(
          `/season/getSeason/${joinedSeasonId}`
        );

        if (res.data.finishedAt) {
          console.log("🎯 finishedAt detected, stopping polling");
          setJoinedSeasonId(-1);
          useSnackbarStore.getState().setSnackbar("Match is finished");
          fetchSeasons(); // refresh all matches in the lobby
          clearInterval(interval);
        }
      } catch (err) {
        console.error("❌ Failed to poll season info:", err);
      }
    }, devMatchTimer);

    return () => clearInterval(interval);
  }, [joinedSeasonId, setJoinedSeasonId]);

  useEffect(() => {
    console.log("4");
    fetchMyClubs(myUserId)
      .then((clubs) => {
        const selectedClub = clubs ?? undefined;
        if (selectedClub === undefined) {
          useSnackbarStore.getState().setSnackbar("The club not found");
          return;
        }
        setMySelectedPlayers(selectedClub.players);
        setMyFormation(selectedClub.formationName);
        setMyTeamOvr(selectedClub.ovr);
        setMyTeamSquadValue(selectedClub.price);
        setMyTeamAge(selectedClub.age);
        setMyTeamPace(selectedClub.pace);
        setMyTeamDefense(selectedClub.defense);
        setMyTeamAttack(selectedClub.attack);
        setMyTeamClubCohesion(selectedClub.clubCohesion);
        setMyTeamStamina(selectedClub.stamina);
        setMySelectedClubId(selectedClub.clubId ?? 0);
      })
      .finally(() => {});
  }, [
    mySelectedClubId,
    myUserId,
    setMySelectedPlayers,
    setMyFormation,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMySelectedClubId,
  ]);

  // const isdRedCard = selectedMyPlayers.slice(0, 10).some((p) => p.redCard > 0);

  useEffect(() => {
    if (HasRedCard) {
      useSnackbarStore.getState().setSnackbar(
        "You cannot have a red carded player in the starting member"
      );
    }
  }, [HasRedCard]);

  return (
    <Box>
      {/* <MyClubSelect selectedIdx={selectedMyClubIdx} setIdx={setIdx} /> */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {joinedSeasonId}
      </Typography>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        League List
      </Typography>
      <Box mb={3}>
        <CreateSeasonForm onCreated={fetchSeasons} />
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        {" "}
        <Paper elevation={3} sx={{ width: "60%" }}>
          {" "}
          <List>
            {seasons.map((season) => (
              <ListItem key={season.id} divider>
                <ListItemText
                  primary={season.name}
                  secondary={
                    <SeasonTimerLobby
                      createdAt={season.createdAt}
                      finishedAt={season.finishedAt}
                    />
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/season/${season.id}`}
                    disabled={HasRedCard}
                  >
                    Enter
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        {/* <Paper elevation={3} sx={{ width: "40%" }}>
          {" "}
          {selectedMyPlayers.map((p) => {
            return (
              <Box
                style={{ display: "flex", flexDirection: "row", gap: "12px" }}
              >
                <Box>{p.pos}</Box>
                <Box>{p.name}</Box>
                <Box>{p.ovr}</Box>
              </Box>
            );
          })}
        </Paper> */}
      </Box>     
    </Box>
  );
}
