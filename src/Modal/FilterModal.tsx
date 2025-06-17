// ⚛️ 리액트 기본 훅
import React, { useEffect, useState } from "react";

// 🗂️ 타입 정의
import { PlayerPos } from "../types/playerPosition";
import { League } from "../types/league";
import { Team } from "../types/team";
import { Country } from "../types/country";

// 🧩 내부 컴포넌트
import PlayerPosModal from "./playerPosModal";
import LeagueModal from "./leagueModal";
import TeamModal from "./teamModal";
import NationModal from "./nationModal";

// 🎨 MUI 아이콘 & 컴포넌트
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";

// 🔧 스타일 (CSS)
import "./Modal.css";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (selectedCountries: Country[]) => void;
  onSelectTeam: (selectedTeams: Team[]) => void;
  onSelectLeague: (selectedLeagues: League[]) => void;
  onSelectPlayerPos: (selectedPlayerPositions: PlayerPos[]) => void;
  prevList: Country[];
  prevTeamList: Team[];
  prevLeagueList: League[];
  prevplayerPositionList: PlayerPos[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  onSelectTeam,
  onSelectLeague,
  onSelectPlayerPos,
  prevList,
  prevTeamList,
  prevLeagueList,
  prevplayerPositionList,
}) => {
  const [isNationModalOpen, setNationModalOpen] = useState(true);
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const [isLeagueModalOpen, setLeagueModalOpen] = useState(false);
  const [isPlayerPositionModalOpen, setPlayerPositionModalOpen] =
    useState(false);
  const prevIsOpen = React.useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen && !prevIsOpen.current) {
      setNationModalOpen(true);
      setTeamModalOpen(false);
      setLeagueModalOpen(false);
      setPlayerPositionModalOpen(false);

      document.addEventListener("keydown", handleKeyDown);
    }

    prevIsOpen.current = isOpen;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 400,
        height: "100vh",
        backgroundColor: "#1a1a1a",
        padding: 8,
        zIndex: 1300,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-4px 0 12px rgba(0,0,0,0.5)",
      }}
    >
      {/* ✅ 상단 우측 닫기 버튼 */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white", // 아이콘 색상
          outline: "none", // 🔑 outline 제거
          boxShadow: "none", // 🔑 클릭 시 생길 수 있는 포커스 제거
          "&:hover": {
            backgroundColor: "transparent", // 🔑 배경 유지
            outline: "none",
            boxShadow: "none",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Button
          className="filter-button"
          variant="black"
          onClick={() => {
            setPlayerPositionModalOpen(false);
            setLeagueModalOpen(false);
            setTeamModalOpen(false);
            setNationModalOpen(true);
          }}
        >
          Country
        </Button>
        <Button
          className="filter-button"
          variant="black"
          onClick={() => {
            setTeamModalOpen(true);
            setLeagueModalOpen(false);
            setPlayerPositionModalOpen(false);
            setNationModalOpen(false);
          }}
        >
          Club
        </Button>
        <Button
          className="filter-button"
          variant="black"
          onClick={() => {
            setLeagueModalOpen(true);
            setTeamModalOpen(false);
            setPlayerPositionModalOpen(false);
            setNationModalOpen(false);
          }}
        >
          League
        </Button>
        <Button
          className="filter-button"
          variant="black"
          onClick={() => {
            setPlayerPositionModalOpen(true);
            setTeamModalOpen(false);
            setLeagueModalOpen(false);
            setNationModalOpen(false);
          }}
        >
          Position
        </Button>
      </div>

      <NationModal
        isOpen={isNationModalOpen}
        onClose={() => setNationModalOpen(false)}
        onSelectCountry={onSelectCountry}
        prevList={prevList}
      />
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        onSelectTeam={onSelectTeam}
        prevList={prevTeamList}
      />
      <LeagueModal
        isOpen={isLeagueModalOpen}
        onClose={() => setLeagueModalOpen(false)}
        onSelectLeague={onSelectLeague}
        prevList={prevLeagueList}
      />
      <PlayerPosModal
        isOpen={isPlayerPositionModalOpen}
        onClose={() => setPlayerPositionModalOpen(false)}
        onSelectPlayerPos={onSelectPlayerPos}
        prevList={prevplayerPositionList}
      />
    </Box>
  );
};

export default FilterModal;
