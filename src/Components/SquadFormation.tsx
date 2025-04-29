import React from "react";
// import DropZone from "./DropZone";
import { SquadMap } from "../types/Player";
import { Player } from "../types/Player";
import { formationGrid } from "../types/FormationGrid";
import "../DropZone.css";
import { Button } from "@mui/material";
import CroppedAvatar from "./CroppedAvatar";

interface SquadProp {
  formation: string;
  squad: SquadMap;
  dropPlayers: { [index: number]: Player | null };
  setSelectedDropZone: React.Dispatch<
    React.SetStateAction<{ index: number; pos: string }>
  >;
  setIsDropZoneSelected: (b: boolean) => void;
  dropZoneRefs: React.RefObject<(HTMLDivElement | null)[]>; // ✅ React.RefObject can be used as a non-deprecated alternative

  setPosition: React.Dispatch<React.SetStateAction<string>>;
  searchPlayerRef: React.RefObject<HTMLDivElement | null>;
  // ignoreNextClick: React.RefObject<boolean>;
}

const SquadFormation: React.FC<SquadProp> = ({
  // dropZoneRefs,
  formation,
  dropPlayers,
  // setDropPlayers,
  setSelectedDropZone,
  setIsDropZoneSelected,
  setPosition,
  searchPlayerRef,
  // ignoreNextClick,
}) => {
  return (
    <div className={`squad-formation formation-${formation}`}>
      {(() => {
        return "1" + formation;
      })()
        .split("")
        .reverse()
        .flatMap((numStr, rowIndex) => {
          // console.log(rowIndex + " " + numStr);
          const count = parseInt(numStr, 10);
          return Array.from({ length: count }).map((_, i) => {
            const idx =
              formation
                .split("")
                .reverse()
                .slice(0, rowIndex)
                .reduce((acc, val) => acc + parseInt(val, 10), 0) + i;

            const grid = formationGrid[formation]?.[idx];
            if (!grid) {
              console.log("gird is null");
              return null;
            }

            return (
              <Button
                key={`drop-${idx}`}
                onClick={() => {
                  setSelectedDropZone({
                    index: idx,
                    pos: grid.position ?? "",
                  });
                  setPosition(grid.position ?? "");
                  setIsDropZoneSelected(true);
                  // ignoreNextClick.current = true;
                  if (searchPlayerRef.current) {
                    searchPlayerRef.current.scrollTop = 0;
                  }
                  console.log(`DropZone clicked at index ${idx}`);
                }}
                // sx={{
                //   width: 60, // 버튼 크기 지정
                //   height: 60,
                //   minWidth: 0,
                //   padding: 0,
                // }}
                style={{
                  gridColumn: grid.gridColumn,
                  gridRow: grid.gridRow,
                }}
              >
                <div className="dropzone-button">
                  <CroppedAvatar src={dropPlayers[idx]?.img ?? ""} />
                </div>
              </Button>

              // <DropZone
              //   ref={(el) => {
              //     dropZoneRefs.current[idx] = el; // ✅ 각 DropZone DOM 저장
              //   }}
              //   key={`drop-${idx}`}
              //   grid={grid}
              //   player={dropPlayers[idx] ?? undefined}
              //   onDrop={(player) => {
              //     setDropPlayers((prev) => ({
              //       ...prev,
              //       [idx]: player,
              //     }));
              //   }}
              //   onClick={() => {
              //     // Update the selected DropZone index
              //     setSelectedDropZone({
              //       index: idx ?? null,
              //       pos: grid?.position ?? "",
              //     });
              //     setPosition(grid?.position ?? "");
              //     setIsDropZoneSelected(true);
              //     ignoreNextClick.current = true;
              //     // 스크롤 최상단 이동
              //     if (searchPlayerRef.current) {
              //       searchPlayerRef.current.scrollTop = 0;
              //     }
              //     console.log(`DropZone clicked at index ${idx}`);
              //   }}
              //   containerClassName={
              //     selectedDropZone.index === idx
              //       ? "dropzone-container selected"
              //       : "dropzone-container"
              //   }
              // ></DropZone>
            );
          });
        })}
    </div>
  );
};

export default SquadFormation;
