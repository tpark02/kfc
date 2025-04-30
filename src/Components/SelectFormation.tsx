import React from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { baseFormations } from "../data/formations";

interface SelectFormationProp {
  setSelectedFormation: (formation: string) => void;
  selectedFormation: string;
}
const SelectFormation: React.FC<SelectFormationProp> = ({
  setSelectedFormation,
  selectedFormation,
}) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="label">Formation</InputLabel>
      <Select
        labelId="formation-label"
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(e.target.value)}
        label="Formation"
        sx={{
          backgroundColor: "#242424",
          color: "#fff",
          "& .MuiSelect-icon": {
            color: "#fff",
            borderLeft: "none",
            marginLeft: "8px",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#242424",
              color: "#fff",
            },
          },
        }}
      >
        {Object.entries(baseFormations).map(([key]) => (
          <MenuItem
            key={key}
            value={key}
            sx={{
              backgroundColor: "#242424",
              color: "#fff",
            }}
          >
            <Box display="flex" alignItems="center">
              {key}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFormation;
