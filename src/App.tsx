import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Players } from "./components/players/Players";
import Season from "./components/seasonsimulator/Season";
import SeasonPage from "./components/seasonsimulator/SeasonPage";
import LeagueSimulator from "./components/leagueSimulator/LeagueSimulator";

// 타입
import PlayerSpec from "./components/players/PlayerSpec";
import Squad from "./components/teambuilder/Squad"; // 💡 make sure the path is correct
import NavBar from "./components/NavBar"; // 💡 make sure the path is correct

// 스타일
import "./App.css";
import "./style/Player.css";

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
            <Route path="league" element={<LeagueSimulator/>}/>
            <Route path="/tournament" element={<Season />} />
            <Route path="/season/:seasonId" element={<SeasonPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;
