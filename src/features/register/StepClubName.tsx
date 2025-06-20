// ✅ Step 0: StepClubName.tsx
import React from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";

interface StepClubNameProps {
  teamName: string;
  setTeamName: (val: string) => void;
}

const StepClubName: React.FC<StepClubNameProps> = ({
  teamName,
  setTeamName,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
        placeholder="Club Name"
        value={teamName}
        onChange={(e) => {
          setTeamName(e.target.value);
        }}
        sx={{
          maxWidth: 500,
          width: "40%",
          color: "#fff",
          borderBottom: "1px solid #888",
          "& input": { color: "#fff" },
          "&::placeholder": { color: "#ccc" },
        }}
      />
    </Box>
  );
};

export default StepClubName;
