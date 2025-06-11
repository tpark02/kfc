import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Select,
  MenuItem,
  Typography,
  Grid,
  CardContent,
  Snackbar,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import { countryData, getImgByCountryName } from "../../data/countryData";
import axiosInstance from "../../axiosInstance";
import { fetchRandomSquad } from "../../api/squad";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { getStatDisplay } from "../../style/playerStyle";
import { Fade } from "@mui/material";
import SquadMetrics from "../teambuilder/SquadMetrics";
import SquadBuilder from "../teambuilder/SquadBuilder";
import { formations } from "../../data/formations";
import { DropZone } from "../../types/dropZone";
import { playerCardStyle, playerRowStyle } from "../../style/playerCardStyles";
import SelectFormation from "../teambuilder/SelectFormation";

const Register: React.FC = () => {
  const {
    myUserId,
    mySelectedPlayers,
    myFormation,
    myLogoId,
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyUserId,
    setIsDropZoneSelected,
    setMyTeamName,
    setMyNation,
    setMyLogoId,
    setMyLogoImgUrl,
    setMyUniformImgUrl,
  } = useSquadStore(
    (s) => ({
      myLogoId: s.myLogoId,
      myUserId: s.myUserId,
      mySelectedPlayers: s.mySelectedPlayers,
      myFormation: s.myFormation,
      setMyUniformImgUrl: s.setMyUniformImgUrl,
      setMyNation: s.setMyNation,
      setMyTeamName: s.setMyTeamName,
      setMyFormation: s.setMyFormation,
      setMySelectedPlayers: s.setMySelectedPlayers,
      setMyTeamOvr: s.setMyTeamOvr,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyClubs: s.setMyClubs,
      setMyUserId: s.setMyUserId,
      setIsDropZoneSelected: s.setIsDropZoneSelected,
      setMyLogoId: s.setMyLogoId,
      setMyLogoImgUrl: s.setMyLogoImgUrl,
    }),
    shallow
  );
  const stepNames = [
    "Enter your club name",
    "Select your nationality",
    "Choose a team logo",
    "Build your squad",
  ];

  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");

  const [logos, setLogos] = useState<{ id: number; logoImg: string }[]>([]);
  const [selectedLogoId, setSelectedLogoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDropZone, setSelectedDropZone] = useState<DropZone>({
    index: -1,
    pos: "",
  });
  const [selectedPos, setSelectedPosition] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const squadSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await axiosInstance.get("/api/logos");
        setLogos(res.data);
      } catch (err) {
        console.error("Failed to fetch logos:", err);
      }
    };
    fetchLogos();
  }, []);

  const loadRandomSquad = React.useCallback(() => {
    setLoading(true);
    fetchRandomSquad({
      name: myFormation,
      countries: [],
      leagues: [],
      clubs: [],
      userId: myUserId,
    })
      .then((data) => {
        console.log("Random Squad Data:", data.myPlayerList);
        setMySelectedPlayers(data.myPlayerList);
        setMyTeamOvr(data.myTeamOvr);
        setMyTeamSquadValue(data.myTeamSquadValue);
        setMyTeamAge(data.myTeamAge);
        setMyTeamPace(data.myTeamPace);
        setMyTeamDefense(data.myTeamDef);
        setMyTeamAttack(data.myTeamAtk);
        setMyTeamClubCohesion(data.myTeamClubCohesion);
        setMyTeamStamina(data.myTeamStamina);
      })
      .catch((err) => {
        setSnackbarMessage(err.response?.data || "에러 발생");
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  }, [
    myFormation,
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
    setSnackbarMessage,
    setSnackbarOpen,
    setLoading,
  ]);

  useEffect(() => {
    if (currentStep === 3) {
      loadRandomSquad(); // ✅ Trigger squad load as soon as step 3 is shown
    }
  }, [currentStep, loadRandomSquad]);

  console.log("my formation - ", myFormation);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Fade in timeout={500} key={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // center horizontally
                alignItems: "center", // center vertically
                flexDirection: "row", // horizontal layout
              }}
            >
              <Input
                placeholder="Club Name"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  setTeamNameError(""); // 입력 시 에러 초기화
                }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center", // vertically center Input + Button
                  gap: 2,
                  maxWidth: 500,
                  width: "20%",
                  color: "#fff", // ✅ input text color
                  borderBottom: "1px solid #888",
                  "& input": {
                    color: "#fff", // ✅ actual input field color
                  },
                  "&::placeholder": {
                    color: "#ccc", // optional: placeholder color
                  },
                }}
              />
              {teamNameError && (
                <Typography variant="body2" color="error" mt={1}>
                  {teamNameError}
                </Typography>
              )}
            </Box>
          </Fade>
        );
      case 1:
        return (
          <Fade in timeout={500} key={1}>
            <Box>
              <Select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                displayEmpty
                style={{
                  minWidth: 240,
                  color: "#fff",
                  border: "1px solid #888",
                  backgroundColor: "#1e1e1e",
                }}
                inputProps={{ style: { color: "#fff" } }}
              >
                <MenuItem value="" disabled>
                  Select Nationality
                </MenuItem>
                {countryData.map((country, idx) => (
                  <MenuItem
                    key={country.code}
                    value={country.name}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {getImgByCountryName(country.name, idx, 24, 16)}
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 1fr)" // 5 columns
              gap={2} // MUI spacing unit (theme.spacing(2) = 16px)
            >
              {logos.map((logo) => (
                <Box key={logo.id} display="flex" justifyContent="center">
                  <img
                    src={logo.logoImg}
                    alt={`logo-${logo.id}`}
                    width={67}
                    height={80}
                    onClick={() => {
                      setMyLogoId(logo.id);
                      setMyLogoImgUrl(logo.logoImg);
                      setMyUniformImgUrl(
                        `https://jlzddfddozuowxamnreb.supabase.co/storage/v1/object/public/kfc//u${logo.id}-removebg-preview.png`
                      );
                      setCurrentStep((prev) => Math.min(prev + 1, 4));
                    }}
                    style={{
                      border:
                        selectedLogoId === logo.id
                          ? "2px solid #90caf9"
                          : "2px solid transparent",
                      borderRadius: 8,
                      cursor: "pointer",
                      backgroundColor: "#333",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        );
      case 3:
        return (
          <Fade in timeout={500} key={3}>
            <Box sx={{ width: "90%", margin: "0 auto" }}>
              <Grid container spacing={2}>
                {/* Left Panel */}
                <Grid item xs={12} md={2}>
                  <SquadMetrics />
                </Grid>
                {/* Center Panel */}
                <Grid item xs={12} md={8}>                  
                  {myFormation && (
                    <Box>                    
                      {/* ✅ Adds spacing between components */}
                      <SquadBuilder
                        selectedFormation={
                          myFormation as keyof typeof formations
                        }
                        setSelectedDropZone={setSelectedDropZone}
                        setIsDropZoneSelected={setIsDropZoneSelected}
                        setPosition={setSelectedPosition}
                        searchPlayerRef={listRef}
                        selectedDropZone={selectedDropZone}
                      />
                    </Box>
                  )}
                </Grid>
                {/* Right Panel */}
                
                {mySelectedPlayers.length > 0 && (
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
                    {/* 🟦 Starting XI */}
                    {mySelectedPlayers.slice(0, 11).map((player, index) => {
                      if (!player || player.name === "dummy") return null;

                      const safeKey = player.id
                        ? `player-${player.id}`
                        : `fallback-${index}`;
                      return (
                        <CardContent
                          key={safeKey}
                          sx={{
                            ...playerCardStyle,
                          }}
                        >
                          <Box sx={playerRowStyle}>
                            <Typography
                              variant="body2"
                              sx={{
                                flex: "0 0 40px", // POS
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                lineHeight: 1.2, // consistent vertical spacing
                              }}
                            >
                              {player.pos}
                            </Typography>

                            <Typography
                              sx={{
                                flex: 1, // takes all available space
                                fontWeight: 600,
                                textAlign: "center",
                                overflow: "hidden",
                                whiteSpace: "nowrap", // ✅ stay on one line
                                lineHeight: 1.2, // consistent vertical spacing
                              }}
                            >
                              {player.name}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                flex: "0 0 50px", // OVR
                                textAlign: "center",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                lineHeight: 1.2, // consistent vertical spacing
                              }}
                            >
                              {getStatDisplay("OVR", player.ovr)}
                            </Typography>
                          </Box>
                        </CardContent>
                      );
                    })}

                    {/* 🟧 Bench */}
                    <Divider
                      sx={{
                        width: "80%",
                        mt: 2,
                        mb: 2,
                        borderColor: "#888", // customize divider color
                      }}
                    />
                    {mySelectedPlayers.slice(11).map((player, index) => {
                      if (!player || player.name === "dummy") return null;
                      console.log("name - ", player.img);
                      const safeKey = player.id
                        ? `bench-player-${player.id}`
                        : `bench-fallback-${index}`;
                      return (
                        <CardContent
                          key={safeKey}
                          sx={{
                            ...playerCardStyle,
                          }}
                        >
                          <Box sx={playerRowStyle}>
                            <Typography
                              variant="body2"
                              sx={{
                                flex: "0 0 40px", // POS
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                lineHeight: 1.2, // consistent vertical spacing
                              }}
                            >
                              {player.pos}
                            </Typography>

                            <Typography
                              sx={{
                                flex: 1, // takes all available space
                                fontWeight: 600,
                                textAlign: "center",
                                overflow: "hidden",
                                whiteSpace: "nowrap", // ✅ stay on one line
                                lineHeight: 1.2, // consistent vertical spacing
                              }}
                            >
                              {player.name}
                            </Typography>

                            <Typography
                              variant="h6"
                              sx={{
                                flex: "0 0 50px", // OVR
                                textAlign: "center",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                lineHeight: 1.2, // consistent vertical spacing
                              }}
                            >
                              {getStatDisplay("OVR", player.ovr)}
                            </Typography>
                          </Box>
                        </CardContent>
                      );
                    })}
                  </Grid>
                )}
              </Grid>

              {/* Snackbar should be outside Grid to avoid layout issues */}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
                  {typeof snackbarMessage === "string"
                    ? snackbarMessage
                    : JSON.stringify(snackbarMessage)}
                </Alert>
              </Snackbar>
            </Box>
          </Fade>
        );

      default:
        return null;
    }
  };

  const [teamNameError, setTeamNameError] = useState(""); // validation 메시지

  const validateTeamName = (): boolean => {
    if (teamName.length === 0) {
      setTeamNameError("Team name is required.");
      return false;
    }
    if (teamName.length > 10) {
      setTeamNameError("Team name must be 10 characters or less.");
      return false;
    }
    if (!/^[A-Za-z0-9]+$/.test(teamName)) {
      setTeamNameError("Team name must contain only letters and numbers.");
      return false;
    }
    if (/^[0-9]+$/.test(teamName)) {
      setTeamNameError("Team name cannot be numbers only.");
      return false;
    }
    setTeamNameError(""); // ✅ 모든 조건 통과
    setMyTeamName(teamName); // 팀 이름 저장
    return true;
  };

  return (
    <div className="app-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "94px", // ✅ Set minimum height so it doesn’t collapse
        }}
      >
        <Box
          mt={4}
          sx={{
            position: "relative",
            outline: "1px solid gray",
            display: "flex", // ✅ Add this
            alignItems: "center", // ✅ Vertically align
            justifyContent: "space-between", // Optional: space them out
            gap: 2, // Optional: spacing between Typography & Button
          }}
        >
          <Typography variant="h4">{stepNames[currentStep]}</Typography>

          {currentStep === 3 && (
            <Button
              variant="contained"
              onClick={() => {
                setCurrentStep((prev) => Math.min(prev + 1, 4));
              }}
              disabled={currentStep >= 4}
            >
              Next
            </Button>
          )}
        </Box>

        <Box mt={4}>
          {currentStep === 3 && (
            <Button
              variant="contained"
              color="primary"
              onClick={loadRandomSquad}
              disabled={loading}
              sx={{ marginBottom: 2 }}
            >
              Random Team
            </Button>
          )}
        </Box>
      </Box>
      {renderStep()}
      {currentStep !== 3 && (
        <Box mt={4}>
          <Button
            variant="contained"
            onClick={() => {
              if (currentStep === 0 && !validateTeamName()) return;
              setCurrentStep((prev) => Math.min(prev + 1, 4));
            }}
            disabled={currentStep >= 4}
          >
            Next
          </Button>
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {typeof snackbarMessage === "string"
            ? snackbarMessage
            : JSON.stringify(snackbarMessage)}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
