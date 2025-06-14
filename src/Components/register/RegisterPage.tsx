// src/components/register/Register.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import StepClubName from "../register/StepClubName";
import StepNationality from "../register/StepNationality";
import StepLogo from "../register/StepLogo";
import StepSquadBuilder from "../register/StepSquadBuilder";
import { fetchRandomSquad } from "../../api/squad";
import { updateMyClub, fetchMyClubs } from "../../util/myClubUtil";
import axiosInstance from "../../axiosInstance";
import LoadingSpinner from "../LoadingSpinner";

import { Logo } from "../../types/Logo";
import { useSquadGetters } from "../hooks/useSquadGetters";
import { useSquadSetters } from "../hooks/useSquadSetter";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";

const Register: React.FC = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");
  const [logos, setLogos] = useState<Logo[]>([]);
  const [confirmedLogoId, setConfirmedLogoId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    axiosInstance.get("/api/logos").then((res) => setLogos(res.data));
  }, []);

  useEffect(() => {
    if (currentStep === 3) {
      loadRandomSquad();
    }
    if (currentStep === 4) {
      handleUpdateMyInfo();
      navigate("/squad");
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
          fetchMyClubs(myUserId).then((club) => {
            if (club && club.players) {
              setMySelectedPlayers(club.players);
            }
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
          setCurrentStep(1); // 실패 시 Step 1로 이동
        })
        .finally(() => {
          setLoading(false);
        });
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
