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

interface SeasonDto {
  id: number;
  name: string;
  started: boolean;
  createdAt: string;
  finishedAt: string | null;
  participantNames: string[];
  remainingSeconds: number;
}

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const [season, setSeason] = useState<SeasonDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const { joinedSeasonId, setJoinedSeasonId } = useSquadStore();
  const navigate = useNavigate();
  const userId = 1; // TODO: replace with actual logged-in user

  useEffect(() => {
    if (!seasonId) {
      setDialogMsg("❌ Invalid season ID. Returning...");
      setDialogOpen(true);
      setTimeout(() => navigate("/league"), 2000);
      return;
    }

    const fetchSeasonInfo = async () => {
      try {
        const res = await axios.get<SeasonDto>(`http://localhost:8080/season/getSeason/${seasonId}`);
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
    if (!seasonId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get<SeasonDto>(`http://localhost:8080/season/getSeason/${seasonId}`);
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
  }, [seasonId, setJoinedSeasonId]);

  const toggleJoin = async () => {
    setProcessing(true);
    try {
      if (joinedSeasonId !== -1) {
        await axios.put(`http://localhost:8080/season/${seasonId}/leave`, null, { params: { userId } });
        setJoinedSeasonId(-1);
        console.log("🚪 Successfully left");
      } else {
        const res = await axios.post(`http://localhost:8080/season/${seasonId}/join`, null, { params: { userId } });
        setJoinedSeasonId(res.data.seasonId);
        console.log(`✅ ${res.data.message} (Season ID: ${res.data.seasonId})`);
      }
    } catch (err) {
      console.error("❌ Failed to join/leave:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
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
        <SeasonTimer initialRemaining={season?.remainingSeconds ?? 0} seasonId={parseInt(seasonId)} />
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color={joinedSeasonId !== -1 ? "error" : "primary"}
          onClick={toggleJoin}
          disabled={processing || season?.started || (joinedSeasonId !== -1 && joinedSeasonId !== parseInt(seasonId ?? "-1"))}
          sx={{ mb: 3 }}
        >
          {joinedSeasonId !== -1 ? "Leave" : "Join"}
        </Button>
      )}

      <SeasonParticipantsList
        seasonId={seasonId ? parseInt(seasonId) : -1}
        refreshKey={joinedSeasonId !== -1}
      />

      {season?.started ? (
        <ChampionsBracket seasonId={seasonId ? parseInt(seasonId) : -1} />
      ) : (
        <Typography color="gray" mt={2}>
          🕒 Waiting for match to start...
        </Typography>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => setDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
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
