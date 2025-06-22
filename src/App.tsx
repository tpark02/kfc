import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HashRouter } from "react-router-dom";

import AppRoutes from "./routes/Routes";
import GlobalSnackbar from "./shared/GlobalSnackbar"
import GlobalConfirmDialog from "./shared/GlobalConfirmDialog";
import GlobalLoadingSpinner from "./shared/GlobalLoadingSpinner";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalSnackbar />
      <GlobalConfirmDialog />      
      <GlobalLoadingSpinner />
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </DndProvider>
  );
}

export default App;
