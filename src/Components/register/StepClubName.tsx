// ✅ Step 0: StepClubName.tsx
import React from "react";
import { Box, Input, Typography } from "@mui/material";

interface StepClubNameProps {
  teamName: string;
  setTeamName: (val: string) => void;
  error: string;
  clearError: () => void;
}

const StepClubName: React.FC<StepClubNameProps> = ({
  teamName,
  setTeamName,
  error,
  clearError,
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
      <Input
        placeholder="Club Name"
        value={teamName}
        onChange={(e) => {
          setTeamName(e.target.value);
          clearError();
        }}
        sx={{
          maxWidth: 500,
          width: "20%",
          color: "#fff",
          borderBottom: "1px solid #888",
          "& input": { color: "#fff" },
          "&::placeholder": { color: "#ccc" },
        }}
      />
      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default StepClubName;