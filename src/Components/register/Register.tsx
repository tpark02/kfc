// Register.tsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import StepClubName from "../register/StepClubName";
import StepNationality from "../register/StepNationality";
import StepLogo from "../register/StepLogo";
import StepSquadBuilder from "../register/StepSquadBuilder";
import { useSquadStore } from "../../store/useSquadStore";
import { DropZone } from "../../types/dropZone";
import { Logo } from "../../types/Logo";
import axiosInstance from "../../axiosInstance";
import { fetchRandomSquad } from "../../api/squad";

const Register: React.FC = () => {
  const {
    myFormation,
    mySelectedPlayers,
    myUserId,
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
    setIsDropZoneSelected,
  } = useSquadStore();

  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");
  const [logos, setLogos] = useState<Logo[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<Logo>({
    id: -1,
    logoImg: "",
  });
  const [confirmedLogoId, setConfirmedLogoId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [teamNameError, setTeamNameError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedDropZone, setSelectedDropZone] = useState<DropZone>({
    index: -1,
    pos: "",
  });
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/logos").then((res) => setLogos(res.data));
  }, []);

  useEffect(() => {
    if (currentStep === 3) {
      loadRandomSquad();
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
    if (!teamName) return setTeamNameError("Team name is required."), false;
    if (teamName.length > 10)
      return setTeamNameError("Max 10 characters."), false;
    if (!/^[A-Za-z0-9]+$/.test(teamName))
      return setTeamNameError("Only English letters and numbers."), false;
    if (/^[0-9]+$/.test(teamName))
      return setTeamNameError("Cannot be numbers only."), false;
    setMyTeamName(teamName);
    setTeamNameError("");
    return true;
  };

  const validateNationality = () => {
    if (!nationality) {
      setTeamNameError("Please select a nationality.");
      return false;
    }
    setMyNation(nationality);
    return true;
  };
  console.log("✅ setMySelectedPlayers", mySelectedPlayers);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Step {currentStep + 1}
      </Typography>

      {currentStep === 0 && (
        <StepClubName
          teamName={teamName}
          setTeamName={setTeamName}
          error={teamNameError}
          clearError={() => setTeamNameError("")}
        />
      )}
      {currentStep === 1 && (
        <StepNationality
          nationality={nationality}
          setNationality={setNationality}
          error={teamNameError}
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
            setTeamNameError(""); // 선택 시 오류 제거
          }}
          error={teamNameError}
        />
      )}
      {currentStep === 3 && (
        <StepSquadBuilder
          myFormation={myFormation}
          setSelectedPosition={() => {}}
          listRef={listRef}
        />
      )}

      {currentStep < 4 && (
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => {
            if (currentStep === 0 && !validateTeamName()) return;
            if (currentStep === 1 && !validateNationality()) return;
            if (currentStep === 2 && confirmedLogoId === null) {
              setTeamNameError("Please select a logo before continuing.");
              return;
            }
            setCurrentStep((prev) => prev + 1);
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
