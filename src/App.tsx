import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppRoutes from "./routes/Routes";
import GlobalSnackbar from "./components/GlobarSnackbar";

import "./App.css";
import "./style/Player.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <AppRoutes />
      </Router>
      <GlobalSnackbar /> {/* 👈 Place it here */}
    </DndProvider>
  );
}

export default App;
