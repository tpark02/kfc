import React, { useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { fetchMyClubs, updateMyClub, deleteMyClub } from "./MyClubUtil";
import { MyClubData } from "../../types/Club";
import { Button, Typography, Divider } from "@mui/material";
import ConfirmDialog from "../ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { Snackbar } from "@mui/material";
import { Player, myPlayerToPlayer } from "../../types/Player";
import { totalNumberOfPlayers } from "../../types/Team";
import { shallow } from "zustand/shallow";

interface MyClubProp {
  snackbarOpen: boolean;
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setLoading: (open: boolean) => void;
}

const MyClub: React.FC<MyClubProp> = ({
  snackbarOpen,
  setSnackbarOpen,
  setSnackbarMessage,
  setLoading,
}) => {
  // 🎯 상태와 setter들을 묶어서 shallow 비교
  const {
    mySelectedPlayers,
    myUserId,
    myClubs,
    myFormation,
    dropPlayers,
    myTeamOvr,
    myTeamSquadValue,
    myTeamAge,
    myTeamPace,
    myTeamDefense,
    myTeamClubCohesion,
    myTeamAttack,
    myTeamStamina,

    setMyTeamName,
    setMySelectedClubId,
    setMySelectedPlayers,
    setDropPlayers,
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
      mySelectedPlayers: s.mySelectedPlayers,
      myUserId: s.myUserId,
      myClubs: s.myClubs,
      myFormation: s.myFormation,
      dropPlayers: s.dropPlayers,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      myTeamAge: s.myTeamAge,
      myTeamPace: s.myTeamPace,
      myTeamDefense: s.myTeamDefense,
      myTeamClubCohesion: s.myTeamClubCohesion,
      myTeamAttack: s.myTeamAttack,
      myTeamStamina: s.myTeamStamina,

      setMyTeamName: s.setMyTeamName,
      setMySelectedClubId: s.setMySelectedClubId,
      setMySelectedPlayers: s.setMySelectedPlayers,
      setDropPlayers: s.setDropPlayers,
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newClubName, setNewClubName] = useState("");

  const handleUpdateClub = (idx: number, clubId: number, players: Player[]) => {
    setLoading(true);

    if (newClubName.length > 0) {
      updateMyClub(
        mySelectedPlayers,
        myUserId,
        clubId,
        newClubName,
        myFormation,
        players,
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
          setSnackbarMessage(msg);
          setSnackbarOpen(true);
          fetchMyClubs(myUserId).then((clubs) => {
            const paddedClubs: (MyClubData | null)[] = Array(3).fill(null);
            clubs.forEach((club, idx) => {
              paddedClubs[idx] = club ?? null;
            });
            setMyClubs(paddedClubs);

            // Find the updated club and map its players to Player[]
            const updatedClub = paddedClubs.find(
              (c) => c && c.clubId === clubId
            );
            const playerList: Player[] =
              updatedClub && updatedClub.players
                ? updatedClub.players.map(myPlayerToPlayer)
                : [];

            console.log("myclub.tsx drop players - ", dropPlayers);
            setDropPlayers([...playerList]);

            console.log("my club.tsx selected players - ", dropPlayers);
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
          setLoading(false);
          setEditingIndex(null);
        });
    }
    setLoading(false);
    setEditingIndex(null);
  };

  const [snackbarMessage, _] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    idx: number;
    clubId: number;
    newName: string;
  } | null>(null);

  const handleConfirm = () => {
    if (!pendingUpdate) return;

    const updated = [...myClubs];
    const { idx, newName, clubId } = pendingUpdate;

    if (updated[idx]) {
      updated[idx] = {
        ...updated[idx],
        name: newName,
        formationName: updated[idx].formationName || "",
      };
    }

    console.log("club id to update:", clubId);

    const playersSnapshot = [...dropPlayers]; // ✅ 복사하여 안전하게 사용

    handleUpdateClub(idx, clubId, playersSnapshot);
    //setMyClubs(updated);
    setMySelectedClubId(clubId);
    setConfirmOpen(false);
    setEditingIndex(null);
    setPendingUpdate(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setEditingIndex(null);
    setPendingUpdate(null);
  };

  const handleBlur = (club: MyClubData, idx: number) => {
    if (!newClubName.trim()) {
      setSnackbarMessage("Club name is empty");
      setSnackbarOpen(true);
      setEditingIndex(null);
      return;
    }

    const updated = [...myClubs];

    if (updated[idx]!) {
      updated[idx] = {
        ...updated[idx],
        name: newClubName,
        formationName: updated[idx]?.formationName || "",
      };
    }
    const hasEmptyPlayer = Object.values(dropPlayers).some((d) => d === null);

    if (hasEmptyPlayer) {
      setSnackbarMessage(
        `The number of players must be ${totalNumberOfPlayers}`
      );
      setSnackbarOpen(true);
      setLoading(false);
      setEditingIndex(null);
      return;
    }
    if (club?.clubId !== undefined) {
      setPendingUpdate({
        idx,
        clubId: club.clubId,
        newName: newClubName.trim(),
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
      {myClubs.map((club, idx) => {
        const isEditing = editingIndex === idx;

        return (
          <div
            key={club?.clubId ?? `slot-${idx}`}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
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
                  setLoading(true);
                  fetchMyClubs(myUserId)
                    .then((clubs) => {
                      const selectedClub = clubs.find(
                        (c) => c.clubId === club?.clubId
                      );

                      if (club?.clubId !== undefined) {
                        console.log("Setting selected club ID:", club.clubId);
                        setMySelectedClubId(club.clubId);
                      }

                      if (!selectedClub) {
                        setSnackbarMessage("The club not found");
                        setSnackbarOpen(true);
                        return;
                      }

                      console.log(
                        "my club.tsx selected Club - ",
                        selectedClub.players
                      );
                      setMySelectedPlayers(selectedClub.players);

                      //set club name
                      setMyTeamName(selectedClub?.name);
                      const playerList: Player[] =
                        selectedClub.players.map(myPlayerToPlayer);
                      console.log("my club.tsx drop players - ", dropPlayers);
                      setDropPlayers([...playerList]);
                      setMyFormation(selectedClub.formationName);
                      setMyTeamOvr(selectedClub.ovr);
                      setMyTeamSquadValue(selectedClub.price);
                      setMyTeamAge(selectedClub.age);
                      setMyTeamPace(selectedClub.pace);
                      setMyTeamDefense(selectedClub.defense);
                      setMyTeamAttack(selectedClub.attack);
                      setMyTeamClubCohesion(selectedClub.clubCohesion);
                      setMyTeamStamina(selectedClub.stamina);
                      resetDropZoneList();
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                  setEditingIndex(null);
                }}
                disabled={
                  club?.name === null ||
                  club?.name === "" ||
                  (club?.players?.length ?? 0) < totalNumberOfPlayers
                }
              >
                <CheckIcon sx={{ color: club?.name ? "green" : "red" }} />
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
                    value={newClubName}
                    onChange={(e) => setNewClubName(e.target.value)}
                    onBlur={() => {
                      handleBlur(club!, idx);
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
                    {club?.name ?? "(Click to add name)"}
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
                  setEditingIndex(idx);
                  setNewClubName(club?.name ?? "");
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
                  setLoading(true);
                  if (club?.clubId) {
                    deleteMyClub(myUserId, club.clubId)
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
                        });
                      })
                      .finally(() => setLoading(false));
                  }
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        );
      })}
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Club Update"
        message="⚠️ If you proceed, it will erase the previous club. Do you want to continue?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Snackbar for validation messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default MyClub;
