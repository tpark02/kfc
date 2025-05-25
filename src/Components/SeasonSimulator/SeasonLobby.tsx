import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SeasonResponse } from "../../types/Response";
import { devMatchTimer } from "../../util/Util";
import { Snackbar } from "@mui/material";

import axios from "axios";
import CreateSeasonForm from "./CreateSeasonForm";
import SeasonTimerLobby from "./SeasonTimerLobby"; // ✅ 실시간 타이머 컴포넌트 추가

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

interface Season {
  id: number;
  name: string;
  started: boolean;
  createdAt: string;
  finishedAt: string;
}

export default function SeasonLobby() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const { joinedSeasonId, setuserId, setJoinedSeasonId } = useSquadStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
          fetchSeasons();   // refresh all matches in the lobby
          clearInterval(interval);          
        }
      } catch (err) {
        console.error("❌ Failed to poll season info:", err);
      }
    }, devMatchTimer);

    return () => clearInterval(interval);
  }, [joinedSeasonId, setJoinedSeasonId]);

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {joinedSeasonId}
      </Typography>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        League List
      </Typography>

      <Box mb={3}>
        <CreateSeasonForm onCreated={fetchSeasons} />
      </Box>

      <Paper elevation={3}>
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
                secondaryTypographyProps={{ component: "div" }} // ✅ 핵심 해결
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/season/${season.id}`}
                >
                  Enter
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
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
