import React from "react";
import { formations } from "../../data/formations";
import { Button } from "@mui/material";
import { useSquadStore } from "../../store/useSquadStore";
import { DropZone } from "../../types/dropZone";
import { MyPlayer } from "../../types/player";
import { shallow } from "zustand/shallow";

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
    myUniformImgUrl,
    myLogoImgUrl,
    mySelectedPlayers,
    dropZoneList,
    setDropZoneList,
    setMySelectedPlayers,
    resetDropZoneList,
  } = useSquadStore(
    (s) => ({
      myUniformImgUrl: s.myUniformImgUrl,
      myLogoImgUrl: s.myLogoImgUrl,
      mySelectedPlayers: s.mySelectedPlayers,
      dropZoneList: s.dropZoneList,
      setDropZoneList: s.setDropZoneList,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      resetDropZoneList: s.resetDropZoneList,
      setMySelectedPlayers: s.setMySelectedPlayers,
    }),
    shallow
  );

  return (
    <>
      {/* <div className="squad-group"> */}
        <div className="squad-field">
          {formations[selectedFormation].map((position, idx) => {
            const pos = position.pos.replace(/[0-9]/g, "");
            const player = mySelectedPlayers
              .filter((p): p is MyPlayer => !!p)
              .sort((a, b) => a.idx - b.idx)
              .find((p) => p.idx === idx); // ✅ 정확한 선수 찾기
            // const myPlayer = mySelectedPlayers.find(
            //   (p) => p.playerId === player?.id
            // );

            return (
              <Button
                key={`starting-${idx}`}
                onClick={() => {
                  const len = dropZoneList.length;

                  if (len < 1) {
                    setSelectedDropZone({ index: idx, pos });
                    setDropZoneList(dropZoneList, { index: idx, pos });
                    setPosition(pos);
                    setIsDropZoneSelected(true);
                  } else {
                    const tempPlayers = [...mySelectedPlayers];
                    const i = dropZoneList[0].index;

                    const a = tempPlayers.find((p) => p.idx === i);
                    const b = tempPlayers.find((p) => p.idx === idx);

                    if (!a || !b) return;

                    const updatedPlayers = tempPlayers.map((p) => {
                      if (p.idx === a.idx) return { ...p, idx: b.idx };
                      if (p.idx === b.idx) return { ...p, idx: a.idx };
                      return p;
                    });

                    console.log("updated playes", updatedPlayers);

                    setMySelectedPlayers(updatedPlayers);
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={
                    player?.name !== "dummy" ? myLogoImgUrl : "/img/avatar.jpg"
                  }
                  alt={player?.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",                    
                  }}
                />
                {player?.name}
              </Button>
            );
          })}
        </div>
        {/* <div className="squad-bench">
          {Object.values(mySelectedPlayers)
            .filter((p): p is MyPlayer => !!p)
            .sort((a, b) => a.idx - b.idx)
            .slice(11)
            .map((benchPlayer, idx) => {
              const actualIndex = idx + 11;

              return (
                <div
                  key={`bench-${actualIndex}`}
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
                      const tempPlayersArray = Object.values(
                        mySelectedPlayers
                      ).filter((p): p is MyPlayer => !!p); // null 제거

                      const i = dropZoneList[0].index;

                      const a = tempPlayersArray.find((p) => p.idx === i);
                      const b = tempPlayersArray.find(
                        (p) => p.idx === actualIndex
                      );

                      if (!a || !b) return;

                      const updatedPlayers = tempPlayersArray.map((p) => {
                        if (p.idx === a.idx) return { ...p, idx: b.idx };
                        if (p.idx === b.idx) return { ...p, idx: a.idx };
                        return p;
                      });

                      // setDropPlayers(updatedPlayers);
                      setMySelectedPlayers(updatedPlayers);
                      setSelectedDropZone({ index: -1, pos: "" });
                      resetDropZoneList();
                    }

                    if (searchPlayerRef.current) {
                      searchPlayerRef.current.scrollTop = 0;
                    }
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <img
                    src={
                      benchPlayer?.name !== "dummy"
                        ? myLogoImgUrl
                        : "/img/avatar.jpg"
                    }
                    alt={benchPlayer?.name}
                    style={{
                      display:"flex",
                      maxWidth: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      flexWrap: "wrap",
                    }}
                  />
                  {benchPlayer?.name !== "dummy" ? benchPlayer?.name : "EMPTY"}
                </div>
              );
            })}
        </div> */}
      {/* </div> */}
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
