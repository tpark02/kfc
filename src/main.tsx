import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./style/theme.ts"; // 네가 만든 theme 파일
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ThemeProvider>
  </StrictMode>
);
