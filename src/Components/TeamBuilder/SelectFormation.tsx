import React from "react";
import { Select, MenuItem, Box } from "@mui/material";
import { baseFormations } from "../../data/formations";
import { useSquadStore } from "../../store/useSquadStore";
import { TOTAL_DROP_ZONES } from "../../data/formations";
import { defaultPlayer } from "../../types/Player";

const SelectFormation: React.FC = () => {
  const {
    myFormation,
    setIsDropZoneSelected,
    setDropPlayers,
    setMyFormation,
    resetSquadMetric,
  } = useSquadStore();

  return (
    <>
      <Select
        variant="outlined"
        style={{
          width: "90%",
          borderRadius: "8px",
        }}
        labelId="formation-label"
        value={myFormation}
        onChange={(e) => {
          setMyFormation(e.target.value);
          //setDropPlayers(Array.from({ length: TOTAL_DROP_ZONES }, () => defaultPlayer));

          setIsDropZoneSelected(false);
          resetSquadMetric();
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
