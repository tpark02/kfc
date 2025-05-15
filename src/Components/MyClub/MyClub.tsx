import React, { useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { fetchMyClubs, createMyClub, deleteMyClub } from "./MyClubUtil";
import { Club } from "../../types/Club";
import { Button, Typography, Divider } from "@mui/material";
import { Player } from "../../types/Player";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

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
  const handleSaveClub = (idx: number, club: Club | null) => {
    const newOrUpdated = {
      ...(club ?? {
        clubId: undefined, // backend can generate this
        formationName: "442",
        players: [],
        ovr: 0,
        price: 0,
        age: 0,
        pace: 0,
        defense: 0,
        attack: 0,
        clubCohesion: 0,
        stamina: 0,
      }),
      name: newClubName,
    };

    if (!club) {
      // If this is a new club, create it in the backend
      createMyClub(
        myUserId,
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
      ).then((msg) => {
        setSnackbarMessage(msg);
        setSnackbarOpen(true);
        fetchMyClubs(myUserId).then((clubs) => {
          const paddedClubs: (Club | null)[] = Array(3).fill(null);
          clubs.forEach((club, idx) => {
            paddedClubs[idx] = club ?? null;
          });
          setMyClubs(paddedClubs);
        });
      });
    } else {
      // Just update local state (or patch if needed)
      const updated = [...myClubs];
      updated[idx] = newOrUpdated;
      setMyClubs([
        ...updated,
        ...Array(Math.max(0, 3 - updated.length)).fill(null),
      ]);
    }

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
          <>
            <Divider sx={{ borderColor: "gray" }} />
            <div
              key={club?.clubId ?? `slot-${idx}`}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {/* ✅ Name or Editable Input */}
                <div
                  style={{
                    flex: 3,
                    // outline: "1px solid gray",
                    padding: "4px",
                  }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={newClubName}
                      onChange={(e) => setNewClubName(e.target.value)}
                      onBlur={() => handleSaveClub(idx, club)}
                      autoFocus
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <span
                      onClick={() => {
                        setEditingIndex(idx);
                        setNewClubName(club?.name ?? "");
                      }}
                      style={{
                        cursor: "pointer",
                        display: "block",
                      }}
                    >
                      {club?.name ?? "(Click to add name)"}
                    </span>
                  )}
                </div>
                <Button
                  sx={{
                    flex: 1,
                    // outline: "1px solid gray",
                    minWidth: 0,
                    padding: 0,
                  }}
                  onClick={() => {
                    fetchMyClubs(myUserId).then((clubs) => {
                      const selectedClub = clubs.find(
                        (c) => c.clubId === club?.clubId
                      );

                      if (!selectedClub) {
                        setSnackbarMessage("❌ 클럽을 찾을 수 없습니다.");
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
                    });
                    setEditingIndex(null);
                  }}
                >
                  <CheckIcon />
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
                  disabled={!club}
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
          </>
        );
      })}
    </div>
  );
};

export default MyClub;
