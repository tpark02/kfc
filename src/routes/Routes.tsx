import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Players } from "../components/players/Players";
import PlayerSpec from "../components/players/PlayerSpec";
import Season from "../components/seasonSimulator/Season";
import SeasonPage from "../components/seasonSimulator/SeasonPage";
import LeagueSimulator from "../components/leagueSimulator/LeagueSimulator";
import LoginForm from "../components/login/LoginForm";
import Register from "../components/register/RegisterPage";
import PrivateRoute from "../components/PrivateRoutes";
import Layout from "../Layout";
import SignUpForm from "../components/login/SignupForm";
import Squad from "../components/teambuilder/Squad";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 로그인은 레이아웃 없이 */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      {/* 공통 레이아웃 적용 */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Players />
            </PrivateRoute>
          }
        />
        <Route
          path="/player/:id"
          element={
            <PrivateRoute>
              <PlayerSpec />
            </PrivateRoute>
          }
        />
        <Route
          path="/squad"
          element={
            <PrivateRoute>
              <Squad />
            </PrivateRoute>
          }
        />
        <Route
          path="/league"
          element={
            <PrivateRoute>
              <LeagueSimulator />
            </PrivateRoute>
          }
        />
        <Route
          path="/tournament"
          element={
            <PrivateRoute>
              <Season />
            </PrivateRoute>
          }
        />
        <Route
          path="/season/:seasonId"
          element={
            <PrivateRoute>
              <SeasonPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
      </Route>

      {/* 예외 처리 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
