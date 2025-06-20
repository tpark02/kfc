import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Players } from "../features/players/Players"
import PlayerSpec from "../features/players/PlayerSpec";
import Season from "../features/seasonSimulator/Season";
import SeasonPage from "../features/seasonSimulator/SeasonPage";
import LeagueSimulator from "../features/league/LeagueSimulator"
import LoginForm from "../features/auth/LoginForm";
import Register from "../features/register/RegisterPage";
import PrivateRoute from "../components/PrivateRoutes";
import Layout from "../app/Layout";
import SignUpForm from "../features/auth/SignupForm";
import Squad from "../features/squad/Squad";
import MyPlayerSpec from "../features/players/MyPlayerSpec";

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
          path="/myPlayer/:id"
          element={
            <PrivateRoute>
              <MyPlayerSpec />
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
