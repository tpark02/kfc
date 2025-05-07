import React from "react";
import { Select, MenuItem, Box } from "@mui/material";
import { baseFormations } from "../../data/formations";
import { Player } from "../../types/Player";

interface SelectFormationProp {
  setSelectedFormation: (formation: string) => void;
  selectedFormation: string;
  setDropPlayers: React.Dispatch<
    React.SetStateAction<{
      [idx: number]: Player | null;
    }>
  >;
}
const SelectFormation: React.FC<SelectFormationProp> = ({
  setSelectedFormation,
  selectedFormation,
  setDropPlayers,
}) => {
  return (
    <>
      <Select
        variant="outlined"
        style={{
          width: "90%",
          borderRadius: "8px",
        }}
        labelId="formation-label"
        value={selectedFormation}
        onChange={(e) => {
          setSelectedFormation(e.target.value);
          setDropPlayers({});
        }}
        sx={{
          backgroundColor: "#242424",
          color: "white",
          "& .MuiSelect-icon": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray", // ✅ This overrides the default blue border
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
    </>
  );
};

export default SelectFormation;
