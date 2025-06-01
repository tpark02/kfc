import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SeasonResponse } from "../../types/Response";
import { devMatchTimer } from "../../util/Util";
import { Snackbar } from "@mui/material";

import axios from "axios";
import CreateSeasonForm from "./CreateSeasonForm";
import SeasonTimerLobby from "./SeasonTimerLobby"; // ✅ 실시간 타이머 컴포넌트 추가
import { Player, myPlayerToPlayer } from "../../types/Player";

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
import MyClubSelect from "./MyClubSelect";
import { fetchMyClubs } from "../MyClub/MyClubUtil";

interface Season {
  id: number;
  name: string;
  started: boolean;
  createdAt: string;
  finishedAt: string;
}

export default function SeasonLobby() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedMyClubIdx, setIdx] = useState(0);
  const {
    myUserId,
    mySelectedClubId,
    selectedMyPlayers,
    joinedSeasonId,
    setuserId,
    setJoinedSeasonId,
    setSelectedMyPlayers,
    setDropPlayers,
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
  } = useSquadStore();

  const fetchSeasons = async () => {
    const res = await axios.get("http://localhost:8080/season/all");
    const data: Season[] = res.data;
    setSeasons(data);
  };

  useEffect(() => {
    setuserId(1); // 임시 user id
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (joinedSeasonId === -1) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get<SeasonResponse>(
          `http://localhost:8080/season/getSeason/${joinedSeasonId}`
        );

        if (res.data.finishedAt) {
          console.log("🎯 finishedAt detected, stopping polling");
          setJoinedSeasonId(-1);
          setSnackbarMessage("Match is finished");
          setSnackbarOpen(true);
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
    fetchMyClubs(myUserId).then((clubs) => {
      const idx = clubs.findIndex((c) => c.clubId === mySelectedClubId);
      setIdx(idx);
    });
  }, []);

  useEffect(() => {
    fetchMyClubs(myUserId)
      .then((clubs) => {
        // const selectedClub = clubs.find((c) => c.clubId === club?.clubId);
        const selectedClub = clubs[selectedMyClubIdx] ?? undefined;

        // if (selectedClub === undefined) return;

        if (selectedClub === undefined) {
          setSnackbarMessage("The club not found");
          setSnackbarOpen(true);
          return;
        }

        // if (club?.clubId !== undefined) {
        //   setMySelectedClubId(club.clubId);
        // }

        setSelectedMyPlayers(selectedClub.players);

        const playerList: Player[] = selectedClub.players.map(myPlayerToPlayer);

        setDropPlayers([...playerList]);
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
  }, [selectedMyClubIdx]);

  const isdRedCard = selectedMyPlayers.slice(0, 12).some((p) => p.redCard > 0);
   
  useEffect(() => {
    if (isdRedCard) {
      setSnackbarMessage(
        "You cannot have a red carded player in the starting member"
      );
      setSnackbarOpen(true);
    }
  }, [isdRedCard]);

  return (
    <Box p={4}>
      <MyClubSelect selectedIdx={selectedMyClubIdx} setIdx={setIdx} />
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
                    disabled={isdRedCard}
                  >
                    Enter
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper elevation={3} sx={{ width: "40%" }}>
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
        </Paper>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
}
