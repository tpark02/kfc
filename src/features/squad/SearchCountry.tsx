import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  InputAdornment,
  Card,
} from "@mui/material";
import { countryData } from "../../data/countryData";
import { Country } from "../../types/country";
import Popper from "@mui/material/Popper";

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

  const CustomPopper = (props: any) => (
    <Popper
      {...props}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
      ]}
      sx={{
        "& .MuiAutocomplete-paper": {
          backgroundColor: "#242424",
          color: "white",
          boxShadow: "none",
          border: "1px solid #444",
        },
      }}
    />
  );

  return (
    <Card sx={{ margin: "10px" }}>
      <Autocomplete
        PopperComponent={CustomPopper}
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
          const { key, ...rest } = props; // ✅ key를 분리

          return (
            <li
              key={key} // ✅ 여기 명시적으로 전달
              {...rest} // ✅ 나머지 props spread
              style={{
                backgroundColor: "#242424",
                color: "white",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#242424";
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <img
                  src={`https://flagcdn.com/w40/${option.code}.png`}
                  alt={option.name}
                  style={{
                    width: 20,
                    height: 15,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "../../img/fallback.png";
                  }}
                />
                {option.name}
              </Box>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select Country"
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
                        backgroundColor: "#242424",
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
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
                "& svg": { color: "white" },
              },
            }}
          />
        )}
        sx={{
          backgroundColor: "#242424",
          color: "#fff",
        }}
      />
    </Card>
  );
};

export default SearchCountry;
