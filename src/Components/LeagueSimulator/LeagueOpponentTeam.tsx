import React from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  outerCardStyle,
  rowStyle,
  posStyle,
  nameBoxStyle,
  firstNameStyle,
  lastNameStyle,
  ovrStyle,
} from "../../style/playerCardStyles";
import { getPosColor } from "../../util/util";
import { getStatDisplay } from "../../style/playerStyle";

const LeagueOpponentTeam: React.FC = () => {
  const { matches, hoveredMatchIndex } = useSquadStore();
  const hoveredMatch =
    hoveredMatchIndex !== null ? matches[hoveredMatchIndex] : matches[0];
  const navigate = useNavigate();

  return (
    <>
      <Box
        style={{
          // outline: "1px solid blue",
          minWidth: "300px", // ✅ prevent items from becoming too small
          flex: "1 1 30%", // ✅ flexible but constrained
          maxWidth: "100%", // ✅ responsive on shrink
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          style={{
            minWidth: "300px",
            flex: "1 1 30%",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "auto",
          }}
        >
          <Box className="squad-metrics-section">
            {/* <img src={myLogoImgUrl} style={{ width: "50%", height: "auto" }} /> */}
            <Typography variant="h3">{hoveredMatch?.awayTeam}</Typography>
          </Box>
          <Box className="squad-metrics-section">
            <Typography>OVR</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {typeof hoveredMatch?.ovr === "number" &&
              !isNaN(hoveredMatch?.ovr)
                ? hoveredMatch?.ovr
                : "N/A"}
            </Typography>
          </Box>
          {/* <Box className="squad-metrics-section">
            <Typography variant="subtitle2" gutterBottom>
              Total Value
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {typeof myTeamSquadValue === "number" && !isNaN(myTeamSquadValue)
                ? "$" + myTeamSquadValue.toLocaleString()
                : "$0"}
            </Typography>
          </Box> */}
          {hoveredMatch?.members ? (
            hoveredMatch.members.map((player) => {
              const posColor = getPosColor(player.pos);
              const [firstName, lastName] = player.name.split(" ");

              return (
                <Grid
                  container
                  key={player.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    // gap: "10px",
                  }}
                >
                  <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                    <Button
                      onClick={() =>
                        navigate(`/player/${player.id}`, {
                          state: { player },
                        })
                      }
                      sx={{ ...outerCardStyle(false) }}
                    >
                      <Box sx={{ ...rowStyle }}>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={posStyle(posColor)}
                        >
                          {player.pos}
                        </Typography>

                        <Box sx={nameBoxStyle}>
                          <Typography component="span" sx={firstNameStyle}>
                            {firstName}
                          </Typography>
                          <Typography component="span" sx={lastNameStyle}>
                            {lastName}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          component="span"
                          sx={ovrStyle}
                        >
                          {getStatDisplay("", player.ovr)}
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Box>Teams not selected</Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default LeagueOpponentTeam;
