import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { countryData, getImgByCountryName } from "../../data/countryData";
import axiosInstance from "../../axiosInstance";
import { fetchRandomSquad } from "../../api/squad";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { getStatDisplay } from "../../style/playerStyle";

const Register: React.FC = () => {
  const {
    myUserId,
    myselectedPlayers,
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyUserId,
  } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
      myselectedPlayers: s.mySelectedPlayers,
      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyClubs: s.setMyClubs,
      setMyUserId: s.setMyUserId,
    }),
    shallow
  );
  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");

  const [logos, setLogos] = useState<{ id: number; logoImg: string }[]>([]);
  const [selectedLogoId, setSelectedLogoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await axiosInstance.get("/api/logos");
        setLogos(res.data);
      } catch (err) {
        console.error("Failed to fetch logos:", err);
      }
    };
    fetchLogos();
  }, []);

  const loadRandomSquad = () => {
    setLoading(true);
    fetchRandomSquad({
      name: "442",
      countries: [],
      leagues: [],
      clubs: [],
      userId: myUserId,
    })
      .then((data) => {
        setMySelectedPlayers(data.myPlayerList);
        setMyTeamOvr(data.myTeamOvr);
        setMyTeamSquadValue(data.myTeamSquadValue);
        setMyTeamAge(data.myTeamAge);
        setMyTeamPace(data.myTeamPace);
        setMyTeamDefense(data.myTeamDef);
        setMyTeamAttack(data.myTeamAtk);
        setMyTeamClubCohesion(data.myTeamClubCohesion);
        setMyTeamStamina(data.myTeamStamina);
      })
      .catch((err) => {
        setSnackbarMessage(err.response?.data || "에러 발생");
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="app-container">
      <div
        style={{
          padding: "2rem",
          color: "#fff",
          backgroundColor: "var(--background-color)",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register Your Team
        </Typography>

        {/* Team Name */}
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            style={{
              marginBottom: "1rem",
              display: "block",
              color: "#fff",
              borderBottom: "1px solid #888",
            }}
          />
        </Box>

        {/* Nationality Select */}
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            displayEmpty
            style={{
              marginBottom: "1rem",
              minWidth: 240,
              color: "#fff",
              border: "1px solid #888",
              backgroundColor: "#1e1e1e",
            }}
            inputProps={{ style: { color: "#fff" } }}
          >
            <MenuItem value="" disabled>
              Select Nationality
            </MenuItem>
            {countryData.map((country, idx) => (
              <MenuItem
                key={country.code}
                value={country.name}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                {getImgByCountryName(country.name, idx, 24, 16)}
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {/* Formation Select */}
        {/* <Select
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(e.target.value)}
        displayEmpty
        style={{
          marginBottom: "1rem",
          minWidth: 240,
          color: "#fff",
          border: "1px solid #888",
          backgroundColor: "#1e1e1e",
        }}
        inputProps={{ style: { color: "#fff" } }}
      >
        <MenuItem value="" disabled>
          Select Formation
        </MenuItem>
        {Object.keys(formations).map((formation) => (
          <MenuItem key={formation} value={formation}>
            {formation}
          </MenuItem>
        ))}
      </Select> */}
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Team Logo Picker */}
          <Box
            sx={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Choose a Team Logo
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
              {logos.map((logo) => (
                <Grid item key={logo.id}>
                  <img
                    src={logo.logoImg}
                    alt={`logo-${logo.id}`}
                    width={67}
                    height={80}
                    onClick={() => setSelectedLogoId(logo.id)}
                    style={{
                      border:
                        selectedLogoId === logo.id
                          ? "2px solid #90caf9"
                          : "2px solid transparent",
                      borderRadius: 8,
                      cursor: "pointer",
                      backgroundColor: "#333",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Generate Random Roster */}

          {/* Player List */}
          <Box
            sx={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => loadRandomSquad()}
              disabled={loading}
            >
              Generate Team
            </Button>
            {myselectedPlayers.length > 0 && (
              <>
                {/* <Typography variant="h6" style={{ marginTop: "2rem" }}>
              Team Roster
            </Typography> */}
                <Grid container style={{ marginTop: "1rem" }}>
                  {myselectedPlayers.map((player, idx) => {
                    if (!player || !player.name) return null; // Skip if player data is missing
                    if (player.name === "dummy") return null; // Skip placeholder player
                    return (
                      <Grid item key={idx}>
                        <Card
                          sx={{
                            backgroundColor: "var(--card-background)",
                            color: "var(--card-text)",
                            boxShadow: "none",
                            outline: "1px solid #555",
                          }}
                        >
                          <CardContent
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <div className="player-name">{player.name}</div>
                            <div className="player-cell">{player.age}</div>
                            <div className="player-cell">{player.pos}</div>
                            <div className="player-cell">
                              {getStatDisplay("OVR", player.ovr)}
                            </div>
                            <div className="player-cell">
                              {getStatDisplay("PAC", player.pac)}
                            </div>
                            <div className="player-cell">
                              {getStatDisplay("SHO", player.sho)}
                            </div>
                            <div className="player-cell">
                              {getStatDisplay("PAS", player.pas)}
                            </div>
                            <div className="player-cell">
                              {getStatDisplay("DRI", player.dri)}
                            </div>
                            <div className="player-cell">
                              {getStatDisplay("DEF", player.def)}
                            </div>
                            <div className="player-cell">
                              {getStatDisplay("PHY", player.phy)}
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
              {typeof snackbarMessage === "string"
                ? snackbarMessage
                : JSON.stringify(snackbarMessage)}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Register;
