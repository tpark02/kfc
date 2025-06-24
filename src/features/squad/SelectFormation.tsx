import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { baseFormations } from "../../data/formations";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";

const formationKeys = Object.keys(baseFormations);

const SelectFormation: React.FC = () => {
  const {
    myFormation,
    setIsDropZoneSelected,
    setMyFormation,
    resetSquadMetric,
  } = useSquadStore(
    (s) => ({
      myFormation: s.myFormation,
      setIsDropZoneSelected: s.setIsDropZoneSelected,
      setMyFormation: s.setMyFormation,
      resetSquadMetric: s.resetSquadMetric,
    }),
    shallow
  );

  const handleChange = (formation: string) => {
    setMyFormation(formation);
    setIsDropZoneSelected(false);
    resetSquadMetric();
  };

  const currentIndex = formationKeys.indexOf(myFormation);

  const goPrev = () => {
    const newIndex =
      (currentIndex - 1 + formationKeys.length) % formationKeys.length;
    handleChange(formationKeys[newIndex]);
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % formationKeys.length;
    handleChange(formationKeys[newIndex]);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ outline: "1px solid gray", borderRadius: "8px", mb: 2 }}
    >
      <IconButton onClick={goPrev} size="large">
        <ArrowBackIos sx={{ color: "white" }} fontSize="large" />
      </IconButton>

      <Typography
        variant="h6"
        sx={{
          color: "white",
          minWidth: "100px",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        {myFormation}
      </Typography>

      <IconButton onClick={goNext} size="small">
        <ArrowForwardIos sx={{ color: "white" }} fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default SelectFormation;
