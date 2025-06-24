# ⚽ KFC - Kickoff Football Club Simulator

KFC is a full-stack football club simulation web application. It allows users to build squads, simulate leagues, manage players and formations, and view team stats in a game-like experience inspired by modern football manager platforms.

---

## 🧠 Project Overview

Kickoff Football Club Simulator (KFC) is a football management simulation platform built with a professional service-oriented mindset.

While the theme is football, the true goal is to demonstrate capabilities in **full-stack development**, including RESTful API design, frontend architecture, user authentication, data modeling, dynamic UI rendering, and **efficient large-scale data processing**.

---

## 🛠️ Tech Stack

| Layer        | Stack |
|--------------|-------|
| Frontend     | React + TypeScript + Zustand + Material UI (MUI) |
| Backend      | Spring Boot 3, Java 17, JPA/Hibernate, RESTful APIs |
| Database     | H2 / MariaDB |
| Deployment   | Docker + VPS (Contabo) |

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

## 🧱 Key Features

### ⚽ League Simulation
- Simulates matches between clubs
- Generates match results and scorers
- Designed to be expandable for various simulation rules

### 👤 My Club Management
- Users build their own teams by signing players
- Formation builder UI allows flexible squad setup
- Team strength (OVR) is calculated from squad attributes

### 🔐 Auth System
- JWT-based signup, login, and route protection
- Clubs and squads are tied to authenticated users

---

## 📌 Technical Highlights

- **Layered Architecture**: Clean separation between Controller → Service → Repository  
- **State Management**: Zustand-powered modular logic with persistence  
- **Dynamic UI**: Formation-based 11-position rendering grid  
- **Scalable APIs**: Designed for decoupling and maintainability  
- **Large-Scale Data Processing**:  
  - Handles thousands of player records and multiple user-owned clubs  
  - Supports bulk updates and multi-match simulations  
  - Optimized database access using pagination, filtering, and indexing  

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
