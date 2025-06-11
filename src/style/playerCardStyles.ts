import { height, margin } from "@mui/system";

export const playerCardStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#1e1e1e",
  color: "#fff",
  borderRadius: 2, // ✅ reduced from 8 or 12 to make it sharper
  outline: "1px solid gray",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  width: "100%", // adjust as needed for full name support
  padding: "4px 8px",
  height: "45px",
  margin: "0 0 10px 0"  
};

export const playerRowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "100%",
  gap: 1,
  overflow: "hidden", // prevent spillover
  minHeight: "36px", // ✅ consistent height
};
