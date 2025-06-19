import { BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppRoutes from "./routes/Routes";
import GlobalSnackbar from "./components/global/GlobarSnackbar";
import GlobalConfirmDialog from "./components/global/GlobalConfirmDialog";
import GlobalLoadingSpinner from "./components/global/GlobalLoadingSpinner";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalSnackbar />
      <GlobalConfirmDialog />      
      <GlobalLoadingSpinner />
      <Router>
        <AppRoutes />
      </Router>
    </DndProvider>
  );
}

export default App;
