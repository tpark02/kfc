import React, { useEffect } from "react";
import { formations } from "../../data/formations";
import { Button } from "@mui/material";
import CroppedAvatar from "./CroppedAvatar";
import "../../style/SquadBuilder.css";
import { useSquadStore } from "../../store/useSquadStore";
import { getTeamAvr } from "./SquadBuilderUtil";
import { DropZone } from "../../types/DropZone";

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

  return (
    <>
      <div className="squad-group">
        <div className="squad-field">
          {formations[selectedFormation].map((position, idx) => {
            const pos = position.pos.replace(/[0-9]/g, "");
            const player = dropPlayers[idx];

            return (
              <Button
                key={`drop-${idx}`}
                onClick={() => {
                  const len = dropZoneList.length;
                  console.log("len : ", len);

                  if (len < 1) {
                    setSelectedDropZone({
                      index: idx,
                      pos: pos ?? "",
                    });
                    setDropZoneList(dropZoneList, {
                      index: idx,
                      pos: pos ?? "",
                    });
                    setPosition(pos ?? "");
                    setIsDropZoneSelected(true);
                  } else {
                    const tempPlayers = [...dropPlayers]; // copy to avoid mutation
                    const i = dropZoneList[0].index;

                    [tempPlayers[i], tempPlayers[idx]] = [
                      tempPlayers[idx],
                      tempPlayers[i],
                    ];

                    setSelectedDropZone({
                      index: -1,
                      pos: "",
                    });
                    setDropPlayers(tempPlayers);
                    resetDropZoneList();
                  }

                  if (searchPlayerRef.current) {
                    searchPlayerRef.current.scrollTop = 0;
                  }
                }}
                style={{
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
                </div>
              </Button>
            );
          })}
        </div>
        <div className="squad-bench">
          {Object.values(dropPlayers)
            .slice(11)
            .map((bench, idx) => {
              const actualIndex = idx + 11;
              // console.log("bench", bench);
              return (
                <div
                  // className="bench-player"
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
                      const tempPlayers = [...dropPlayers]; // copy to avoid mutation
                      const i = dropZoneList[0].index;
                      console.log("from : ", i);
                      console.log("to : ", actualIndex);
                      [tempPlayers[i], tempPlayers[actualIndex]] = [
                        tempPlayers[actualIndex],
                        tempPlayers[i],
                      ];

                      setSelectedDropZone({
                        index: -1,
                        pos: "",
                      });
                      setDropPlayers(tempPlayers);
                      resetDropZoneList();
                    }

                    if (searchPlayerRef.current) {
                      searchPlayerRef.current.scrollTop = 0;
                    }
                  }}
                >
                  <CroppedAvatar
                    src={bench?.img ?? ""}
                    selected={selectedDropZone.index === actualIndex}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SquadBuilder;
