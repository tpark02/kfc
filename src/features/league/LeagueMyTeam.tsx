import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useSquadSetters } from "../../hooks/useSquadSetter";
import { useSquadGetters } from "../../hooks/useSquadGetters";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { setSquadStateFromClubData } from "../../util/setSquadStateFromClubData";
import { useSquadStore } from "../../store/useSquadStore";

import {
  adjustTeamOvr,
  updateMyClub,
  fetchMyClubs,
} from "../../util/myClubUtil";

import { Match } from "../../types/match";
import { shallow } from "zustand/shallow";

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

interface LeagueMyTeamProp {
  matches: Match[];
  fetchData: () => Promise<void>;
  HasRedCard: boolean;
}

interface ErrorResponse {
  message?: string;
}

const LeagueMyTeam: React.FC<LeagueMyTeamProp> = ({
  matches,
  fetchData,
  HasRedCard,
}) => {
  const navigate = useNavigate();

  const {
    myNation,
    myLogoId,
    myUserId,
    mySelectedClubId,
    myFormation,
    mySelectedPlayers,
    myTeamOvr,
    myTeamSquadValue,
    myTeamAge,
    myTeamPace,
    myTeamDefense,
    myTeamAttack,
    myTeamClubCohesion,
    myTeamStamina,
    myClubs,
  } = useSquadGetters();

  const {
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
  } = useSquadSetters();

  const { setMyFormation, myLogoImgUrl } = useSquadStore(
    (s) => ({
      setMyFormation: s.setMyFormation,
      myLogoImgUrl: s.myLogoImgUrl,
    }),
    shallow
  );
  const [isClicked, setIsClicked] = useState(false);

  const [totalAddStatPoints, setTotalAddStatPoints] = useState(
    matches.reduce((acc, m) => acc + m.addStats, 0)
  );

  const adjustedTeamOvr = adjustTeamOvr(mySelectedPlayers);
  console.log("adjusted team ovr", adjustedTeamOvr);
  const myTeamName = myClubs?.name ?? "N/A";

  useEffect(() => {
    setTotalAddStatPoints(matches.reduce((acc, m) => acc + m.addStats, 0));
  }, [matches]);

  useEffect(() => {});
  const handleSave = async () => {
    setIsClicked(false);

    try {
      const msg = await updateMyClub(
        myNation,
        myLogoId,
        mySelectedPlayers,
        myUserId,
        mySelectedClubId,
        myTeamName,
        myFormation,
        adjustedTeamOvr,
        myTeamSquadValue,
        myTeamAge,
        myTeamPace,
        myTeamDefense,
        myTeamAttack,
        myTeamClubCohesion,
        myTeamStamina
      );

      useSnackbarStore.getState().setSnackbar(msg);
      const updatedClub = await fetchMyClubs(myUserId);

      if (updatedClub && updatedClub.players) {
        await setSquadStateFromClubData(updatedClub, {
          setMySelectedPlayers,
          setMyTeamOvr,
          setMyTeamSquadValue,
          setMyTeamAge,
          setMyTeamPace,
          setMyTeamDefense,
          setMyTeamAttack,
          setMyTeamClubCohesion,
          setMyTeamStamina,
        });
        setMyFormation(updatedClub.formationName);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message ||
            JSON.stringify(err?.response?.data ?? err, null, 2);
      useSnackbarStore.getState().setSnackbar(msg);
    }
  };

  const totalAddStatPointsColor = totalAddStatPoints === 0 ? "white" : "red";

  return (
    <Box
      style={{
        flex: "1 1 30%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
      }}
    >
      <Box className="squad-metrics-section">
        <img src={myLogoImgUrl} style={{ width: "120px", height: "auto" }} />
        <Typography variant="h4">{myTeamName}</Typography>
      </Box>
      <Box className="squad-metrics-section">
        <Typography>OVR</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {typeof myTeamOvr === "number" && !isNaN(myTeamOvr)
            ? myTeamOvr
            : "N/A"}
        </Typography>
      </Box>
      <Box className="squad-metrics-section">
        <Typography variant="subtitle2" gutterBottom>
          Total Value
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {typeof myTeamSquadValue === "number" && !isNaN(myTeamSquadValue)
            ? "$" + myTeamSquadValue.toLocaleString()
            : "$0"}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          fetchData();
        }}
        disabled={HasRedCard}
        sx={{ marginBottom: "10px" }}
      >
        START
      </Button>
      <Box
        className="squad-metrics-section"
        sx={{ color: totalAddStatPointsColor }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Level Up Points
        </Typography>
        {totalAddStatPoints}
      </Box>
      <Button
        variant="contained"
        disabled={totalAddStatPoints === 0 && !isClicked}
        onClick={handleSave}
        sx={{ mb: "10px", outline: "1px solid gray", borderRadius: "8px" }}
      >
        SAVE
      </Button>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
        }}
      >
        {mySelectedPlayers && mySelectedPlayers.length > 0 ? (
          mySelectedPlayers.slice(0, 17).map((player) => {
            const posColor = getPosColor(player.pos);
            const [firstName, lastName] = player.name.split(" ");

            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    onClick={() =>
                      navigate(`/myPlayer/${player.id}`, {
                        state: { player: player },
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

                      <Typography
                        variant="body2"
                        component="span"
                        sx={ovrStyle}
                      >
                        {getStatDisplay(player.ovr)}
                      </Typography>
                      {/* </Box> */}
                    </Box>
                  </Box>
                </Box>
                <Box
                  component="button"
                  disabled={totalAddStatPoints === 0}
                  sx={{
                    ...outerCardStyle(false),
                    minHeight: "60px",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1b1f26",
                    color: (theme) =>
                      totalAddStatPoints === 0
                        ? theme.palette.text.disabled
                        : theme.palette.primary.main,
                    cursor:
                      totalAddStatPoints === 0 ? "not-allowed" : "pointer",
                    pointerEvents: totalAddStatPoints === 0 ? "none" : "auto",
                    "&:hover": {
                      backgroundColor:
                        totalAddStatPoints === 0 ? "#1b1f26" : "#2a2e35",
                    },
                    maxWidth: "50px",
                    fontSize: "2rem",
                    border: "1px solid #444",
                    boxShadow: "none",
                  }}
                  onClick={() => {
                    setIsClicked(true);
                    setTotalAddStatPoints((prev) => prev - 1);

                    const idx = mySelectedPlayers.findIndex(
                      (p) => p.id === player.id
                    );
                    if (idx === -1) return;

                    const updatedList = [...mySelectedPlayers];
                    updatedList[idx] = {
                      ...updatedList[idx],
                      ovr: updatedList[idx].ovr + 1,
                    };
                    setMySelectedPlayers(updatedList);
                  }}
                >
                  +
                </Box>
              </Box>
            );
          })
        ) : (
          <Box>No teams selected</Box>
        )}
      </Box>
    </Box>
  );
};

export default LeagueMyTeam;
