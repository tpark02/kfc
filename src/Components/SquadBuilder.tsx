import React, { useMemo } from "react";
import { formations, baseFormations } from "../data/formations";
import { Button } from "@mui/material";
import { Player } from "../types/Player";
import CroppedAvatar from "./CroppedAvatar";
import "../SquadBuilder.css";

interface SquadBuilderProp {
  selectedFormation: keyof typeof formations;
  dropPlayers: { [key: string]: Player[] | null };
  setSelectedDropZone: React.Dispatch<
    React.SetStateAction<{ index: number; pos: string }>
  >;
  setIsDropZoneSelected: (b: boolean) => void;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  searchPlayerRef: React.RefObject<HTMLDivElement | null>;
}

const SquadBuilder: React.FC<SquadBuilderProp> = ({
  selectedFormation,
  dropPlayers,
  setSelectedDropZone,
  setIsDropZoneSelected,
  setPosition,
  searchPlayerRef,
}) => {
  // const assignedPlayers = useMemo(() => {
  //   const used = new Set<number>();
  //   const result: { [index: number]: Player | null } = [];

  //   // Flatten all available players into one list
  //   const allPlayers = Object.values(dropPlayers)
  //     .filter((arr): arr is Player[] => Array.isArray(arr))
  //     .flat();

  //   baseFormations[selectedFormation].forEach((_, idx) => {
  //     const player = allPlayers.find((p) => !used.has(p.id));
  //     if (player) {
  //       used.add(player.id);
  //       result[idx] = player;
  //     } else {
  //       result[idx] = null;
  //     }
  //   });

  //   return result;
  // }, [dropPlayers, selectedFormation]);

  const assignedPlayers = useMemo(() => {
    const used = new Set<number>();
    const result: { [index: number]: Player | null } = {};

    // Deep clone dropPlayers to avoid mutating source
    const cloned = Object.fromEntries(
      Object.entries(dropPlayers).map(([pos, list]) => [
        pos,
        list ? [...list] : [],
      ])
    );

    baseFormations[selectedFormation].forEach((posInfo, idx) => {
      const available = cloned[posInfo.pos] || [];
      const player = available.find((p) => !used.has(p.id)) || null;

      if (player) used.add(player.id);
      result[idx] = player;

      // Remove assigned player from that pool
      cloned[posInfo.pos] = available.filter((p) => p.id !== player?.id);
    });

    return result;
  }, [dropPlayers, selectedFormation]);

  return (
    <div className="squad-container">
      <div className="pitch">
        {formations[selectedFormation].map((position, idx) => {
          const player = assignedPlayers[idx];
          return (
            <Button
              className="player"
              key={`drop-${idx}`}
              onClick={() => {
                setSelectedDropZone({
                  index: player?.id ?? -1,
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
                <CroppedAvatar src={player?.img ?? ""} />
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SquadBuilder;
