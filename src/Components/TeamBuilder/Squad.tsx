import React, { useEffect } from "react";
import { Box, Grid, Divider, Button } from "@mui/material";
import SquadBuilder from "../teambuilder/SquadBuilder";
import SquadMetrics from "../teambuilder/SquadMetrics";
import SelectFormation from "../teambuilder/SelectFormation";
import { formations } from "../../data/formations";
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";
import DraggableAndDroppablePlayerCard from "../../components/register/DraggableAndDroppablePlayerCard";
import { updateMyClub, fetchMyClubs } from "../../util/myClubUtil";
import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { getTeamAvr } from "./SquadBuilderUtil";

const Squad: React.FC = () => {
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

  const {
    myFormation,
    myUserId,
    myTeamName,
    myNation,
    myLogoId,
    mySelectedPlayers,
    myTeamOvr,
    myTeamSquadValue,
    myTeamAge,
    myTeamPace,
    myTeamDefense,
    myTeamClubCohesion,
    myTeamAttack,
    myTeamStamina,
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
  } = useSquadStore(
    (s) => ({
      myFormation: s.myFormation,
      mySelectedPlayers: s.mySelectedPlayers,
      myUserId: s.myUserId,
      myClubs: s.myClubs,
      myTeamName: s.myTeamName,
      myNation: s.myNation,
      myLogoId: s.myLogoId,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      myTeamAge: s.myTeamAge,
      myTeamPace: s.myTeamPace,
      myTeamDefense: s.myTeamDefense,
      myTeamClubCohesion: s.myTeamClubCohesion,
      myTeamAttack: s.myTeamAttack,
      myTeamStamina: s.myTeamStamina,

      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyLogoId: s.setMyLogoId,
      setMyLogoImgUrl: s.setMyLogoImgUrl,
      setMyTeamName: s.setMyTeamName,
      setMyNation: s.setMyNation,
    }),
    shallow
  );

  const handleUpdateMyInfo = () => {
    useLoadingSpinnerStore.getState().setIsLoading(true);

    if (myTeamName.length > 0) {
      updateMyClub(
        myNation,
        myLogoId,
        mySelectedPlayers,
        myUserId,
        1,
        myTeamName,
        myFormation,
        myTeamOvr,
        myTeamSquadValue,
        myTeamAge,
        myTeamPace,
        myTeamDefense,
        myTeamAttack,
        myTeamClubCohesion,
        myTeamStamina
      )
        .then((msg) => {
          useSnackbarStore.getState().setSnackbar(msg);
          console.log("1");
          fetchMyClubs(myUserId).then((club) => {
            const updatedClub = club ?? undefined;

            if (updatedClub && updatedClub.players) {
              setMySelectedPlayers(updatedClub.players);
            }
            console.log("my club.tsx selected players - ", mySelectedPlayers);
          });
        })
        .catch((err) => {
          const msg =
            typeof err === "string"
              ? err
              : err?.response?.data?.message ||
                JSON.stringify(err?.response?.data ?? err, null, 2);
          useSnackbarStore.getState().setSnackbar(msg);
        })
        .finally(() => {
          useLoadingSpinnerStore.getState().setIsLoading(false);
          //   setEditingIndex(null);
        });
    }
    // setLoading(false);
    // setEditingIndex(null);
  };

  useEffect(() => {
    useLoadingSpinnerStore.getState().setIsLoading(true);
    console.log("2");
    fetchMyClubs(myUserId)
      .then((club) => {
        const updatedClub = club ?? undefined;

        if (updatedClub && updatedClub.players) {

          setMySelectedPlayers(updatedClub.players);
          setMyTeamOvr(updatedClub.ovr);
          setMyTeamPace(updatedClub.pace);
          setMyTeamAttack(updatedClub.attack);
          setMyTeamDefense(updatedClub.defense);
          setMyTeamStamina(updatedClub.stamina);
          setMyTeamClubCohesion(updatedClub.clubCohesion);
          setMyTeamSquadValue(updatedClub.price);
        }
      })
      .catch((err) => {
        const msg =
          typeof err === "string"
            ? err
            : err?.response?.data?.message ||
              JSON.stringify(err?.response?.data ?? err, null, 2);
        useSnackbarStore.getState().setSnackbar(msg);
      })
      .finally(() => {
        useLoadingSpinnerStore.getState().setIsLoading(false);
        //   setEditingIndex(null);
      });
  }, [myUserId, setMySelectedPlayers]);

  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <SquadMetrics />
        </Grid>
        <Grid item xs={12} md={7}>
          <SquadBuilder
            selectedFormation={myFormation as keyof typeof formations}
            // setSelectedDropZone={setSelectedDropZone}
            // setIsDropZoneSelected={setIsDropZoneSelected}
            // setPosition={setSelectedPosition}
            // searchPlayerRef={listRef}
            // selectedDropZone={selectedDropZone}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
            // outline:"1px solid red"
          }}
        >
          <Button
            variant="contained"
            sx={{
              display: "flex",
              width: "100%",
              marginBottom: "10px",
            }}
            onClick={handleUpdateMyInfo}
          >
            Save
          </Button>
          <SelectFormation />
          <Box mb={1}></Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              // outline: "1px solid red",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                // outline: "1px solid red",
              }}
            >
              <Box mb={1}>{"STARTING"}</Box>
              {mySelectedPlayers.slice(0, 11).map((player, index) => {
                // if (!player || player.name === "dummy") return null;

                return (
                  <DraggableAndDroppablePlayerCard
                    key={`starter-${player.id}-${index}`}
                    index={index} // ✅ 추가
                    player={player}
                    onSwap={handleSwapPlayers}
                  />
                );
              })}
            </Box>
            <Box ml={1}></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                // outline: "1px solid red",
              }}
            >
              <Box mb={1}>{"BENCH"}</Box>
              {mySelectedPlayers.slice(11, 17).map((player, index) => {
                // if (!player || player.name === "dummy") return null;
                console.log("players - ", player);
                return (
                  <DraggableAndDroppablePlayerCard
                    key={`bench-${player.id}-${index}`} // ✅ index 함께 사용!
                    index={11 + index} // ✅ bench는 offset 줘야 돼
                    player={player}
                    onSwap={handleSwapPlayers}
                  />
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
              gridTemplateRows: "repeat(5, auto)", // 5 rows
              gap: 1,
              width: "100%",
            }}
          >
            <Box gridColumn="1 / -1" mb={1} sx={{ textAlign: "center" }}>
              {"RESERVE"}
            </Box>

            {mySelectedPlayers.slice(17, 27).map((player, index) => (
              <DraggableAndDroppablePlayerCard
                key={`reserve-${player.id}-${index}`}
                index={17 + index}
                player={player}
                onSwap={handleSwapPlayers}
              />
            ))}
          </Box>

          {/* <Button
            onClick={() => {
              const reversed = [...mySelectedPlayers].reverse();
              reversed.forEach((p, i) => (p.idx = i));
              setMySelectedPlayers([...reversed]);
            }}
          >
            테스트로 뒤집기
          </Button> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Squad;
