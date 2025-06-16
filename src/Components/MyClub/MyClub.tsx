import React, { useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import {
  fetchMyClubs,
  updateMyClub,
  deleteMyClub,
} from "../../util/myClubUtil";
import { MyClubData } from "../../types/club";
import { Button, Typography, Divider } from "@mui/material";
import ConfirmDialog from "../ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { MyPlayer } from "../../types/player";
import { totalNumberOfPlayers } from "../../types/team";
import { shallow } from "zustand/shallow";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";

const MyClub: React.FC = () => {
  // 🎯 상태와 setter들을 묶어서 shallow 비교
  const {
    myNation,
    myLogoId,
    mySelectedPlayers,
    myUserId,
    myClubs,
    myFormation,
    // dropPlayers,
    myTeamOvr,
    myTeamSquadValue,
    myTeamAge,
    myTeamPace,
    myTeamDefense,
    myTeamClubCohesion,
    myTeamAttack,
    myTeamStamina,

    // setMyTeamName,
    setMySelectedClubId,
    setMySelectedPlayers,
    // setDropPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyClubs,
    setMyFormation,
    resetDropZoneList,
  } = useSquadStore(
    (s) => ({
      myNation: s.myNation,
      myLogoId: s.myLogoId,
      mySelectedPlayers: s.mySelectedPlayers,
      myUserId: s.myUserId,
      myClubs: s.myClubs,
      myFormation: s.myFormation,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      myTeamAge: s.myTeamAge,
      myTeamPace: s.myTeamPace,
      myTeamDefense: s.myTeamDefense,
      myTeamClubCohesion: s.myTeamClubCohesion,
      myTeamAttack: s.myTeamAttack,
      myTeamStamina: s.myTeamStamina,

      // setMyTeamName: s.setMyTeamName,
      setMySelectedClubId: s.setMySelectedClubId,
      setMySelectedPlayers: s.setMySelectedPlayers,
      // setDropPlayers: s.setDropPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyClubs: s.setMyClubs,
      setMyFormation: s.setMyFormation,
      resetDropZoneList: s.resetDropZoneList,
    }),
    shallow
  );
  const [newTeamName, setNewTeamName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateClub = (clubId: number, players: MyPlayer[]) => {
    useLoadingSpinnerStore.getState().setIsLoading(true);
    if (newTeamName.length > 0) {
      updateMyClub(
        myNation,
        myLogoId,
        players,
        myUserId,
        1,
        newTeamName,
        myFormation,
        myTeamOvr,
        myTeamSquadValue,
        myTeamAge,
        myTeamPace,
        myTeamDefense,
        myTeamClubCohesion,
        myTeamAttack,
        myTeamStamina
      )
        .then((msg) => {
          useSnackbarStore.getState().setSnackbar(msg);

          fetchMyClubs(myUserId).then((club) => {
            if (club && club.players) {
              setMySelectedPlayers(club.players);
            }
            console.log("my club.tsx selected players - ", mySelectedPlayers);
          });
        })
        .catch((err) => {
          const msg =
            typeof err === "string"
              ? err
              : err?.response?.data?.message ||
                JSON.stringify(err?.response?.data ?? err, null, 2);
          useSnackbarStore.getState().setSnackbar(msg);
        })
        .finally(() => {
          useLoadingSpinnerStore.getState().setIsLoading(false);
          setIsEditing(false);
        });
    }
    useLoadingSpinnerStore.getState().setIsLoading(false);
    setIsEditing(false);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    idx: number;
    clubId: number;
    newName: string;
  } | null>(null);

  const handleConfirm = () => {
    if (!pendingUpdate) return;

    const updated = myClubs;
    const playersSnapshot = [...mySelectedPlayers]; // ✅ 복사하여 안전하게 사용
    console.log("player snapshot", playersSnapshot);

    handleUpdateClub(1, playersSnapshot);
    setMyClubs(updated);
    setMySelectedClubId(1);
    setConfirmOpen(false);
    setIsEditing(false);
    setPendingUpdate(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setIsEditing(false);
    setPendingUpdate(null);
  };

  const handleBlur = (club: MyClubData, idx: number) => {
    if (!newTeamName.trim()) {
      useSnackbarStore.getState().setSnackbar("Club name is empty");
      setIsEditing(false);
      return;
    }

    if (club?.clubId !== undefined) {
      setPendingUpdate({
        idx,
        clubId: club.clubId,
        newName: newTeamName.trim(),
      });
      // Delay dialog open to avoid aria-focus conflict
      setTimeout(() => setConfirmOpen(true), 0);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        outline: "1px solid gray",
        borderRadius: "8px",
        width: "90%",
        margin: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        My Club
      </Typography>
      {myClubs && (
        <>
          <Divider sx={{ borderColor: "gray" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Button
              sx={{
                flex: 1,
                outline: "1px solid gray",
                minWidth: 0,
                padding: 0,
              }}
              onClick={() => {
                useLoadingSpinnerStore.getState().setIsLoading(true);
                fetchMyClubs(myUserId)
                  .then((club) => {
                    if (!club) {
                      useSnackbarStore
                        .getState()
                        .setSnackbar("The club not found");
                      return;
                    }

                    setMySelectedPlayers(club.players);
                    setMyFormation(club.formationName);
                    setMyTeamOvr(club.ovr);
                    setMyTeamSquadValue(club.price);
                    setMyTeamAge(club.age);
                    setMyTeamPace(club.pace);
                    setMyTeamDefense(club.defense);
                    setMyTeamAttack(club.attack);
                    setMyTeamClubCohesion(club.clubCohesion);
                    setMyTeamStamina(club.stamina);
                    resetDropZoneList();
                  })
                  .finally(() => {
                    useLoadingSpinnerStore.getState().setIsLoading(false);
                  });
                setIsEditing(false);
              }}
              disabled={
                myClubs?.name === null ||
                myClubs?.name === "" ||
                (myClubs?.players?.length ?? 0) < totalNumberOfPlayers
              }
            >
              <CheckIcon sx={{ color: myClubs?.name ? "green" : "red" }} />
            </Button>
            {/* ✅ Name or Editable Input */}
            <div
              style={{
                flex: 3,
                padding: "4px",
                outline: "1px solid gray",
              }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  onBlur={() => {
                    handleBlur(myClubs!, 0);
                  }}
                  autoFocus
                  style={{ width: "100%" }}
                />
              ) : (
                <span
                  style={{
                    cursor: "pointer",
                    display: "block",
                    color: "white",
                  }}
                >
                  {myClubs?.name ?? "(Click to add name)"}
                </span>
              )}
            </div>
            <Button
              sx={{
                flex: 1,
                outline: "1px solid gray",
                minWidth: 0,
                padding: 0,
                color: "white",
              }}
              onClick={() => {
                console.log("click edit");
                setIsEditing(true);
                setNewTeamName(myClubs?.name ?? "");
              }}
            >
              <EditIcon />
            </Button>
            {/* 🗑️ Delete Button (disabled if null) */}
            <Button
              sx={{
                flex: 1,
                // outline: "1px solid gray",
                minWidth: 0,
                padding: 0,
                color: "white",
              }}
              // disabled={!club}
              onClick={() => {
                useLoadingSpinnerStore.getState().setIsLoading(true);
                if (myClubs?.clubId) {
                  deleteMyClub(myUserId, myClubs.clubId)
                    .then((msg) => {
                      useSnackbarStore.getState().setSnackbar(msg);
                      fetchMyClubs(myUserId).then((club) => {
                        if (club !== null) setMyClubs(club);
                      });
                    })
                    .finally(() =>
                      useLoadingSpinnerStore.getState().setIsLoading(false)
                    );
                }
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        </>
      )}
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Club Update"
        target=""
        message="⚠️ If you proceed, it will erase the previous club. Do you want to continue?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {/* Snackbar for validation messages */}
    </div>
  );
};

export default MyClub;
