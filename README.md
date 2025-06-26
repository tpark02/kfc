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


# ⚽ KFC - 킥오프 풋볼 클럽 시뮬레이터

**KFC**는 풀스택으로 구현된 축구 클럽 시뮬레이션 웹 애플리케이션입니다. 사용자는 스쿼드를 구성하고, 리그를 시뮬레이션하며, 선수와 포메이션을 관리하고, 실제 게임과 같은 경험으로 팀 통계를 확인할 수 있습니다.

---

## 🧠 프로젝트 개요

**KFC (Kickoff Football Club Simulator)**는 축구를 테마로 한 매니지먼트 시뮬레이션 플랫폼으로, **전문적인 서비스 지향 아키텍처와 풀스택 개발 능력**을 보여주기 위한 목적으로 제작되었습니다.

축구를 기반으로 하지만, 진정한 목표는 다음과 같은 기술 역량을 증명하는 것입니다:

- **풀스택 개발 전반**
- RESTful API 설계
- 프론트엔드 아키텍처 구성
- 사용자 인증 시스템
- 데이터 모델링 및 대규모 데이터 처리
- 동적인 UI 렌더링

---

## 🛠️ 기술 스택

| 계층         | 기술 스택 |
|--------------|------------|
| 프론트엔드   | React + TypeScript + Zustand + Material UI (MUI) |
| 백엔드       | Spring Boot 3, Java 17, JPA/Hibernate, RESTful API |
| 데이터베이스 | H2 / MariaDB |
| 배포         | Docker + VPS (Contabo) |

---

## 📦 폴더 구조

```
src/
├── Components/        # 재사용 가능한 UI 컴포넌트 (네비게이션바, 푸터 등)
├── Modal/             # 필터 및 선택 관련 모달 컴포넌트
├── Util/              # 유틸리티 함수 (로직 및 상태 처리)
├── api/               # Axios 기반 API 연동
├── app/               # 레이아웃 및 Axios 설정
├── data/              # 국가, 포메이션 등 정적 데이터
├── hooks/             # 커스텀 훅 (Zustand, API 로딩 등)
├── routes/            # 라우팅 정의
├── shared/            # 글로벌 컨텍스트 컴포넌트 (로딩, 스낵바)
├── store/             # Zustand 기반 상태 저장소
├── style/             # 스타일 및 CSS 정의
├── types/             # 전역 타입스크립트 타입 선언
```

---

## 🚀 시작하기

### 1. 레포지토리 클론

```bash
git clone https://github.com/tpark02/kfc.git
cd kfc
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 앱 실행 (프론트엔드)

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 로 접속하세요.

> ℹ️ 백엔드(Spring Boot)는 별도로 실행되어야 하며, CORS 설정이 되어 있어야 합니다.

---

## 🧱 핵심 기능

### ⚽ 리그 시뮬레이션
- 클럽 간 경기 시뮬레이션
- 경기 결과 및 득점자 자동 생성
- 다양한 시뮬레이션 규칙 적용을 위한 확장성 고려

### 👤 내 클럽 관리
- 선수를 영입하여 나만의 팀 구성
- 포메이션 빌더 UI를 통한 유연한 스쿼드 구성
- 선수 능력치를 기반으로 팀 전력(OVR) 계산

### 🔐 인증 시스템
- JWT 기반 회원가입, 로그인, 라우트 보호
- 클럽 및 스쿼드는 로그인된 사용자와 연동

---

## 📌 기술적 특징

- **계층형 아키텍처**: Controller → Service → Repository 분리
- **상태 관리**: Zustand 기반 모듈화 및 영속성 유지
- **동적 UI**: 포지션 기반 11인 구성 그리드 렌더링
- **확장 가능한 API**: 유지보수와 확장을 고려한 구조
- **대규모 데이터 처리 능력**:  
  - 수천 명의 선수 데이터 및 다수의 사용자 클럽 지원  
  - 일괄 업데이트 및 다중 경기 시뮬레이션 처리  
  - 페이지네이션, 필터링, 인덱싱을 통한 DB 최적화

---

## 🔌 백엔드 연동

프론트엔드는 별도로 실행되는 Spring Boot 기반 REST API를 소비합니다.

필요한 사항:

- Java 17 이상
- `/api/*` 엔드포인트를 포함한 Spring Boot 프로젝트
- MySQL 또는 H2 DB
- `localhost:5173`에 대한 CORS 허용

---

## 📸 스크린샷

![image](https://github.com/user-attachments/assets/767db428-4d7a-49d4-bf39-378dda088f74)

---

## 📄 라이선스

MIT License © 2025 Daniel Park ([@tpark02](https://github.com/tpark02))

---

## 🤝 기여하기

Pull Request는 언제든지 환영합니다. 주요 변경 사항의 경우 먼저 이슈를 열어 논의해주세요.


## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.
