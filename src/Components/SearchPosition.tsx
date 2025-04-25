import React, { useState } from "react";
import { playerPosData } from "../data/playerPosData";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

interface SearchPositionProp {
  selectedPos: (pos: string) => void;
}
const SearchPosition: React.FC<SearchPositionProp> = ({ selectedPos }) => {
  const [selectedPosition, setSelectedPosition] = useState("");

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="label">Position</InputLabel>
      <Select
        labelId="pos-label"
        value={selectedPosition}
        onChange={(e) => {
          setSelectedPosition(e.target.value);
          selectedPos(e.target.value.toUpperCase());
        }}
        label="Position"
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
        {playerPosData.map((pos) => (
          <MenuItem key={pos.code} value={pos.code}>
            <Box display="flex" alignItems="center">
              {pos.code.toUpperCase()}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchPosition;
