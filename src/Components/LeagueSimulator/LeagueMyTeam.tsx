import { useSquadStore } from "../../store/useSquadStore";
import {
  adjustTeamOvr,
  getTeamOvrIndicator,
  updateMyClub,
  fetchMyClubs,  
} from "../../util/MyClubUtil";
import { Match } from "../../types/Match";
import { shallow } from "zustand/shallow";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MyClubData } from "../../types/Club";
import { Player, myPlayerToPlayer } from "../../types/Player";
import { Snackbar } from "@mui/material";

interface LeagueMyTeamProp {
  matches: Match[];
}

const LeagueMyTeam: React.FC<LeagueMyTeamProp> = ({ matches }) => {
  const {
    myUserId,
    mySelectedClubId,
    // myTeamName,
    myFormation,
    myTeamOvr,
    myTeamAge,
    myTeamPace,
    myTeamDefense,
    myTeamClubCohesion,
    myTeamAttack,
    myTeamStamina,
    myTeamSquadValue,
    mySelectedPlayers,
    // dropPlayers,
    myClubs,
    setMySelectedPlayers,
    setMyClubs,
    // setDropPlayers,    
  } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
      mySelectedClubId: s.mySelectedClubId,
      // myTeamName: s.myTeamName,
      myFormation: s.myFormation,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      mySelectedPlayers: s.mySelectedPlayers,
      // dropPlayers: s.dropPlayers,
      myTeamAge: s.myTeamAge,
      myTeamPace: s.myTeamPace,
      myTeamDefense: s.myTeamDefense,
      myTeamClubCohesion: s.myTeamClubCohesion,
      myTeamAttack: s.myTeamAttack,
      myTeamStamina: s.myTeamStamina,
      myClubs: s.myClubs,
      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyClubs: s.setMyClubs,
      // setDropPlayers: s.setDropPlayers,      
      setMyTeamOvr: s.setMyTeamOvr,
    }),
    shallow
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [totalAddStatPoints, setTotalAddStatPoints] = useState(
    matches
      .map((m) => {
        return m.addStats;
      })
      .reduce((acc, curr) => (acc += curr), 0)
  );

  const adjustedTeamOvr = adjustTeamOvr(mySelectedPlayers);
  const myTeamName = myClubs[mySelectedClubId]?.name ?? "N/A";

  useEffect(() => {
    setTotalAddStatPoints(
      matches
        .map((m) => {
          return m.addStats;
        })
        .reduce((acc, curr) => (acc += curr), 0)
    );
  }, [matches]);

  console.log("my selected players - ", mySelectedPlayers);

  return (
    <>
      {
        <div
          style={{
            outline: "1px solid blue",
            minWidth: "300px", // ✅ prevent items from becoming too small
            flex: "1 1 30%", // ✅ flexible but constrained
            maxWidth: "100%", // ✅ responsive on shrink
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "auto",
          }}
        >
          <div>My Team</div>ㅇ<div>Formation:{myFormation}</div>
          <div>Team Name: {myTeamName}</div>
          <div>Squad Value: {myTeamSquadValue}</div>
          <div>
            OVR: {myTeamOvr}
            <span>{"->"}</span>
            {adjustedTeamOvr}
            {getTeamOvrIndicator(adjustedTeamOvr, myTeamOvr)}
          </div>
          <div style={{ color: "red" }}>
            Earned Stat Points: {totalAddStatPoints}
          </div>
          <Button
            variant="contained"
            disabled={totalAddStatPoints === 0 && !isClicked}
            onClick={() => {
              setIsClicked(false);
              updateMyClub(
                mySelectedPlayers,
                myUserId,
                mySelectedClubId,
                myTeamName,
                myFormation,
                // dropPlayers,
                adjustedTeamOvr,
                myTeamSquadValue,
                myTeamAge,
                myTeamPace,
                myTeamDefense,
                myTeamClubCohesion,
                myTeamAttack,
                myTeamStamina
              )
                .then((msg) => {
                  setSnackbarMessage(msg);
                  setSnackbarOpen(true);
                  fetchMyClubs(myUserId).then((clubs) => {
                    const paddedClubs: (MyClubData | null)[] =
                      Array(3).fill(null);
                    clubs.forEach((club, idx) => {
                      paddedClubs[idx] = club ?? null;
                    });
                    setMyClubs(paddedClubs);

                    // Find the updated club and map its players to Player[]
                    const updatedClub = paddedClubs.find(
                      (c) => c && c.clubId === mySelectedClubId
                    );
                    const playerList: Player[] =
                      updatedClub && updatedClub.players
                        ? updatedClub.players.map(myPlayerToPlayer)
                        : [];

                    // console.log("LeagueMyTeam.tsx drop players - ", dropPlayers);
                    setDropPlayers([...playerList]);

                    // console.log("LeagueMyTeam.tsx selected players - ", dropPlayers);
                    if (updatedClub && updatedClub.players) {
                      setMySelectedPlayers(updatedClub.players);
                    }
                  });
                })
                .catch((err) => {
                  const msg =
                    typeof err === "string"
                      ? err
                      : err?.response?.data?.message ||
                        JSON.stringify(err?.response?.data ?? err, null, 2);
                  setSnackbarMessage(msg);
                  setSnackbarOpen(true);
                })
                .finally(() => {
                  // setLoading(false);
                  // setEditingIndex(null);
                });
            }}
          >
            SAVE
          </Button>
          <div
            style={{
              outline: "1px solid red",
              display: "flex",
              flexDirection: "column",
              // flexWrap: "nowrap",
              width: "100%",
              height: "auto",
            }}
          >
            {mySelectedPlayers ? (
              Object.values(mySelectedPlayers).map((player, idx) => (
                <div
                  key={player.id ?? idx}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // flexWrap: "nowrap",
                      justifyContent: "stretch",
                      alignItems: "center",
                      width: "100%",
                      height: "auto",
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
                      minWidth: "40px", // optional: to prevent button from being too narrow
                      transition: "opacity 0.2s",
                      fontSize: "18px",
                      borderRadius: "6px",
                      "&.Mui-disabled": {
                        backgroundColor: "green", // keep green color
                        color: "white",
                        opacity: 0.4, // transparent look when disabled
                      },
                    }}
                    onClick={() => {
                      setIsClicked(true);                      
                      setTotalAddStatPoints(totalAddStatPoints - 1);
                      
                      console.log(
                        "Add stat clicked. Remaining points:",
                        totalAddStatPoints
                      );

                      const idx = mySelectedPlayers.findIndex((p) => {
                        return p.id === player.id;
                      });

                      if (idx === -1) return;

                      console.log("before add - ", mySelectedPlayers[idx].ovr);
                      const newlst = [...mySelectedPlayers];
                      newlst[idx] = {
                        ...newlst[idx],
                        ovr: newlst[idx].ovr + 1,
                      };
                      console.log("OVR to be set:", newlst[idx].ovr); // ✅ correct new value
                      setMySelectedPlayers(newlst); // ✅ update Zustand store
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </div>
      }
    </>
  );
};

export default LeagueMyTeam;
