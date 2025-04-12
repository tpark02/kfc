import React from "react";
import "./Modal.css";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { CountryList } from "../types/Country";
import { Team } from "../types/Team";
import NationModal from "./NationModal";
import TeamModal from "./TeamModal";
import AddIcon from "@mui/icons-material/Add";
import { League } from "../types/League";
import LeagueModal from "./LeagueModal";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (selectedCountries: CountryList) => void;
  onSelectTeam: (selectedTeams: Team[]) => void;
  onSelectLeague: (selectedLeagues: League[]) => void;
  prevList: CountryList;
  prevTeamList: Team[];
  prevLeagueList: League[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  onSelectTeam,
  onSelectLeague,
  prevList,
  prevTeamList,
  prevLeagueList,
}) => {
  const [isNationModalOpen, setNationModalOpen] = useState(false);
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const [isLeagueModalOpen, setLeagueModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isNationModalOpen) return;
        if (isTeamModalOpen) return;
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isNationModalOpen, isTeamModalOpen, isLeagueModalOpen]);

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
        <Button variant="contained" startIcon={<AddIcon />}>
          Position
        </Button>
        <Button variant="contained" onClick={onClose}>
          닫기
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
      </div>
    </div>
  );
};

export default FilterModal;
