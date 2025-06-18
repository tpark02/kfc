import { useSquadStore } from "../../store/useSquadStore";
import { Match } from "../../types/match";
import { shallow } from "zustand/shallow";
import { Grid, Box, Button, Typography } from "@mui/material";
import { getStatDisplay } from "../../style/playerStyle";
import { borderRadius, height } from "@mui/system";
import CroppedAvatar from "../teambuilder/CroppedAvatar";
import { useState } from "react";

interface LeagueScheduleViewerProps {
  matches: Match[];
}

const LeagueScheduleViewer: React.FC<LeagueScheduleViewerProps> = ({
  matches,
}) => {
  const { selectedIdx, setSelectedIdx } = useSquadStore(
    (s) => ({
      selectedIdx: s.selectedIdx,
      setSelectedIdx: s.setSelectedIdx,
    }),
    shallow
  );

  const winCnt = matches.reduce(
    (acc, curr) => acc + (curr.res === "W" ? 1 : 0),
    0
  );
  const loseCnt = matches.reduce(
    (acc, curr) => acc + (curr.res === "W" ? 0 : 1),
    0
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: 800,
            outline: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              fontSize: "35px",
              fontWeight: "bold",
              gap: 5,
            }}
          >
            <Box sx={{ color: "green" }}>Win : {winCnt}</Box>
            <Box sx={{ color: "red" }}>Lose : {loseCnt}</Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // outline: "1px solid gray",
          minWidth: "300px", // ✅ prevent items from becoming too small
          flex: "1 1 30%", // ✅ flexible but constrained
          maxWidth: "100%", // ✅ responsive on shrink
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          // flexWrap:"wrap",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "auto",
            // flexWrap:"wrap",
          }}
        >
          {matches && matches.length > 0 ? (
            <Box
              sx={{
                display: "flex", // flex container
                justifyContent: "center", // center horizontally
                alignItems: "flex-start", // center vertically (optional)
                minHeight: "100vh", // full height
                width: "100%",
                marginTop: "20px",
                // flexWrap:"wrap",
                // backgroundColor: "#121212", // optional: matches your screenshot
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 1, // spacing between boxes
                  width: "100%",
                  maxWidth: 800, // constrain width
                  aspectRatio: "5 / 4", // keeps grid shape
                  // flexWrap:"wrap",
                }}
              >
                {matches.map((match, idx) => {
                  const resBackgroundColor =
                    match.res === "W" ? "green" : "red";
                  console.log("img", match?.teamImg);
                  return (
                    <>
                      <Box
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "150px",
                          borderRadius: "8px",
                          gap: 5,
                          outline:
                            idx === selectedIdx
                              ? "2px solid yellow"
                              : "1px solid gray",
                        }}
                        onClick={() => {
                          setSelectedIdx(idx);
                        }}
                      >
                        <Box
                          sx={{
                            textAlign: "center",
                            fontSize: "clamp(12px, 4vw, 15px)",
                            // overflow: "hidden",
                            whiteSpace: "nowrap",
                            // textOverflow: "ellipsis",
                          }}
                        >
                          {match.awayTeam}
                        </Box>
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                          }}
                        >
                          <CroppedAvatar
                            src={match?.teamImg}
                            fallbackSrc={"../../../img/fallback.png"}
                            width={50}
                            height={50}
                            fallBackWidth={50}
                            fallBackHeight={50}
                            aspectRatio={4 / 3}
                          />

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              // outline: "1px solid red",
                            }}
                          >
                            {getStatDisplay("", match.ovr)}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                              color: "white",
                              backgroundColor: resBackgroundColor,
                            }}
                          >
                            {match.res}
                          </Box>
                        </Box>
                      </Box>
                    </>
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
                      borderRadius: "8px",
                    }}
                  ></Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LeagueScheduleViewer;
