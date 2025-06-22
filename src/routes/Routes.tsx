import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Players } from "../features/players/Players";
import PlayerSpec from "../features/players/PlayerSpec";
import LeagueSimulator from "../features/league/LeagueSimulator";
import LoginForm from "../features/auth/LoginForm";
import Register from "../features/register/RegisterPage";
import SignUpForm from "../features/auth/SignupForm";
import Squad from "../features/squad/Squad";
import MyPlayerSpec from "../features/players/MyPlayerSpec";
import LandingPage from "../features/landing/LandingPage";
import PublicLayout from "../app/PublicLayout"
import PrivateLayout from "../app/PrivateLayout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public: no layout */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/register" element={<Register />} />

      {/* Public routes with public layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Private routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/players" element={<Players />} />
        <Route path="/player/:id" element={<PlayerSpec />} />
        <Route path="/myPlayer/:id" element={<MyPlayerSpec />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/league" element={<LeagueSimulator />} />        
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
