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
// import SeasonParticipantsList from "./SeasonParticipantsList";
import SeasonTimer from "./SeasonTimer";
import { useSquadStore } from "../../store/useSquadStore";
import { SeasonResponse } from "../../types/Response";
// import MyClubSelect from "./MyClubSelect";
import { fetchMyClubs, fetchSeasonInfo } from "../MyClub/MyClubUtil";
import { Snackbar } from "@mui/material";
import { Player, myPlayerToPlayer } from "../../types/Player";
import { getOvrIndicator, getTeamOvrIndicator } from "../MyClub/MyClubUtil";
import { totalNumberOfPlayers } from "../../types/Team";
import { MatchDto } from "../../types/MatchDto";
import "../../style/SeasonPage.css";

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const [season, setSeason] = useState<SeasonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  // const [selectedMyClubIdx, setIdx] = useState(0);
  // const [selectedMyClubIdx] = useState(0);
  const navigate = useNavigate();
  const userId = 1; // TODO: replace with actual logged-in user
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {
    mySelectedClubId,
    joinedSeasonId,
    myUserId,
    selectedMyPlayers,
    myTeamOvr,
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // useEffect(() => {
  //   fetchMyClubs(myUserId).then((clubs) => {
  //     const idx = clubs.findIndex((c) => c.clubId === mySelectedClubId);
  //     setIdx(idx);
  //   });
  // }, []);

  useEffect(() => {
    if (!seasonId) {
      setDialogMsg("❌ Invalid season ID. Returning...");
      setDialogOpen(true);
      setTimeout(() => navigate("/league"), 2000);
      return;
    }

    (async () => {
      const res: SeasonResponse | null = await fetchSeasonInfo(seasonId);

      if (res !== null) setSeason(res);

      setLoading(false);
    })();
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
          loadMyClub();
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

  const loadMyClub = async () => {
    const clubs = await fetchMyClubs(myUserId);
    const selectedClub = clubs.find((c) => c.clubId === mySelectedClubId);
    if (!selectedClub) {
      setSnackbarMessage("The club not found");
      setSnackbarOpen(true);
      return;
    }

    const playerList: Player[] = selectedClub.players.map(myPlayerToPlayer);
    setDropPlayers([...playerList]);
    setSelectedMyPlayers(selectedClub.players);
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
  };

  useEffect(() => {
    loadMyClub();
  }, [mySelectedClubId]);

  const adjustedTeamOvr = Math.floor(
    selectedMyPlayers
      .map((p) => p.ovr - p.yellowCard * 5 - p.redCard * 10)
      .reduce((acc, curr) => acc + curr, 0) / totalNumberOfPlayers
  );

  const [selectedMatch, setSelectedMatch] = useState<MatchDto | null>(null);
  const [isMatchClicked, setIsMatchClicked] = useState(false);
  // const [showMatchDialog, setShowMatchDialog] = useState(false);

  const handleMatchClick = (match: MatchDto) => {
    setSelectedMatch(match);
    // setShowMatchDialog(true);
  };

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
            setSeason={setSeason}
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

      <Box
        p={0}
        display="flex"
        flexDirection="row"
        width="100%"
        flexWrap="wrap"
      >
        {isMatchClicked ? (
          <Box flex={1} border="1px solid red" padding={0}>
            <Typography fontWeight="bold">
              {selectedMatch?.player1Name} 선수 명단
            </Typography>
            {selectedMatch?.myPlayerList1?.map((p, i) => (
              <div key={i}>
                {p.pos} - {p.name} ({p.ovr})
              </div>
            ))}
          </Box>
        ) : (
          <Box flex={1} border="1px solid red" padding={0}>
            <Box>
              {adjustedTeamOvr}
              {getTeamOvrIndicator(adjustedTeamOvr, myTeamOvr)}
            </Box>
            <Box>
              {selectedMyPlayers.map((p) => {
                const adjustOvr = p.ovr - p.yellowCard * 5 - p.redCard * 10;
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: "12px",
                      outline: "1px solid red",
                    }}
                  >
                    <div className="player-item">{p.pos}</div>
                    <div className="player-item">{p.name}</div>
                    <div className="player-item">{p.ovr}</div>
                    <div className="player-item">{"->"}</div>
                    <div className="player-item">{adjustOvr}</div>
                    <div className="player-item">
                      {getOvrIndicator(p.ovr, p.yellowCard, p.redCard)}
                    </div>
                    <div className="player-item">{p.redCard}</div>
                    <div className="player-item">{p.yellowCard}</div>
                  </div>
                );
              })}
            </Box>
          </Box>
        )}
        <Box flex={2} border="1px solid red" padding={0}>
          {season?.started ? (
            <ChampionsBracket
              seasonId={seasonId ? parseInt(seasonId) : -1}
              onMatchClick={handleMatchClick}
              setIsMatchClicked={setIsMatchClicked}
            />
          ) : (
            <Typography color="gray" mt={2}>
              🕒 Waiting for match to start...
            </Typography>
          )}
        </Box>
        {/* <Box flex={1} border="1px solid red" padding={0}>
          <SeasonParticipantsList
            seasonId={seasonId ? parseInt(seasonId) : -1}
            refreshKey={joinedSeasonId !== -1}
          />
        </Box> */}
        {selectedMatch && (
          <Box flex={1} border="1px solid red" padding={0}>
            {/* <Typography fontWeight="bold">
              {selectedMatch.player1Name} 선수 명단
            </Typography>
            {selectedMatch.myPlayerList1?.map((p, i) => (
              <div key={i}>
                {p.pos} - {p.name} ({p.ovr})
              </div>
            ))} */}

            <Typography fontWeight="bold" mt={2}>
              {selectedMatch.player2Name} 선수 명단
            </Typography>
            {selectedMatch.myPlayerList2?.map((p, i) => (
              <div key={i}>
                {p.pos} - {p.name} ({p.ovr})
              </div>
            ))}
          </Box>
        )}
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
