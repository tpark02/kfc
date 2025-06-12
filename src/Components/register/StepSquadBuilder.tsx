// ✅ Step 3: StepSquadBuilder.tsx
import React from "react";
import { Button, Box, Grid, Divider } from "@mui/material";
import SquadBuilder from "../teambuilder/SquadBuilder";
import SquadMetrics from "../teambuilder/SquadMetrics";
import SelectFormation from "../teambuilder/SelectFormation";
import { formations } from "../../data/formations";
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";
import { MyPlayer } from "../../types/player";
import DraggableAndDroppablePlayerCard from "./DraggableAndDroppablePlayerCard";

interface StepSquadBuilderProps {
  myFormation: string;
  //   mySelectedPlayers: MyPlayer[];
  //   selectedDropZone: DropZone;
  //   setSelectedDropZone: (drop: DropZone) => void;
  //   setIsDropZoneSelected: (b: boolean) => void;
  setSelectedPosition: (pos: string) => void;
  //   setMySelectedPlayers: (players: MyPlayer[]) => void;
  listRef: React.RefObject<HTMLDivElement>;
}

const StepSquadBuilder: React.FC<StepSquadBuilderProps> = ({
  myFormation,
  //   mySelectedPlayers,
  //   setMySelectedPlayers,
  //   selectedDropZone,
  //   setSelectedDropZone,
  //   setIsDropZoneSelected,
  //   setSelectedPosition,
  listRef,
}) => {
  // ✅ StepSquadBuilder.tsx 상단에서
  const { mySelectedPlayers, setMySelectedPlayers } = useSquadStore(
    (s) => ({
      mySelectedPlayers: s.mySelectedPlayers,
      setMySelectedPlayers: s.setMySelectedPlayers,
    }),
    shallow
  );

  const handleSwapPlayers = (sourceIdx: number, targetIdx: number) => {
    const updated = [...mySelectedPlayers];

    // swap
    [updated[sourceIdx], updated[targetIdx]] = [
      updated[targetIdx],
      updated[sourceIdx],
    ];

    // ✅ idx 값도 실제 위치에 맞춰 갱신
    updated.forEach((p, i) => {
      p.idx = i;
    });

    setMySelectedPlayers(updated);
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <SquadMetrics />
        </Grid>
        <Grid item xs={12} md={8}>
          <SquadBuilder
            selectedFormation={myFormation as keyof typeof formations}
            // setSelectedDropZone={setSelectedDropZone}
            // setIsDropZoneSelected={setIsDropZoneSelected}
            // setPosition={setSelectedPosition}
            searchPlayerRef={listRef}
            // selectedDropZone={selectedDropZone}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SelectFormation />
          <Box mb={1}></Box>

          {mySelectedPlayers.slice(0, 11).map((player, index) => {
            if (!player || player.name === "dummy") return null;

            return (
              <DraggableAndDroppablePlayerCard
                key={`starter-${player.id}-${index}`}
                index={index} // ✅ 추가
                player={player}
                onSwap={handleSwapPlayers}
              />
            );
          })}

          <Divider sx={{ width: "80%", mt: 2, mb: 2, borderColor: "#888" }} />

          {mySelectedPlayers.slice(11).map((player, index) => {
            if (!player || player.name === "dummy") return null;

            return (
              <DraggableAndDroppablePlayerCard
                key={`bench-${player.id}-${index}`} // ✅ index 함께 사용!
                index={11 + index} // ✅ bench는 offset 줘야 돼
                player={player}
                onSwap={handleSwapPlayers}
              />
            );
          })}
          <Button
            onClick={() => {
              const reversed = [...mySelectedPlayers].reverse();
              reversed.forEach((p, i) => (p.idx = i));
              setMySelectedPlayers([...reversed]);
            }}
          >
            테스트로 뒤집기
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepSquadBuilder;
