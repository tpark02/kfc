import React from "react";
import DropZone from "./DropZone";
import { SquadMap } from "../types/Player";
import { Player } from "../types/Player";
import { formationGrid } from "../types/FormationGrid";
import "../DropZone.css";

interface SquadProp {
  formation: string;
  squad: SquadMap;
  dropPlayers: { [index: number]: Player | null };
  setDropPlayers: React.Dispatch<
    React.SetStateAction<{ [index: number]: Player | null }>
  >;
  setSelectedDropZone: React.Dispatch<React.SetStateAction<{ index: number }>>;
  setIsDropZoneSelected: (b: boolean) => void;
  dropZoneRefs: React.RefObject<(HTMLDivElement | null)[]>; // ✅ React.RefObject can be used as a non-deprecated alternative
  selectedDropZone: { index: number };
}

const SquadFormation: React.FC<SquadProp> = ({
  dropZoneRefs,
  formation,
  dropPlayers,
  setDropPlayers,
  setSelectedDropZone,
  setIsDropZoneSelected,
  selectedDropZone,
}) => {
  return (
    <div className={`squad-formation formation-${formation}`}>
      {(() => {
        console.log(selectedDropZone.index);
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
              <DropZone
                ref={(el) => {
                  dropZoneRefs.current[idx] = el; // ✅ 각 DropZone DOM 저장
                }}
                key={`drop-${idx}`}
                grid={grid}
                player={dropPlayers[idx] ?? undefined}
                onDrop={(player) => {
                  setDropPlayers((prev) => ({
                    ...prev,
                    [idx]: player,
                  }));
                }}
                onClick={() => {
                  setSelectedDropZone({ index: idx ?? null }); // Update the selected DropZone index
                  // ✅ 렌더링 다음 tick에 true 설정
                  setTimeout(() => {
                    setIsDropZoneSelected(true);
                  }, 0);
                  console.log(`DropZone clicked at index ${idx}`);
                }}
                containerClassName={
                  selectedDropZone.index === idx
                    ? "dropzone-container selected"
                    : "dropzone-container"
                }
              ></DropZone>
            );
          });
        })}
    </div>
  );
};

export default SquadFormation;
