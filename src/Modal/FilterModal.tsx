import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import NationModal from "./NationModal";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
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
        ></NationModal>
      </div>
    </div>
  );
};

export default FilterModal;
