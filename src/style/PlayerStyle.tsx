import { getOvrColor } from "../util/util";
import { Typography, Box } from "@mui/material";
import { ReactNode } from "react";

export const getPlayerStringDisplay = (
  label: string,
  value: string,
  color: string
) => {
  const stat = value === null ? "N/A" : value;
  return (
    <Box sx={{ textAlign: "center", lineHeight: 1.2 }}>
      <Box sx={{ fontSize: 12, color: "#64625B" }}>{label.toUpperCase()}</Box>
      <Box
        sx={{
          fontSize: 15,
          fontWeight: "bold",
          position: "relative",
          display: "inline-block",
          paddingBottom: "4px",
          color: color,
        }}
      >
        {stat}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: "100%",
            borderRadius: "2px",
          }}
        />
      </Box>
    </Box>
  );
};

export const getPlayerStatDisplay = (label: string, value: number) => {
  const isPrice = label.toUpperCase() === "PRICE";
  const stat = value === null ? "N/A" : value;
  return (
    <Box sx={{ textAlign: "center", lineHeight: 1.2 }}>
      <Box sx={{ fontSize: 12, color: "#64625B" }}>{label.toUpperCase()}</Box>
      <Box
        sx={{
          fontSize: 15,
          fontWeight: "bold",
          position: "relative",
          display: "inline-block",
          paddingBottom: "4px",
          color: isPrice === true ? "white" : getOvrColor(value),
        }}
      >
        {stat}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: "100%",
            borderRadius: "2px",
          }}
        />
      </Box>
    </Box>
  );
};

export const getStatDisplay = (value: number) => {
  return (
    <Box sx={{ textAlign: "center", lineHeight: 1.2 }}>
      <Box
        sx={{
          fontSize: 15,
          fontWeight: "bold",
          position: "relative",
          display: "inline-block",
          color: getOvrColor(value),
        }}
      >
        {value}
      </Box>
    </Box>
  );
};

export const StatBox = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => (
  <Box sx={{ textAlign: "center", minWidth: 40 }}>
    <Typography variant="caption" color="gray">
      {label}
    </Typography>
    <Box>{value}</Box>
  </Box>
);

export const getPlayerRole = (pos: string) => {
  if (pos.includes("ST")) return "Striker";
  if (pos.includes("CB")) return "Defender";
  if (pos.includes("CAM") || pos.includes("CM")) return "Midfielder";
  if (pos.includes("LW") || pos.includes("RW")) return "Winger";
  return pos;
};
