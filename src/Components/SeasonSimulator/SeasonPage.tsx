import axios from "axios";
import ChampionsBracket from "./ChampionsBracket";
import SeasonParticipantsList from "./SeasonParticipantsList";
import SeasonTimer from "./SeasonTimer";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useSquadStore } from "../../store/useSquadStore";
import { useNavigate } from "react-router-dom";
// import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { devMatchTimer } from "../../util/Util";

import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // button click state
  const { joinedSeasonId, setJoinedSeasonId } = useSquadStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [seasonStarted, setSeasonStarted] = useState(false); // ✅ 추가
  const userId = 1; // TODO: replace with logged-in user ID
  const navigate = useNavigate();

  console.log("joined season id:", joinedSeasonId);

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

    if (seasonId) {
      checkIfJoined();
      fetchSeasonInfo();
    }
  }, [seasonId]);

  const fetchSeasonInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/season/${seasonId}`);
      setRemainingSeconds(res.data.remainingSeconds);
      setSeasonStarted(res.data.started); // ✅ started 정보 저장
    } catch (err) {
      console.error("❌ Failed to load season info:", err);
    }
  };

  useEffect(() => {
    if (!seasonId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:8080/season/${seasonId}`);
        const started = res.data.started;
        if (started) {
          setSeasonStarted(true);
          // setSnackbarOpen(true);
          // setSnackBarMsg(
          //   "🚫 This match has already started. Entry is not allowed."
          // );
          // setTimeout(() => navigate("/league"), 2500);
        }
      } catch (err) {
        console.error("❌ Failed to refresh season state:", err);
      }
    }, 3000); // ⏱️ 3초마다 체크

    return () => clearInterval(interval); // cleanup
  }, [seasonId, navigate]);

  useEffect(() => {
    if (!seasonId) {
      setDialogOpen(true);
      setDialogMsg("❌ Invalid season ID. Returning...");
      setTimeout(() => {
        navigate("/league"); // 👈 navigate directly to /league
      }, 2000); // wait 2s before redirect
    }
  }, [seasonId, navigate]);

  useEffect(() => {
    if (!seasonId) return;
    if (joinedSeasonId === parseInt(seasonId)) return;
    if (joinedSeasonId > -1) {
      setDialogOpen(true);
      setDialogMsg(`You are already joined in ${joinedSeasonId}`);
      // setTimeout(() => {
      //   navigate("/league"); // 👈 navigate directly to /league
      // }, 2000); // wait 2s before redirect
    }
  }, [joinedSeasonId, seasonId, navigate]);

  useEffect(() => {
    if (!seasonId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:8080/season/${seasonId}`);
        const started = res.data.started;
        setRemainingSeconds(res.data.remainingSeconds);
        if (started && !seasonStarted) {
          setSeasonStarted(true); // this triggers re-render and shows bracket
          setDialogOpen(true);
          setDialogMsg("🚨 Match has started!");
        }
      } catch (err) {
        console.error("❌ Failed to poll season info:", err);
      }
    }, devMatchTimer);

    return () => clearInterval(interval);
  }, [seasonId, seasonStarted]);

  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

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
      {remainingSeconds !== null && seasonId && (
        <SeasonTimer
          initialRemaining={remainingSeconds}
          seasonId={parseInt(seasonId)}
        />
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color={joined ? "error" : "primary"}
          onClick={toggleJoin}
          disabled={processing || seasonStarted}
          sx={{ mb: 3 }}
        >
          {joined ? "Leave" : "Join"}
        </Button>
      )}
      <SeasonParticipantsList
        seasonId={seasonId ? parseInt(seasonId) : -1}
        refreshKey={joined}
      />

      {seasonStarted ? (
        <ChampionsBracket seasonId={seasonId ? parseInt(seasonId) : -1} />
      ) : (
        <Typography color="gray" mt={2}>
          🕒 Waiting for match to start...
        </Typography>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {/* Optional title text */}
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
    </Box>
  );
}
