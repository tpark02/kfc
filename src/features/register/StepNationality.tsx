// ✅ Step 1: StepNationality.tsx
import { Box, Select, MenuItem } from "@mui/material";
import { countryData, getImgByCountryName } from "../../data/countryData";

interface StepNationalityProps {
  nationality: string;
  setNationality: (val: string) => void;
}

const StepNationality: React.FC<StepNationalityProps> = ({
  nationality,
  setNationality,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Select
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        displayEmpty
        style={{
          minWidth: 240,
          color: "#fff",
          border: "1px solid #888",
          backgroundColor: "#1b1f26",
        }}
        inputProps={{ style: { color: "#fff" } }}
      >
        <MenuItem value="" disabled>
          Select Nationality
        </MenuItem>
        {countryData.map((country) => (
          <MenuItem
            key={country.code}
            value={country.name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {getImgByCountryName(country.name, 24, 16)}
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default StepNationality;