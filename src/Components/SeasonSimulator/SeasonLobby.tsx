import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
}

export default function SeasonLobby() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const { joinedSeasonId } = useSquadStore();

  const fetchSeasons = async () => {
    const res = await axios.get("http://localhost:8080/season/all");
    const data: Season[] = res.data;
    setSeasons(data);
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

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
                    started={season.started}
                  />
                }
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
    </Box>
  );
}
