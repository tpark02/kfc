import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useSquadSetters } from "../hooks/useSquadSetter";
import { useSquadGetters } from "../hooks/useSquadGetters";

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

interface LeagueMyTeamProp {
  matches: Match[];
}

const LeagueMyTeam: React.FC<LeagueMyTeamProp> = ({ matches }) => {
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

  const { setMyFormation, setMySelectedClubId } = useSquadStore(
    (s) => ({
      setMyFormation: s.setMyFormation,
      setMySelectedClubId: s.setMySelectedClubId,
    }),
    shallow
  );
  const [isClicked, setIsClicked] = useState(false);

  const [totalAddStatPoints, setTotalAddStatPoints] = useState(
    matches.reduce((acc, m) => acc + m.addStats, 0)
  );

  const adjustedTeamOvr = adjustTeamOvr(mySelectedPlayers);
  const myTeamName = myClubs[mySelectedClubId]?.name ?? "N/A";

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
          mySelectedPlayers.map((player, idx) => (
            <div
              key={player.id ?? idx}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "stretch",
                  alignItems: "center",
                  width: "100%",
                  outline: "1px solid red",
                }}
              >
                {player?.name} - {player?.pos} - OVR: {player?.ovr}
              </div>
              <Button
                disabled={totalAddStatPoints === 0}
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  minWidth: "40px",
                  fontSize: "18px",
                  borderRadius: "6px",
                  "&.Mui-disabled": {
                    backgroundColor: "green",
                    color: "white",
                    opacity: 0.4,
                  },
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
            </div>
          ))
        ) : (
          <div>선수가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default LeagueMyTeam;
