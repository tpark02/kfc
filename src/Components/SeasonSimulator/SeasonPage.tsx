import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { devMatchTimer } from "../../util/Util";
import ChampionsBracket from "./ChampionsBracket";
import SeasonParticipantsList from "./SeasonParticipantsList";
import SeasonTimer from "./SeasonTimer";
import { useSquadStore } from "../../store/useSquadStore";
import { SeasonResponse } from "../../types/Response";
import MyClubSelect from "./MyClubSelect";
import { fetchMyClubs } from "../MyClub/MyClubUtil";
import { Snackbar } from "@mui/material";
import { Player, myPlayerToPlayer } from "../../types/Player";

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const [season, setSeason] = useState<SeasonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [selectedMyClubIdx, setIdx] = useState(0);
  const navigate = useNavigate();
  const userId = 1; // TODO: replace with actual logged-in user
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {    
    mySelectedClubId,
    joinedSeasonId,
    myUserId,
    selectedMyPlayers,
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
  } = useSquadStore();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!seasonId) {
      setDialogMsg("❌ Invalid season ID. Returning...");
      setDialogOpen(true);
      setTimeout(() => navigate("/league"), 2000);
      return;
    }

    const fetchSeasonInfo = async () => {
      try {
        const res = await axios.get<SeasonResponse>(
          `http://localhost:8080/season/getSeason/${seasonId}`
        );
        setSeason(res.data);
      } catch (err) {
        console.error("❌ Failed to load season info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonInfo();
  }, [seasonId, navigate]);

  useEffect(() => {
    if (!seasonId || joinedSeasonId === parseInt(seasonId)) return;
    if (joinedSeasonId > -1) {
      setDialogMsg(`You are already joined in ${joinedSeasonId}`);
      setDialogOpen(true);
    }
  }, [joinedSeasonId, seasonId]);

  useEffect(() => {
    if (joinedSeasonId === -1) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get<SeasonResponse>(
          `http://localhost:8080/season/getSeason/${joinedSeasonId}`
        );
        setSeason(res.data);

        if (res.data.finishedAt) {
          console.log("🎯 finishedAt detected, stopping polling");
          setJoinedSeasonId(-1);
          setDialogMsg("Match is finished");
          setDialogOpen(true);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("❌ Failed to poll season info:", err);
      }
    }, devMatchTimer);

    return () => clearInterval(interval);
  }, [joinedSeasonId, setJoinedSeasonId]);

  const toggleJoin = async () => {
    setProcessing(true);
    try {
      if (joinedSeasonId !== -1) {
        await axios.put(
          `http://localhost:8080/season/${seasonId}/leave`,
          null,
          { params: { userId } }
        );
        setJoinedSeasonId(-1);
        console.log("🚪 Successfully left");
      } else {
        const res = await axios.post(
          `http://localhost:8080/season/${seasonId}/join`,
          null,
          { params: { userId, mySelectedClubId } }
        );
        setJoinedSeasonId(res.data.seasonId);
        console.log(`✅ ${res.data.message} (Season ID: ${res.data.seasonId})`);
      }
    } catch (err) {
      console.error("❌ Failed to join/leave:", err);
    } finally {
      setProcessing(false);
    }
  };

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
      })
      .finally(() => {});
  }, [selectedMyClubIdx]);

  return (
    <>
    <Box p={4}>
      {season?.finishedAt && (
        <Typography variant="body1" sx={{ mb: 1 }}>
          🏁 Match Finished At: {new Date(season.finishedAt).toLocaleString()}
        </Typography>
      )}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🏆 Season {seasonId} Bracket
      </Typography>

      {season?.remainingSeconds !== null && seasonId && (
        <SeasonTimer
          initialRemaining={season?.remainingSeconds ?? 0}
          seasonId={parseInt(seasonId)}
        />
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color={joinedSeasonId !== -1 ? "error" : "primary"}
          onClick={toggleJoin}
          disabled={
            processing ||
            season?.started ||
            (joinedSeasonId !== -1 &&
              joinedSeasonId !== parseInt(seasonId ?? "-1"))
          }
          sx={{ mb: 3, border: "1px solid red" }}
        >
          {joinedSeasonId !== -1 ? "Leave" : "Join"}
        </Button>
      )}
      </Box>
      <Box p={0} display="flex" flexDirection="row" width="100%"   flexWrap="wrap">
        <Box flex={1} border="1px solid red" padding={0}>
          {" "}
          <MyClubSelect selectedIdx={selectedMyClubIdx} setIdx={setIdx} />
          {selectedMyPlayers.map((p) => {
            return (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "12px" }}
              >
                <div>{p.pos}</div>
                <div>{p.name}</div>
                <div>{p.ovr}</div>
              </div>
            );
          })}
        </Box>
        <Box flex={2} border="1px solid red" padding={0}>
          {season?.started ? (
            <ChampionsBracket seasonId={seasonId ? parseInt(seasonId) : -1} />
          ) : (
            <Typography color="gray" mt={2}>
              🕒 Waiting for match to start...
            </Typography>
          )}
        </Box>
        <Box flex={1} border="1px solid red" padding={0}>
          <SeasonParticipantsList
            seasonId={seasonId ? parseInt(seasonId) : -1}
            refreshKey={joinedSeasonId !== -1}
          />
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => setDialogOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", fontSize: "1.1rem" }}>
            {dialogMsg}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}
