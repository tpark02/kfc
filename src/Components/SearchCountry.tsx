import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { countryData } from "../data/countryData";
import { Country } from "../types/Country";

interface FilterCountryProp {
  OnSetSelectedCountry: (countries: Country) => void;
}

const SearchCountry: React.FC<FilterCountryProp> = ({
  OnSetSelectedCountry,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="label">Country</InputLabel>
      <Select
        labelId="country-label"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          const selected = countryData.find((c) => c.code === e.target.value);
          if (selected) {
            OnSetSelectedCountry(selected);
          }
        }}
        label="Country"
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#242424",
              color: "#fff",
            },
          },
        }}
        sx={{
          backgroundColor: "#242424",
          color: "#fff",
          "& .MuiSelect-icon": {
            color: "#fff",
            borderLeft: "none",
          },
        }}
      >
        {countryData.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            <Box display="flex" alignItems="center">
              <img
                src={`https://flagcdn.com/w40/${country.code}.png`}
                alt={country.name}
                style={{
                  width: 20,
                  height: 15,
                  marginRight: 8,
                  backgroundColor: "white",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
              {country.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchCountry;
