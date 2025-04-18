import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Box, Typography, Button, TextField } from "@mui/material";
import { countryData } from "../data/countryData";
import { Country } from "../Types/Country";

interface NationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countries: Country[]) => void; // 배열 전달
  prevList: Country[]; // 👈 기존 선택된 목록 받기
}

const NationModal: React.FC<NationModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredCountries = countryData.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredCountries.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <Box sx={{ mt: 2 }}>
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
          className="filter-box"
          key={country.code}
          display="flex"
          alignItems="center"
          mb={1}
          style={{ cursor: "pointer" }}
          onClick={() => {
            const alreadySelected = prevList.some(
              (c) => c.code === country.code
            );
            if (alreadySelected) return;

            const newList = [...prevList, country];
            onSelectCountry(newList);
          }}
        >
          <img
            src={`https://flagcdn.com/w40/${country.code}.png`}
            alt={country.name}
            style={{
              width: "8%",
              height: "8%",
              marginRight: 8,
              backgroundColor: "white", // ✅ add white background
            }}
          />
          <Typography variant="body2">{country.name}</Typography>
        </Box>
      ))}

      {/* <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
        style={{ marginTop: 1 }}
      >
        close
      </Button> */}
    </Box>
  );
};

export default NationModal;
