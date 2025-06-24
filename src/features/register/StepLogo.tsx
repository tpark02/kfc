// ✅ Step 2: StepLogo.tsx
import React from "react";
import { Box } from "@mui/material";
import { Logo } from "../../types/Logo";

interface StepLogoProps {
  logos: Logo[];
  confirmedLogoId: number | null;
  onSelect: (logo: Logo) => void;
}

const StepLogo: React.FC<StepLogoProps> = ({
  logos,
  confirmedLogoId,
  onSelect,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"flex-start",
        alignItems: "center",
        mt: 4,        
      }}
    >
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "repeat(4, 1fr)", // 📱 Mobile and up
            md: "repeat(5, 1fr)", // 💻 Medium screens and up
          },
          gap: 2,
        }}
      >
        {logos.map((logo) => (
          <Box key={logo.id} display="flex" justifyContent="center">
            <img
              src={logo.logoImg}
              alt={`logo-${logo.id}`}
              width={67}
              height={80}
              onClick={() => onSelect(logo)}
              style={{
                border:
                  confirmedLogoId === logo.id
                    ? "2px solid #90caf9"
                    : "2px solid transparent",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: "#333",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StepLogo;
