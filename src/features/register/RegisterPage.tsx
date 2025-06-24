// src/components/register/Register.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import StepClubName from "./StepClubName";
import StepNationality from "./StepNationality";
import StepLogo from "./StepLogo";
import StepSquadBuilder from "./StepSquadBuilder";
import { fetchRandomSquad } from "../../api/squad";
import { updateMyClub } from "../../util/myClubUtil";
import axiosInstance from "../../app/axiosInstance";

import { Logo } from "../../types/Logo";
import { useSquadGetters } from "../../hooks/useSquadGetters";
import { useSquadSetters } from "../../hooks/useSquadSetter";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";

import { useSnackbarStore } from "../../store/userSnackBarStore";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";
import { useTheme } from "@mui/material/styles";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  // ✅ Zustand getters
  const {
    myFormation,
    myUserId,
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
    // myClubs,
  } = useSquadGetters();

  // ✅ Zustand setters
  const {
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
  } = useSquadSetters();

  const {
    myTeamName,
    setMyLogoId,
    setMyLogoImgUrl,
    setMyTeamName,
    setMyNation,
  } = useSquadStore(
    (s) => ({
      myTeamName: s.myTeamName,
      setMyLogoId: s.setMyLogoId,
      setMyNation: s.setMyNation,
      setMyTeamName: s.setMyTeamName,
      setMyLogoImgUrl: s.setMyLogoImgUrl,
    }),
    shallow
  );

  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");
  const [logos, setLogos] = useState<Logo[]>([]);
  const [confirmedLogoId, setConfirmedLogoId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    axiosInstance.get("/logos").then((res) => setLogos(res.data));
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

      useLoadingSpinnerStore.getState().setIsLoading(true);
      setMySelectedPlayers(data.myPlayerList);
      setMyTeamOvr(data.myTeamOvr);
      setMyTeamSquadValue(data.myTeamSquadValue);
      setMyTeamAge(data.myTeamAge);
      setMyTeamPace(data.myTeamPace);
      setMyTeamDefense(data.myTeamDef);
      setMyTeamAttack(data.myTeamAtk);
      setMyTeamClubCohesion(data.myTeamClubCohesion);
      setMyTeamStamina(data.myTeamStamina);

      setMySelectedPlayers(data.myPlayerList);
      console.log("✅ Selected Players:", data.myPlayerList);

      setMyTeamOvr(data.myTeamOvr);
      console.log("📊 Team OVR:", data.myTeamOvr);

      setMyTeamSquadValue(data.myTeamSquadValue);
      console.log("💰 Squad Value:", data.myTeamSquadValue);

      setMyTeamAge(data.myTeamAge);
      console.log("🎂 Average Age:", data.myTeamAge);

      setMyTeamPace(data.myTeamPace);
      console.log("⚡ Pace:", data.myTeamPace);

      setMyTeamDefense(data.myTeamDef);
      console.log("🛡️ Defense:", data.myTeamDef);

      setMyTeamAttack(data.myTeamAtk);
      console.log("⚔️ Attack:", data.myTeamAtk);

      setMyTeamClubCohesion(data.myTeamClubCohesion);
      console.log("🤝 Club Cohesion:", data.myTeamClubCohesion);

      setMyTeamStamina(data.myTeamStamina);
      console.log("🏃‍♂️ Stamina:", data.myTeamStamina);
    } catch (err: any) {
      useSnackbarStore
        .getState()
        .setSnackbar(err.response?.data || "Error loading squad");
    }
  };

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
          localStorage.removeItem("token");
          navigate("/login");
        })
        .catch((err) => {
          const msg =
            typeof err === "string"
              ? err
              : err?.response?.data?.message ||
                JSON.stringify(err?.response?.data ?? err, null, 2);
          useSnackbarStore.getState().setSnackbar(msg);

          setCurrentStep(1);
        })
        .finally(() => {
          useLoadingSpinnerStore.getState().setIsLoading(false);
        });
    }
  };

  const validateTeamName = () => {
    if (!teamName) {
      useSnackbarStore.getState().setSnackbar("Team name is required.");

      return false;
    }
    if (teamName.length > 10) {
      useSnackbarStore.getState().setSnackbar("Max 10 characters.");
      return false;
    }
    if (!/^[A-Za-z0-9]+$/.test(teamName)) {
      useSnackbarStore
        .getState()
        .setSnackbar("Only English letters and numbers.");
      return false;
    }
    if (/^[0-9]+$/.test(teamName)) {
      useSnackbarStore.getState().setSnackbar("Cannot be numbers only.");
      return false;
    }
    setMyTeamName(teamName);
    return true;
  };

  const validateNationality = () => {
    if (!nationality) {
      useSnackbarStore.getState().setSnackbar("Please select a nationality.");
      return false;
    }
    setMyNation(nationality);
    return true;
  };

  const validateLogoSelection = () => {
    if (currentStep === 2 && confirmedLogoId === null) {
      useSnackbarStore
        .getState()
        .setSnackbar("Please select a logo before continuing.");
      return false;
    }
    return true;
  };

  const getCurrentStepLabel = (): string => {
    switch (currentStep + 1) {
      case 1:
        return "Club Name";
      case 2:
        return "Club Nationality";
      case 3:
        return "Club Crest";
      case 4:
        return "Club Roster";
      default:
        return "";
    }
  };

  return currentStep !== 3 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: {
          xs: "flex-start",
          md: "center",
        },        
        minHeight: "100vh",
        mt: {
          xs: 5,
          md: 0,
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          width: {
            xs: "90vw",
            md: "40vw",
          },
          height: "60vh",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <Box sx={{ backgroundColor: theme.palette.navbar.main }}>
          <Typography
            variant="h4"
            mt={2}
            mb={2}
            sx={{
              textAlign: "center",
            }}
          >
            {getCurrentStepLabel()}
          </Typography>
        </Box>
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
            }}
          />
        )}
        {currentStep < 4 && (
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              if (currentStep === 0 && !validateTeamName()) return;
              if (currentStep === 1 && !validateNationality()) return;
              if (currentStep === 2 && !validateLogoSelection()) return;
              setCurrentStep((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" mb={2}>
        {getCurrentStepLabel()}
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 4 }}
        onClick={() => {
          handleUpdateMyInfo();
        }}
      >
        Next
      </Button>
      <StepSquadBuilder />
    </Box>
  );
};

export default Register;
