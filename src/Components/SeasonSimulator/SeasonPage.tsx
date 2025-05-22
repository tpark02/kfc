import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChampionsBracket from "./MatchList";
import SeasonParticipantsList from "./SeasonParticipantsList";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSquadStore } from "../../store/useSquadStore";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // button click state
  const userId = 1; // TODO: replace with logged-in user ID
  const { joinedSeasonId, setJoinedSeasonId } = useSquadStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfJoined = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/season/${seasonId}/participants`
        );
        const alreadyJoined = res.data.some((p: any) => p.id === userId);
        setJoined(alreadyJoined);
      } catch (err) {
        console.error("❌ Failed to check participation:", err);
      } finally {
        setLoading(false);
      }
    };

    if (seasonId) checkIfJoined();
  }, [seasonId]);

  console.log("joined season id:", joinedSeasonId);

  useEffect(() => {
    if (!seasonId) {
      setSnackbarOpen(true);
      setSnackBarMsg("❌ Invalid season ID. Returning...");
      setTimeout(() => {
        navigate("/league"); // 👈 navigate directly to /league
      }, 2000); // wait 2s before redirect
    }
  }, [seasonId, navigate]);

  useEffect(() => {
    if (!seasonId) return;
    if (joinedSeasonId === parseInt(seasonId)) return;
    if (joinedSeasonId > -1) {
      setSnackbarOpen(true);
      setSnackBarMsg(`You are already joined in ${joinedSeasonId}`);
      setTimeout(() => {
        navigate("/league"); // 👈 navigate directly to /league
      }, 2000); // wait 2s before redirect
    }
  }, [joinedSeasonId, seasonId, navigate]);

  const toggleJoin = async () => {
    setProcessing(true);
    try {
      if (joined) {
        await axios.put(
          `http://localhost:8080/season/${seasonId}/leave`,
          null,
          {
            params: { userId },
          }
        );
        setJoinedSeasonId(-1);
        console.log("🚪 Successfully left");
      } else {
        const res = await axios.post(
          `http://localhost:8080/season/${seasonId}/join`,
          null,
          { params: { userId } }
        );
        const { seasonId: returnedId, message } = res.data;
        setJoinedSeasonId(returnedId);
        console.log(`✅ ${message} (Season ID: ${returnedId})`);
      }
      setJoined(!joined); // toggle state
    } catch (err) {
      console.error("❌ Failed to join/leave:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🏆 Season {seasonId} Bracket
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color={joined ? "error" : "primary"}
          onClick={toggleJoin}
          disabled={processing}
          sx={{ mb: 3 }}
        >
          {joined ? "Leave" : "Join"}
        </Button>
      )}
      <SeasonParticipantsList
        seasonId={seasonId ? parseInt(seasonId) : -1}
        refreshKey={joined}
      />

      <ChampionsBracket seasonId={seasonId ? parseInt(seasonId) : -1} />
      <ChampionsBracket seasonId={seasonId ? parseInt(seasonId) : -1} />

      <Dialog open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", fontSize: "1.1rem" }}>
            {snackbarMsg}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
