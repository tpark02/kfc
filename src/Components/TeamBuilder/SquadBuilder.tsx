import React from "react";
import { formations } from "../../data/formations";
import { Button } from "@mui/material";
import { useSquadStore } from "../../store/useSquadStore";
import { MyPlayer } from "../../types/player";
import { shallow } from "zustand/shallow";

import "../../style/SquadBuilder.css";
import "../../DropZone.css";

interface SquadBuilderProp {
  selectedFormation: keyof typeof formations;
  // searchPlayerRef: React.RefObject<HTMLDivElement | null>;
}

const SquadBuilder: React.FC<SquadBuilderProp> = ({
  // searchPlayerRef,
  selectedFormation,
}) => {
  const {
    myLogoImgUrl,
    mySelectedPlayers,
    dropZoneList,
    setDropZoneList,
    setMySelectedPlayers,
    resetDropZoneList,
  } = useSquadStore(
    (s) => ({
      myLogoImgUrl: s.myLogoImgUrl,
      mySelectedPlayers: s.mySelectedPlayers,
      dropZoneList: s.dropZoneList,
      setDropZoneList: s.setDropZoneList,
      setMySelectedPlayers: s.setMySelectedPlayers,
      resetDropZoneList: s.resetDropZoneList,
    }),
    shallow
  );

  const handlePlayerClick = (idx: number, pos: string) => {
    const len = dropZoneList.length;

    if (len < 1) {
      setDropZoneList(dropZoneList, { index: idx, pos });
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

      setMySelectedPlayers(updatedPlayers);
      resetDropZoneList();
    }

    // if (searchPlayerRef.current) {
    //   searchPlayerRef.current.scrollTop = 0;
    // }
  };

  return (
    <div className="squad-field">
      {formations[selectedFormation].map((position, idx) => {
        const pos = position.pos.replace(/[0-9]/g, "");
        const player = mySelectedPlayers
          .filter((p): p is MyPlayer => !!p)
          .sort((a, b) => a.idx - b.idx)
          .find((p) => p.idx === idx);

        return (
          <Button
            key={`starting-${idx}`}
            onClick={() => handlePlayerClick(idx, pos)}
            style={{
              color: "red",
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
              src={player?.name !== "dummy" ? myLogoImgUrl : "/img/avatar.jpg"}
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
  );
};

export default SquadBuilder;
