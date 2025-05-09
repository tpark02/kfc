import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Players } from "./Components/Players/Players"; // 💡 make sure the path is correct

// 타입
import PlayerSpec from "./Components/Players/PlayerSpec";
import Squad from "./Components/TeamBuilder/Squad"; // 💡 make sure the path is correct
import NavBar from "./Components/NavBar"; // 💡 make sure the path is correct

// 스타일
import "./App.css";
import "./style/Player.css";
import LeagueSimulator from "./Components/LeagueSimulator/LeagueSimulator";

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
            <Route path="/league" element={<LeagueSimulator />} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;
