import React from "react";
import "./Modal.css";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NationModal from "./NationModal";
import { CountryList } from "../types/Country";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (selectedCountries: CountryList) => void;
  prevList: CountryList; // 👈 기존 선택된 목록 받기
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  prevList,
}) => {
  const [isNationModalOpen, setNationModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isNationModalOpen) return;
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isNationModalOpen]);

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
        <Button variant="contained" startIcon={<AddIcon />}>
          Club
        </Button>
        <Button variant="contained" startIcon={<AddIcon />}>
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
          prevList={prevList} // 👈 추가
        ></NationModal>
      </div>
    </div>
  );
};

export default FilterModal;
