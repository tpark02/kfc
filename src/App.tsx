import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Players } from "./components/players/Players";
// 타입
import PlayerSpec from "./components/players/PlayerSpec";
import Squad from "./components/teambuilder/Squad"; // 💡 make sure the path is correct
import NavBar from "./components/NavBar"; // 💡 make sure the path is correct

// 스타일
import "./App.css";
import "./style/Player.css";
import LeagueSimulator from "./components/leagueSimulator/LeagueSimulator";
import SeasonPage from "./components/seasonsimulator/SeasonPage";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Players />} />
            <Route
              path="/player/:id"
              element={<PlayerSpec />} // Example: Pass the first player as a prop
            />
            <Route path="/squad" element={<Squad />} />
            <Route path="/tournament" element={<LeagueSimulator />} />
            <Route path="/season/:seasonId" element={<SeasonPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;
