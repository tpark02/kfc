import React, { useState } from "react";
import "./Modal.css";
import { Box, Typography, TextField } from "@mui/material";
import { countryData } from "../data/countryData";
import { Country } from "../types/country";

interface NationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countries: Country[]) => void;
  prevList: Country[];
}

const NationModal: React.FC<NationModalProps> = ({
  isOpen,
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
            color: "white",
            "& input::placeholder": {
              color: "gray",
              opacity: 1,
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
              backgroundColor: "white",
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "../../img/fallback.png";
            }}
          />
          <Typography variant="body2">{country.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default NationModal;
