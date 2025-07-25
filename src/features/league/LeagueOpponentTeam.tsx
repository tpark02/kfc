import React from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { Grid, Box, Typography } from "@mui/material";
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
import { shallow } from "zustand/shallow";
import CroppedAvatar from "../squad/CroppedAvatar";

const LeagueOpponentTeam: React.FC = () => {
  const { matches, selectedIdx } = useSquadStore(
    (s) => ({
      matches: s.matches,
      selectedIdx: s.selectedIdx,
      setSelectedIdx: s.setSelectedIdx,
    }),
    shallow
  );

  const navigate = useNavigate();

  const selectedMatch = selectedIdx >= 0 ? matches[selectedIdx] : null;

  return (
    <>
      <Box className="squad-metrics-section">
        <CroppedAvatar
          src={selectedMatch?.teamImg ?? "/img/fallback.png"}
          fallbackSrc={"/img/fallback.png"}
          width={150}
          height={150}
          fallBackWidth={150}
          fallBackHeight={150}
          aspectRatio={4 / 3}
        />
        <Typography variant="h4">{selectedMatch?.awayTeam}</Typography>
      </Box>
      <Box className="squad-metrics-section">
        <Typography>OVR</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {typeof selectedMatch?.ovr === "number" && !isNaN(selectedMatch?.ovr)
            ? selectedMatch?.ovr
            : "N/A"}
        </Typography>
      </Box>
      {selectedMatch?.members ? (
        selectedMatch.members.map((player) => {
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
                <Box
                  component="button"
                  onClick={() =>
                    navigate(`/player/${player.id}`, {
                      state: { player },
                    })
                  }
                  sx={{
                    ...outerCardStyle(false),
                    backgroundColor: "#1b1f26 !important",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#2a2e35 !important",
                    },
                  }}
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

                    <Typography variant="body2" component="span" sx={ovrStyle}>
                      {getStatDisplay(player.ovr)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Box>Teams not selected</Box>
      )}
    </>
  );
};
export default LeagueOpponentTeam;
