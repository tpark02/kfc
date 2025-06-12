// ✅ Step 1: StepNationality.tsx
import { Box, Select, MenuItem, Typography } from "@mui/material";
import { countryData, getImgByCountryName } from "../../data/countryData";

interface StepNationalityProps {
  nationality: string;
  setNationality: (val: string) => void;
  error: string;
}

const StepNationality: React.FC<StepNationalityProps> = ({
  nationality,
  setNationality,
  error,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
          backgroundColor: "#1e1e1e",
        }}
        inputProps={{ style: { color: "#fff" } }}
      >
        <MenuItem value="" disabled>
          Select Nationality
        </MenuItem>
        {countryData.map((country, idx) => (
          <MenuItem
            key={country.code}
            value={country.name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {getImgByCountryName(country.name, idx, 24, 16)}
            {country.name}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default StepNationality;