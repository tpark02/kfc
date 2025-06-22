# ⚽ KFC - Kickoff Football Club Simulator

KFC is a full-stack football club simulation web application. It allows users to build squads, simulate leagues, manage players and formations, and view team stats in a game-like experience inspired by modern football manager platforms.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Spring Boot (Java) — not included in this repo
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tools**: Vite
- **Styling**: Tailwind CSS + custom CSS modules

---

## 📦 Folder Structure

```
src/
├── Components/        # Reusable UI components (Navbar, Footer, Dialogs)
├── Modal/             # Custom modal components for filters & selection
├── Util/              # Utility functions for logic & state updates
├── api/               # Axios-based API integrations
├── app/               # Layout components and Axios config
├── data/              # Static data like countries, formations
├── hooks/             # Custom hooks (Zustand, API loading)
├── routes/            # Application route definitions
├── shared/            # Global context components (Snackbar, Loading)
├── store/             # Zustand stores for state management
├── style/             # CSS and style definitions
├── types/             # Global TypeScript type declarations
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tpark02/kfc.git
cd kfc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App (Frontend)

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

> ℹ️ Backend Spring Boot API must be running separately. Ensure CORS is configured properly.

---

## 🌟 Features

- 💼 Squad builder with draggable player positions
- 🎮 League and match simulations
- 🧠 AI-based squad generation
- 📊 Player stats visualization
- 🛠️ Formation editor and modal-based filters
- 🔐 Protected routes with login/signup flow
- 💬 Global feedback (Snackbar, ConfirmDialog, Loading Spinner)

---

## 🔌 Backend Integration

The frontend consumes a Spring Boot REST API (not included here). You’ll need:

- Java 17+
- Spring Boot project with `/api/*` endpoints
- MySQL or H2 for persistence
- CORS enabled for `localhost:5173`

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/767db428-4d7a-49d4-bf39-378dda088f74)


---

## 📄 License

MIT License © 2025 Daniel Park ([@tpark02](https://github.com/tpark02))

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.
