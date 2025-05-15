import React, { useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { fetchMyClubs, updateMyClub, deleteMyClub } from "./MyClubUtil";
import { Club } from "../../types/Club";
import { Button, Typography, Divider } from "@mui/material";
import { Player } from "../../types/Player";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

interface MyClubProp {
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setLoading: (open: boolean) => void;
}

const MyClub: React.FC<MyClubProp> = ({
  setSnackbarOpen,
  setSnackbarMessage,
  setLoading,
}) => {
  const {
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
    setDropPlayers,
    setMyTeamName,
    setMyTeamOvr,
    isDropZoneSelected,
    setIsDropZoneSelected,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyClubs,
    setuserId,
    setMyFormation,
  } = useSquadStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newClubName, setNewClubName] = useState("");

  const handleUpdateClub = (idx: number, clubId: number) => {
    setLoading(true);

    if (newClubName.length > 0) {
      updateMyClub(
        clubId,
        newClubName,
        myFormation,
        dropPlayers,
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
            const paddedClubs: (Club | null)[] = Array(3).fill(null);
            clubs.forEach((club, idx) => {
              paddedClubs[idx] = club ?? null;
            });
            setMyClubs(paddedClubs);
          });
        })
        .catch((err) => {
          setSnackbarMessage(err);
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        outline: "1px solid gray",
        borderRadius: "8px",
        width: "90%",
        margin: "20px 0 0 0",
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

                      if (!selectedClub) {
                        setSnackbarMessage("The club not found");
                        setSnackbarOpen(true);
                        return;
                      }

                      const newDropPlayers: {
                        [idx: number]: Player | null;
                      } = {};

                      selectedClub.players.forEach(
                        (p: Player | null, idx: number) => {
                          newDropPlayers[idx] = p;
                        }
                      );

                      setDropPlayers(newDropPlayers);
                      setMyFormation(selectedClub.formationName);
                      setMyTeamOvr(selectedClub.ovr);
                      setMyTeamSquadValue(selectedClub.price);
                      setMyTeamAge(selectedClub.age);
                      setMyTeamPace(selectedClub.pace);
                      setMyTeamDefense(selectedClub.defense);
                      setMyTeamAttack(selectedClub.attack);
                      setMyTeamClubCohesion(selectedClub.clubCohesion);
                      setMyTeamStamina(selectedClub.stamina);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                  setEditingIndex(null);
                }}
                disabled={
                  club?.name === null ||
                  club?.name === "" ||
                  (club?.players?.length ?? 0) < 26
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
                    // onBlur={() => handleSaveClub(idx, club)}
                    onBlur={() => {
                      if (newClubName === null || newClubName === "") {
                        setSnackbarMessage("club name is empty");
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
                        const hasEmptyPlayer = Object.values(dropPlayers).some(
                          (d) => d === null
                        );

                        if (hasEmptyPlayer) {
                          setSnackbarMessage(
                            "The number of players must be 26"
                          );
                          setSnackbarOpen(true);
                          setLoading(false);
                          setEditingIndex(null);
                          return;
                        }

                        if (club?.clubId !== undefined) {
                          handleUpdateClub(idx, club.clubId);
                        }
                        setMyClubs(updated);
                      } else {
                        const hasEmptyPlayer = Object.values(dropPlayers).some(
                          (d) => d === null
                        );

                        if (hasEmptyPlayer) {
                          setSnackbarMessage(
                            "The number of players must be 26"
                          );
                          setSnackbarOpen(true);
                          setLoading(false);
                          setEditingIndex(null);
                          return;
                        }
                        if (club?.clubId !== undefined) {
                          handleUpdateClub(idx, club?.clubId);
                          setMyClubs(updated);
                        }                        
                      }
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
                    deleteMyClub(club.clubId)
                      .then((msg) => {
                        setSnackbarMessage(msg);
                        setSnackbarOpen(true);
                        fetchMyClubs(myUserId).then((clubs) => {
                          const paddedClubs: (Club | null)[] =
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
    </div>
  );
};

export default MyClub;
