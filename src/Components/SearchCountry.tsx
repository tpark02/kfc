import React, { useState } from "react";
import { Autocomplete, TextField, Box, InputAdornment } from "@mui/material";
import { countryData } from "../data/countryData";
import { Country } from "../types/Country";

interface FilterCountryProp {
  setSelectedCountry: (country: Country[]) => void;
  prevList: Country[];
}

const SearchCountry: React.FC<FilterCountryProp> = ({
  setSelectedCountry,
  prevList,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountryInternal] =
    useState<Country | null>(null);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={countryData}
      value={selectedCountry}
      onChange={(_, newValue) => {
        if (!newValue) return;
        setSelectedCountry([...prevList, newValue]);
        setSelectedCountryInternal(null);
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            key={option.code}
            component="li"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            {...rest}
          >
            <img
              src={`https://flagcdn.com/w40/${option.code}.png`} // ✅ flag URL 사용
              alt={option.name}
              style={{
                width: 20,
                height: 15,
                objectFit: "cover",
                borderRadius: 2,
                backgroundColor: "white",
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "../../img/fallback.png";
              }}
            />
            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Country"
          variant="outlined"
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment:
              selectedCountry && selectedCountry.code ? (
                <InputAdornment position="start">
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountry.code}.png`}
                    alt={selectedCountry.name}
                    style={{
                      width: 20,
                      height: 15,
                      objectFit: "cover",
                      borderRadius: 2,
                      backgroundColor: "white",
                      marginRight: 5,
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "../../img/fallback.png";
                    }}
                  />
                </InputAdornment>
              ) : null,
          }}
          sx={{
            backgroundColor: "#242424",
            input: { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />
      )}
      sx={{
        backgroundColor: "#242424",
        color: "#fff",
      }}
    />
  );
};

export default SearchCountry;
