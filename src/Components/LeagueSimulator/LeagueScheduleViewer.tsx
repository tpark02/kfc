import { useSquadStore } from "../../store/useSquadStore";
import { Match } from "../../types/match";
import { shallow } from "zustand/shallow";
import { Grid, Box, Button, Typography } from "@mui/material";
import { getStatDisplay } from "../../style/playerStyle";
import { borderRadius } from "@mui/system";

interface LeagueScheduleViewerProps {
  matches: Match[];
}

const LeagueScheduleViewer: React.FC<LeagueScheduleViewerProps> = ({
  matches,
}) => {
  const { setHoveredMatchIndex } = useSquadStore(
    (s) => ({
      setHoveredMatchIndex: s.setHoveredMatchIndex,
    }),
    shallow
  );
  return (
    <Box
      style={{
        outline: "1px solid gray",
        minWidth: "300px", // ✅ prevent items from becoming too small
        flex: "1 1 30%", // ✅ flexible but constrained
        maxWidth: "100%", // ✅ responsive on shrink
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        borderRadius: "8px",
      }}
    >
      <Box
        style={{          
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
        }}
      >
        {matches && matches.length > 0 ? (
          <Box
            sx={{
              display: "flex", // flex container
              justifyContent: "center", // center horizontally
              alignItems: "center", // center vertically (optional)
              minHeight: "100vh", // full height
              width: "100%",
              // backgroundColor: "#121212", // optional: matches your screenshot
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)", // 5 columns
                gap: 1, // spacing between boxes
                width: "100%",
                maxWidth: 800, // constrain width
                aspectRatio: "5 / 4", // keeps grid shape
              }}
            >
              {matches.map((match, idx) => {
                const resColor = match.res === "W" ? "green" : "red";

                return (
                  <Box
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "strech",
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      gap: 5,
                      outline: "1px solid gray",
                    }}
                    onMouseEnter={() => setHoveredMatchIndex(idx)}
                    onMouseLeave={() => setHoveredMatchIndex(null)}
                  >
                    <Box>{match.round}</Box>
                    <Box sx={{ textAlign: "center" }}>{match.awayTeam}</Box>
                    <Box>{getStatDisplay("", match.ovr)}</Box>
                    <Box sx={{ color: resColor }}>{match.res}</Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex", // flex container
              justifyContent: "center", // center horizontally
              alignItems: "center", // center vertically (optional)
              minHeight: "100vh", // full height
              width: "100%",
              // backgroundColor: "#121212", // optional: matches your screenshot
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)", // 5 columns
                gap: 1, // spacing between boxes
                width: "100%",
                maxWidth: 800, // constrain width
                aspectRatio: "5 / 4", // keeps grid shape
              }}
            >
              {Array.from({ length: 20 }).map((_, idx) => (
                <Box
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "stretch",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                    outline: "1px solid gray",
                    borderRadius:"8px",
                  }}
                ></Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LeagueScheduleViewer;
