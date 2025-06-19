import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { shallow } from "zustand/shallow";

import axiosInstance from "../../axiosInstance";
import { useSquadStore } from "../../store/useSquadStore";
import { AuthRequest, AuthResponse } from "../../types/auth";
import ThemeTest from "./ThemeTest";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
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
    setMyFormation,
    setMyTeamName,
    setMyLogoImgUrl,
    setMyLogoId,
  } = useSquadStore(
    (s) => ({
      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyUserId: s.setMyUserId,
      setMyFormation: s.setMyFormation,
      setMyTeamName: s.setMyTeamName,
      setMyLogoImgUrl: s.setMyLogoImgUrl,
      setMyLogoId: s.setMyLogoId,
    }),
    shallow
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/login",
        form
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", String(response.data.userId));
      setError("");

      const userId = await fetchAndStoreUserInfo();
      if (!userId) throw new Error("Failed to load user info");

      navigate("/squad");
    } catch (err: any) {
      const msg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.message || "Unknown error";
      setError(msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchAndStoreUserInfo = async (): Promise<number | null> => {
    try {
      const res = await axiosInstance.get("/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { userId, myClub, myFormation, myPlayers } = res.data;

      setMyUserId(userId);
      setMyFormation(myFormation.name);
      setMySelectedPlayers(myPlayers);

      if (myClub) {
        setMyTeamOvr(myClub.ovr);
        setMyTeamSquadValue(myClub.price);
        setMyTeamAge(myClub.age);
        setMyTeamPace(myClub.pace);
        setMyTeamDefense(myClub.defense);
        setMyTeamAttack(myClub.attack);
        setMyTeamClubCohesion(myClub.clubCohesion);
        setMyTeamStamina(myClub.stamina);
        setMyTeamName(myClub.name);
        setMyLogoImgUrl(myClub.teamLogoImg);
        setMyFormation(myClub.formationName);
        setMyLogoId(myClub.teamLogoId);
      }

      return userId;
    } catch (e) {
      console.error("Failed to fetch user info:", e);
      return null;
    }
  };

  if (token) {
    return (
      <Box sx={{ maxWidth: 300, mx: "auto", mt: 8 }}>
        <Typography>Already logged in</Typography>
        <Button
          fullWidth
          onClick={handleLogout}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "40vw",
            height: "60vh",
            // backgroundColor: "#1e1e1e",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20vw",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", color: "#fff" }}
            >
              Login
            </Typography>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              autoComplete="username"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              autoComplete="current-password"
            />
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Typography sx={{ mt: 2, color: "#ccc", textAlign: "center" }}>
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "#ffc002" }}>
                Sign up
              </a>
            </Typography>
            {error && (
              <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
  // return <ThemeTest />;
};

export default LoginForm;
