import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Players } from "./components/players/Players";
import PlayerSpec from "./components/players/PlayerSpec";
import Season from "./components/seasonSimulator/Season";
import SeasonPage from "./components/seasonSimulator/SeasonPage";
import LeagueSimulator from "./components/leagueSimulator/LeagueSimulator";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoutes";
import Squad from "./components/teambuilder/Squad";
import Register from "./components/register/Register";
import "./App.css";
import "./style/Player.css";

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <NavBar />
        <Routes>
          {/* ✅ 로그인 페이지는 누구나 접근 가능 */}
          <Route path="/login" element={<LoginForm />} />

          {/* ✅ 보호된 라우트들 */}
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
          {/* ✅ 그 외는 로그인 페이지로 리디렉션 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
