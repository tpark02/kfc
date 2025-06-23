import { useState, useEffect } from "react";
import axiosInstance from "../../app/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { Box, Typography, Button, TextField } from "@mui/material";

interface SignUpFormData {
  username: string;
  password: string;
  email: string;
}

const SignUpForm: React.FC = () => {
  const { setMyUserId } = useSquadStore(
    (s) => ({
      setMyUserId: s.setMyUserId,
    }),
    shallow
  );

  const [form, setForm] = useState<SignUpFormData>({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { username, password, email } = form;

    if (!username || !password || !email) {
      setError("❌ Please fill in all fields.");
      setSuccess("");
      return;
    }

    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    if (!usernameRegex.test(username)) {
      setError(
        "❌ Username must contain both letters and numbers only (no special characters)."
      );
      setSuccess("");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    if (!passwordRegex.test(password)) {
      setError(
        "❌ Password must include at least one uppercase letter, one number, and one special character (!@#$%^&*)."
      );
      setSuccess("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("❌ Please enter a valid email address.");
      setSuccess("");
      return;
    }

    console.log("Input password : ", password);
    console.log("🔍 baseURL:", axiosInstance.defaults.baseURL);
    console.log("🔍 VITE_API_URL:", import.meta.env.VITE_API_URL);
    try {
      useLoadingSpinnerStore.getState().setIsLoading(true);
      const res = await axiosInstance.post("/signup", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      console.log("🆕 Signup successful:", res.data);
      setMyUserId(res.data.userId);
      setSuccess("Signup completed! Redirecting to club setup page...");
      setError("");
    } catch (err: any) {
      const msg =
        err.response?.data || err.message || "An unknown error occurred.";
      if (msg.includes("already exists")) {
        setError("❌ This username already exists. Please choose another.");
      } else {
        setError(msg);
      }
      setSuccess("");
    } finally {
      console.log("✅ finally block executed");

      useLoadingSpinnerStore.getState().setIsLoading(false);
    }
  };

  // Redirect to /register after 1.5 seconds on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/register"), 1500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "40vw",
          height: "60vh",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <Box sx={{ maxWidth: 300, margin: "auto" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", color: "#fff" }}
          >
            Sign Up
          </Typography>
          <TextField
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            sx={{ width: "100%", margin: "16px auto" }}
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            sx={{ width: "100%", margin: "16px auto" }}
          />
          <TextField
            type="email"
            name="email"
            placeholder="example@domain.com"
            value={form.email}
            onChange={handleChange}
            sx={{ width: "100%", margin: "16px auto" }}
          />
          <Button
            onClick={handleSignUp}
            sx={{ width: "100%", padding: "10px", marginTop: "16px" }}
          >
            Sign Up
          </Button>
          {error && (
            <Typography variant="body1" sx={{ color: "red", marginTop: 3 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body1" sx={{ color: "green", marginTop: 3 }}>
              {success}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
