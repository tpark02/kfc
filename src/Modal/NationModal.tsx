import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Box, Typography, Button, TextField } from "@mui/material";
import { countries } from "../data/countries";
import { CountryList } from "../types/Country";

interface NationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countries: CountryList) => void; // 배열 전달
  prevList: CountryList; // 👈 기존 선택된 목록 받기
}

const NationModal: React.FC<NationModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop secondary">
      <div className="modal-content small">
        {/* ✅ 검색 입력창 */}
        <TextField
          fullWidth
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              color: "white", // ✅ 입력 텍스트 색
              "& input::placeholder": {
                color: "gray", // ✅ placeholder 색
                opacity: 1, // ✅ 일부 브라우저에서 회색 제대로 보이게
              },
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
            },
          }}
        />

        {/* ✅ 필터링된 국가 리스트 */}
        {filteredCountries.map((country) => (
          <Box
            key={country.code}
            display="flex"
            alignItems="center"
            mb={1}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const alreadySelected = prevList.some(
                (c) => c.country.code === country.code
              );
              if (alreadySelected) return;

              const newList = [...prevList, { country }];
              onSelectCountry(newList);
            }}
          >
            <img
              src={`https://flagcdn.com/w40/${country.code}.png`}
              alt={country.name}
              style={{ width: 40, height: 30, marginRight: 8 }}
            />
            <Typography variant="body2">{country.name}</Typography>
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginTop: 16 }}
          fullWidth
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default NationModal;
