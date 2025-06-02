import React, { useEffect } from "react";
import { formations } from "../../data/formations";
import { Button } from "@mui/material";
import { useSquadStore } from "../../store/useSquadStore";
import { DropZone } from "../../types/DropZone";
import { getTeamAvr } from "./SquadBuilderUtil";
import { Player } from "../../types/Player";
// import Snackbar from "@mui/material/Snackbar";
import CroppedAvatar from "./CroppedAvatar";
// import axios from "axios";
import "../../style/SquadBuilder.css";
import "../../DropZone.css";

interface SquadBuilderProp {
  selectedFormation: keyof typeof formations;
  setSelectedDropZone: React.Dispatch<React.SetStateAction<DropZone>>;
  setIsDropZoneSelected: (b: boolean) => void;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  searchPlayerRef: React.RefObject<HTMLDivElement | null>;
  selectedDropZone: DropZone;
}

const SquadBuilder: React.FC<SquadBuilderProp> = ({
  searchPlayerRef,
  selectedDropZone,
  selectedFormation,
  setSelectedDropZone,
  setIsDropZoneSelected,
  setPosition,
}) => {
  const {
    // myUserId,
    // mySelectedClubId,
    selectedMyPlayers,
    dropZoneList,
    dropPlayers,
    setDropZoneList,
    setDropPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    resetDropZoneList,
  } = useSquadStore();

  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const teamData = getTeamAvr(dropPlayers);

    setMyTeamOvr(teamData.ovr);
    setMyTeamPace(teamData.spd);
    setMyTeamAttack(teamData.atk);
    setMyTeamDefense(teamData.def);
    setMyTeamStamina(teamData.sta);
    setMyTeamClubCohesion(teamData.tc);
    setMyTeamSquadValue(teamData.squadVal);

    setDropPlayers(dropPlayers);
  }, [dropPlayers, setDropPlayers]);

  // const updateRoster = async (players = dropPlayers) => {
  //   try {
  //     const rosterMap = Object.fromEntries(players.map((p) => [p.id, p.idx]));

  //     const response = await axios.post(
  //       "http://localhost:8080/myclub/updateroster",
  //       {
  //         userId: myUserId,
  //         clubId: mySelectedClubId,
  //         rosterMap: rosterMap,
  //       }
  //     );
  //     setSnackbarOpen(true);
  //     setSnackbarMessage(
  //       response.data?.message || "Roster updated successfully!"
  //     );
  //   } catch (error) {
  //     console.error("🔥 Error:", error);
  //     setSnackbarOpen(true);
  //     setSnackbarMessage(
  //       error instanceof Error ? error.message : String(error)
  //     );
  //   }
  // };

  return (
    <>
      <div className="squad-group">
        <div className="squad-field">
          {formations[selectedFormation].map((position, idx) => {
            const pos = position.pos.replace(/[0-9]/g, "");
            const player = dropPlayers.find((p) => p.idx === idx); // ✅ 정확한 선수 찾기
            const myPlayer = selectedMyPlayers.find(
              (p) => p.playerId === player?.id
            );

            return (
              <Button
                key={`drop-${idx}`}
                onClick={() => {
                  const len = dropZoneList.length;

                  if (len < 1) {
                    setSelectedDropZone({ index: idx, pos });
                    setDropZoneList(dropZoneList, { index: idx, pos });
                    setPosition(pos);
                    setIsDropZoneSelected(true);
                  } else {
                    const tempPlayers = [...dropPlayers];
                    const i = dropZoneList[0].index;

                    const a = tempPlayers.find((p) => p.idx === i);
                    const b = tempPlayers.find((p) => p.idx === idx);

                    if (!a || !b) return;

                    const updatedPlayers = tempPlayers.map((p) => {
                      if (p.id === a.id) return { ...p, idx: b.idx };
                      if (p.id === b.id) return { ...p, idx: a.idx };
                      return p;
                    });

                    setDropPlayers(updatedPlayers);
                    setSelectedDropZone({ index: -1, pos: "" });
                    resetDropZoneList();
                  }

                  if (searchPlayerRef.current) {
                    searchPlayerRef.current.scrollTop = 0;
                  }
                }}
                style={{
                  color: "red", // font color for red card yellow card myplayer
                  position: "absolute",
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                }}
              >
                <div className="dropzone-button">
                  <CroppedAvatar
                    src={player?.img ?? ""}
                    selected={selectedDropZone.index === idx}
                  />
                  <div>{myPlayer?.redCard ?? 0}</div>
                  <div>{myPlayer?.yellowCard ?? 0}</div>
                </div>
              </Button>
            );
          })}
        </div>
        <div className="squad-bench">
          {Object.values(dropPlayers)
            .filter((p): p is Player => !!p)
            .sort((a, b) => a.idx - b.idx)
            .slice(11)
            .map((benchPlayer, idx) => {
              const actualIndex = idx + 11;
              const myBenchPlayer = selectedMyPlayers.find(
                (p) => p.playerId === benchPlayer.id
              );
              console.log("bench player red card - ", myBenchPlayer?.redCard);
              return (
                <div
                  key={`drop-${actualIndex}`}
                  onClick={() => {
                    const len = dropZoneList.length;
                    if (len < 1) {
                      setSelectedDropZone({
                        index: actualIndex,
                        pos: "",
                      });
                      setDropZoneList(dropZoneList, {
                        index: actualIndex,
                        pos: "",
                      });
                      setPosition("");
                      setIsDropZoneSelected(true);
                    } else {
                      //const tempPlayers = [...dropPlayers]; // copy to avoid mutation
                      const tempPlayersArray = Object.values(
                        dropPlayers
                      ).filter((p): p is Player => !!p); // null 제거

                      const i = dropZoneList[0].index;

                      const a = tempPlayersArray.find((p) => p.idx === i);
                      const b = tempPlayersArray.find(
                        (p) => p.idx === actualIndex
                      );

                      if (!a || !b) return;

                      const updatedPlayers = tempPlayersArray.map((p) => {
                        if (p.id === a.id) return { ...p, idx: b.idx };
                        if (p.id === b.id) return { ...p, idx: a.idx };
                        return p;
                      });

                      setDropPlayers(updatedPlayers);
                      setSelectedDropZone({ index: -1, pos: "" });
                      resetDropZoneList();
                    }

                    if (searchPlayerRef.current) {
                      searchPlayerRef.current.scrollTop = 0;
                    }
                  }}
                >
                  <div className="dropzone-button">
                    <CroppedAvatar
                      src={benchPlayer?.img ?? ""}
                      selected={selectedDropZone.index === actualIndex}
                    />
                    <div>{myBenchPlayer?.redCard ?? 0}</div>
                    <div>{myBenchPlayer?.yellowCard ?? 0}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Snackbar for validation messages */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      /> */}
    </>
  );
};

export default SquadBuilder;
