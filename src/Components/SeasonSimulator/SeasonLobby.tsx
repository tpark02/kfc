import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateSeasonForm from "./CreateSeasonForm";

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
}

export default function SeasonLobby() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  const fetchSeasons = async () => {
    const res = await axios.get("http://localhost:8080/season/all");
    console.log("Season response:", res.data);
    setSeasons(res.data);
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const { joinedSeasonId } = useSquadStore();

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
              <ListItemText primary={season.name} />
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
