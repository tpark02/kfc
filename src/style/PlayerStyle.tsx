import { getOvrColor } from "../util/util";
import { Typography, Box } from "@mui/material";
import { ReactNode } from "react";

export const getPlayerStatDisplay = (label: string, value: number) => {
  const isPrice = label.toUpperCase() === "PRICE";
  const stat = value === null ? "N/A" : value;
  return (
    <div style={{ textAlign: "center", lineHeight: 1.2 }}>
      <div style={{ fontSize: 12, color: "#64625B" }}>
        {label.toUpperCase()}
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: "bold",
          position: "relative",
          display: "inline-block",
          paddingBottom: "4px",
          color: isPrice === true ? "white" : getOvrColor(value),
        }}
      >
        {stat}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: "100%",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
};

export const getStatDisplay = (label: string, value: number) => {
  return (
    <div style={{ textAlign: "center", lineHeight: 1.2 }}>
      {/* <div style={{ fontSize: 12, color: "#64625B" }}>
        {label.toUpperCase()}
      </div> */}
      <div
        style={{
          fontSize: 15,
          fontWeight: "bold",
          position: "relative",
          display: "inline-block",
          // paddingBottom: "4px",
          color: getOvrColor(value),
        }}
      >
        {value}
        {/* <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: "100%",
            borderRadius: "2px",
          }}
        /> */}
      </div>
    </div>
  );
};

// export const StatBox = ({ label, value }: { label: string; value: number }) => (
//   <Box sx={{ textAlign: "center", minWidth: 40 }}>
//     <Typography variant="caption" color="gray">
//       {label}
//     </Typography>
//     <Typography sx={{ fontWeight: 500 }}>{value}</Typography>
//   </Box>
// );

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
