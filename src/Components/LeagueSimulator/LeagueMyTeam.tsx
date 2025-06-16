import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useSquadSetters } from "../hooks/useSquadSetter";
import { useSquadGetters } from "../hooks/useSquadGetters";
import { useNavigate } from "react-router-dom";

import { setSquadStateFromClubData } from "../../util/setSquadStateFromClubData";
import { useSquadStore } from "../../store/useSquadStore";

import {
  adjustTeamOvr,
  getTeamOvrIndicator,
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
}

const LeagueMyTeam: React.FC<LeagueMyTeamProp> = ({ matches }) => {
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

  const { setMyFormation } = useSquadStore(
    (s) => ({
      setMyFormation: s.setMyFormation,
    }),
    shallow
  );
  const [isClicked, setIsClicked] = useState(false);

  const [totalAddStatPoints, setTotalAddStatPoints] = useState(
    matches.reduce((acc, m) => acc + m.addStats, 0)
  );

  const adjustedTeamOvr = adjustTeamOvr(mySelectedPlayers);
  const myTeamName = myClubs?.name ?? "N/A";

  useEffect(() => {
    setTotalAddStatPoints(matches.reduce((acc, m) => acc + m.addStats, 0));
  }, [matches]);

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
    } catch (err: any) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message ||
            JSON.stringify(err?.response?.data ?? err, null, 2);
      useSnackbarStore.getState().setSnackbar(msg);
    }
  };

  console.log("my team ovr", myTeamOvr);
  return (
    <div
      style={{
        outline: "1px solid blue",
        minWidth: "300px",
        flex: "1 1 30%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
      }}
    >
      <div>My Team</div>
      <div>Formation: {myFormation}</div>
      <div>Team Name: {myTeamName}</div>
      <div>Squad Value: {myTeamSquadValue}</div>
      <div>
        OVR: {myTeamOvr} → {adjustedTeamOvr}{" "}
        {getTeamOvrIndicator(adjustedTeamOvr, myTeamOvr)}
      </div>
      <div style={{ color: "red" }}>
        Earned Stat Points: {totalAddStatPoints}
      </div>

      <Button
        variant="contained"
        disabled={totalAddStatPoints === 0 && !isClicked}
        onClick={handleSave}
      >
        SAVE
      </Button>

      <div
        style={{
          outline: "1px solid red",
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
              <Grid
                container
                spacing={1}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Grid item xs={12} md={9}>
                  <Button
                    onClick={() =>
                      navigate(`/myPlayer/${player.id}`, {
                        state: { player: player },
                      })
                    }
                    sx={outerCardStyle(false)}
                  >
                    <Box
                      // ref={(node: HTMLDivElement | null) => dragRef(dropRef(node))}
                      sx={rowStyle}
                    >
                      {/* <Box sx={rowStyle}> */}
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
                      {/* </Box> */}
                    </Box>
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    disabled={totalAddStatPoints === 0}
                    sx={{
                      ...outerCardStyle(false),
                      minHeight: "58px",
                      justifyContent: "center",
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
                    ➕
                  </Button>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <div>선수가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default LeagueMyTeam;
