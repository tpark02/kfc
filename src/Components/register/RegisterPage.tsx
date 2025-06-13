// Register.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import StepClubName from "../register/StepClubName";
import StepNationality from "../register/StepNationality";
import StepLogo from "../register/StepLogo";
import StepSquadBuilder from "../register/StepSquadBuilder";
import { useSquadStore } from "../../store/useSquadStore";
// import { DropZone } from "../../types/dropZone";
import { Logo } from "../../types/Logo";
import axiosInstance from "../../axiosInstance";
import { fetchRandomSquad } from "../../api/squad";
import { shallow } from "zustand/shallow";
import { updateMyClub, fetchMyClubs } from "../../util/myClubUtil";
import LoadingSpinner from "../LoadingSpinner";

const Register: React.FC = () => {
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
    myClubs,
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyLogoId,
    setMyLogoImgUrl,
    setMyUniformImgUrl,
    setMyTeamName,
    setMyNation,
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
      setMyUniformImgUrl: s.setMyUniformImgUrl,
      setMyTeamName: s.setMyTeamName,
      setMyNation: s.setMyNation,
      // setIsDropZoneSelected: s.setIsDropZoneSelected,
    }),
    shallow
  );

  const handleUpdateMyInfo = () => {
    setLoading(true);

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
        myTeamClubCohesion,
        myTeamAttack,
        myTeamStamina
      )
        .then((msg) => {
          setSnackbarMessage(msg);
          setSnackbarOpen(true);
          fetchMyClubs(myUserId).then((clubs) => {
            console.log("my club.tsx updated clubs - ", clubs);
            const updatedClub = clubs.find((c) => c.clubId === 1);
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
          setSnackbarMessage(msg);
          setSnackbarOpen(true);
          // ✅ 에러 발생 시 Step 1로 이동
          setCurrentStep(1);
        })
        .finally(() => {
          setLoading(false);
          //   setEditingIndex(null);
        });
    }
    // setLoading(false);
    // setEditingIndex(null);
  };
  const [loading, setLoading] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");
  const [logos, setLogos] = useState<Logo[]>([]);
  // const [selectedLogo, setSelectedLogo] = uses<Logo>({
  //   id: -1,
  //   logoImg: "",
  // });
  const [confirmedLogoId, setConfirmedLogoId] = useState<number | null>(null);
  // const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  // const [logoError, setLogoError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [selectedDropZone, setSelectedDropZone] = useState<DropZone>({
  //   index: -1,
  //   pos: "",
  // });
  // const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/logos").then((res) => setLogos(res.data));
  }, []);

  useEffect(() => {
    if (currentStep === 3) {
      console.log("load random team  user id - ", myUserId);
      loadRandomSquad();
    }
    if (currentStep === 4) {
      handleUpdateMyInfo();
    }
  }, [currentStep]);

  const loadRandomSquad = async () => {
    try {
      const data = await fetchRandomSquad({
        name: myFormation,
        countries: [],
        leagues: [],
        clubs: [],
        userId: myUserId,
      });
      setMySelectedPlayers(data.myPlayerList);
      setMyTeamOvr(data.myTeamOvr);
      setMyTeamSquadValue(data.myTeamSquadValue);
      setMyTeamAge(data.myTeamAge);
      setMyTeamPace(data.myTeamPace);
      setMyTeamDefense(data.myTeamDef);
      setMyTeamAttack(data.myTeamAtk);
      setMyTeamClubCohesion(data.myTeamClubCohesion);
      setMyTeamStamina(data.myTeamStamina);
    } catch (err: any) {
      setSnackbarMessage(err.response?.data || "Error loading squad");
      setSnackbarOpen(true);
    }
  };

  const validateTeamName = () => {
    if (!teamName) {
      setSnackbarMessage("Team name is required.");
      setSnackbarOpen(true);
      return false;
    }
    if (teamName.length > 10) {
      setSnackbarMessage("Max 10 characters.");
      setSnackbarOpen(true);
      return false;
    }
    if (!/^[A-Za-z0-9]+$/.test(teamName)) {
      setSnackbarMessage("Only English letters and numbers.");
      setSnackbarOpen(true);
      return false;
    }
    if (/^[0-9]+$/.test(teamName)) {
      setSnackbarMessage("Cannot be numbers only.");
      setSnackbarOpen(true);
      return false;
    }
    setMyTeamName(teamName);
    return true;
  };

  const validateNationality = () => {
    if (!nationality) {
      setSnackbarMessage("Please select a nationality.");
      setSnackbarOpen(true);
      return false;
    }
    setMyNation(nationality);
    return true;
  };

  const validateLogoSelection = () => {
    if (currentStep === 2 && confirmedLogoId === null) {
      setSnackbarMessage("Please select a logo before continuing.");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  console.log("my data 1- ", myUserId);
  console.log("my data 2- ", mySelectedPlayers);
  console.log("my data 3- ", myClubs);
  console.log("my data 4- ", myFormation);
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {loading && <LoadingSpinner />}
      <Typography variant="h4" mb={2}>
        Step {currentStep + 1}
      </Typography>

      {currentStep === 0 && (
        <StepClubName teamName={teamName} setTeamName={setTeamName} />
      )}
      {currentStep === 1 && (
        <StepNationality
          nationality={nationality}
          setNationality={setNationality}
        />
      )}
      {currentStep === 2 && (
        <StepLogo
          logos={logos}
          confirmedLogoId={confirmedLogoId}
          onSelect={(logo) => {
            setConfirmedLogoId(logo.id);
            setMyLogoId(logo.id);
            setMyLogoImgUrl(logo.logoImg);
            setMyUniformImgUrl(
              `https://jlzddfddozuowxamnreb.supabase.co/storage/v1/object/public/kfc//u${logo.id}-removebg-preview.png`
            );
          }}
        />
      )}
      {currentStep === 3 && <StepSquadBuilder />}
      {currentStep < 4 && (
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => {
            if (currentStep === 0 && !validateTeamName()) return;
            if (currentStep === 1 && !validateNationality()) return;
            if (currentStep === 2 && !validateLogoSelection()) return;
            setCurrentStep((prev: number) => prev + 1);
          }}
        >
          Next
        </Button>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
