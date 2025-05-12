import React from "react";
import { formations } from "../../data/formations";
import { Button } from "@mui/material";
import { Player } from "../../types/Player";
import CroppedAvatar from "./CroppedAvatar";
import "../../style/SquadBuilder.css";

interface SquadBuilderProp {
  selectedFormation: keyof typeof formations;
  dropPlayers: { [idx: number]: Player | null };
  benchPlayers: Player[];
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
  benchPlayers,
  setSelectedDropZone,
  setIsDropZoneSelected,
  setPosition,
  searchPlayerRef,
  selectedDropZone,
}) => {
  return (
    <>
      {/* <div className="squad-builder"> */}
        <div className="squad-group">
          <div className="squad-field">
            {formations[selectedFormation].map((position, idx) => {
              const player = dropPlayers[idx];
              return (
                <Button
                  // className="player"
                  key={`drop-${idx}`}
                  onClick={() => {
                    setSelectedDropZone({
                      index: idx,
                      pos: position.pos ?? "",
                    });
                    setPosition(position.pos ?? "");
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
            {Object.values(benchPlayers).map((bench, index) => {
              return (
                <div key={`bench-${index}`} className="bench-player">
                  <CroppedAvatar src={bench?.img ?? ""} />
                </div>
              );
            })}
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default SquadBuilder;
