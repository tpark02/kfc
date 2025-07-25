import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSquadSetters } from "../../hooks/useSquadSetter";
import { AuthRequest, AuthResponse } from "../../types/auth";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import axiosInstance from "../../app/axiosInstance";
import { useSnackbarStore } from "../../store/userSnackBarStore";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {
    setMyCoin,
    setMyUserId,
    setMyFormation,
    setMyTeamName,
    setMyLogoImgUrl,
    setMyLogoId,
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
  } = useSquadSetters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/login", form);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("userId", String(response.data.userId));

      setError("");

      const userId = await fetchAndStoreUserInfo();

      if (!userId) {
        throw new Error("Failed to load user info");
      }

      navigate("/squad");
    } catch (err: any) {
      useSnackbarStore
        .getState()
        .setSnackbar("Please check id and password", false);
      const msg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.message || "Unknown error";
      setError(msg);
    }
  };

  const fetchAndStoreUserInfo = async (): Promise<number | null> => {
    useLoadingSpinnerStore.getState().setIsLoading(true);

    try {
      const res = await axiosInstance.get("/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { userId, myClub, myFormation, myPlayers, myCoin } = res.data;

      setMyUserId(userId);
      setMyFormation(myFormation.name);
      setMySelectedPlayers(myPlayers);
      setMyCoin(myCoin);

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
    } finally {
      useLoadingSpinnerStore.getState().setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        navigate("/squad");
      }, 2000); // ⏱️ 2 seconds

      return () => clearTimeout(timer); // cleanup
    }
  }, [token, navigate]);

  if (token) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{ whiteSpace: "pre-line", textAlign: "center" }}
        >
          {"Already logged in..."}
        </Typography>{" "}
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
            width: {
              xs: "90vw",
              md: "40vw",
            },
            height: "60vh",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: {
                xs: "80vw",
                md: "20vw",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", color: "#fff" }}
            >
              Log in
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
              Log in
            </Button>
            <Typography sx={{ mt: 2, color: "#ccc", textAlign: "center" }}>
              Don't have an account?{" "}
              <MuiLink
                component={RouterLink}
                to="/signup"
                sx={{ color: "#ffc002" }}
              >
                Sign up
              </MuiLink>
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
