import React, { useEffect } from "react";
import { formations } from "../../data/formations";
import { Button } from "@mui/material";
import { Player } from "../../types/Player";
import CroppedAvatar from "./CroppedAvatar";
import "../../style/SquadBuilder.css";
import { useSquadStore } from "../../store/useSquadStore";

interface SquadBuilderProp {
  selectedFormation: keyof typeof formations;
  dropPlayers: { [idx: number]: Player | null };
  // benchPlayers: Player[];
  setSelectedDropZone: React.Dispatch<
    React.SetStateAction<{ index: number; pos: string }>
  >;
  setIsDropZoneSelected: (b: boolean) => void;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  searchPlayerRef: React.RefObject<HTMLDivElement | null>;
  selectedDropZone: {
    index: number;
    pos: string;
  };
}

const SquadBuilder: React.FC<SquadBuilderProp> = ({
  selectedFormation,
  dropPlayers,
  // benchPlayers,
  setSelectedDropZone,
  setIsDropZoneSelected,
  setPosition,
  searchPlayerRef,
  selectedDropZone,
}) => {
  const { setDropPlayers } = useSquadStore();

  useEffect(() => {
    console.log("dropPlayers", dropPlayers);
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
                  setSelectedDropZone({
                    index: idx,
                    pos: pos ?? "",
                  });
                  setPosition(pos ?? "");
                  setIsDropZoneSelected(true);
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
                    setSelectedDropZone({
                      index: actualIndex,
                      pos: "",
                    });
                    setPosition("");
                    setIsDropZoneSelected(true);
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
