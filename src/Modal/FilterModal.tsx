import "./Modal.css";
import React from "react";
import NationModal from "./NationModal";
import TeamModal from "./TeamModal";
import AddIcon from "@mui/icons-material/Add";
import LeagueModal from "./LeagueModal";
import PlayerPosModal from "./PlayerPosModal";
import { League } from "../types/League";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { CountryList } from "../types/Country";
import { Team } from "../types/Team";
import { PlayerPosList } from "../types/PlayerPosition";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (selectedCountries: CountryList) => void;
  onSelectTeam: (selectedTeams: Team[]) => void;
  onSelectLeague: (selectedLeagues: League[]) => void;
  onSelectPlayerPos: (selectedPlayerPositions: PlayerPosList) => void;
  prevList: CountryList;
  prevTeamList: Team[];
  prevLeagueList: League[];
  prevplayerPositionList: PlayerPosList;
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
  const [isNationModalOpen, setNationModalOpen] = useState(false);
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const [isLeagueModalOpen, setLeagueModalOpen] = useState(false);
  const [isPlayerPositionModalOpen, setPlayerPositionModalOpen] =
    useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isNationModalOpen) return;
        if (isTeamModalOpen) return;
        if (isLeagueModalOpen) return;
        if (isPlayerPositionModalOpen) return;
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isOpen,
    onClose,
    isNationModalOpen,
    isTeamModalOpen,
    isLeagueModalOpen,
    isPlayerPositionModalOpen,
  ]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content large">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setNationModalOpen(true);
          }}
        >
          Country
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setTeamModalOpen(true);
          }}
        >
          Club
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setLeagueModalOpen(true);
          }}
        >
          League
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setPlayerPositionModalOpen(true);
          }}
        >
          Position
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 1 }}
          onClick={onClose}
        >
          close
        </Button>
        <NationModal
          isOpen={isNationModalOpen}
          onClose={() => setNationModalOpen(false)}
          onSelectCountry={onSelectCountry}
          prevList={prevList}
        ></NationModal>
        <TeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setTeamModalOpen(false)}
          onSelectTeam={onSelectTeam}
          prevList={prevTeamList}
        ></TeamModal>
        <LeagueModal
          isOpen={isLeagueModalOpen}
          onClose={() => setLeagueModalOpen(false)}
          onSelectLeague={onSelectLeague}
          prevList={prevLeagueList}
        ></LeagueModal>
        <PlayerPosModal
          isOpen={isPlayerPositionModalOpen}
          onClose={() => setPlayerPositionModalOpen(false)}
          onSelectPlayerPos={onSelectPlayerPos}
          prevList={prevplayerPositionList}
        ></PlayerPosModal>
      </div>
    </div>
  );
};

export default FilterModal;
