// ✅ Step 3: StepSquadBuilder.tsx
import React from "react";
import { Box, Grid } from "@mui/material";
import SquadBuilder from "../squad/SquadBuilder";
import SquadMetrics from "../squad/SquadMetrics";
import SelectFormation from "../squad/SelectFormation";
import { formations } from "../../data/formations";
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";
import DraggableAndDroppablePlayerCard from "./DraggableAndDroppablePlayerCard";

const StepSquadBuilder: React.FC = () => {
  const { myFormation, mySelectedPlayers, setMySelectedPlayers } =
    useSquadStore(
      (s) => ({
        myFormation: s.myFormation,
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
          <Box margin={1}>{"STARTING"}</Box>

          {mySelectedPlayers.slice(0, 11).map((player, index) => {
            if (!player || player.name === "dummy") return null;

            return (
              <DraggableAndDroppablePlayerCard
                key={`starter-${player.id}-${index}`}
                index={index}
                player={player}
                onSwap={handleSwapPlayers}
                isDelete={false}
              />
            );
          })}

          <Box margin={1}>{"BENCH"}</Box>

          {mySelectedPlayers.slice(11).map((player, index) => {
            if (!player || player.name === "dummy") return null;

            return (
              <DraggableAndDroppablePlayerCard
                key={`bench-${player.id}-${index}`}
                index={11 + index}
                player={player}
                onSwap={handleSwapPlayers}
                isDelete={false}
              />
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepSquadBuilder;
