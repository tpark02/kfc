// Squad.tsx
import React, { useState, useRef, useEffect } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import { shallow } from "zustand/shallow";

// API
import { fetchRandomSquad } from "../../api/squad";
import { fetchMyClubs } from "../../util/myClubUtil";

// Store
import { useSquadStore } from "../../store/useSquadStore";

// Components
import MyClub from "../myclub/MyClub";
import SquadMetrics from "./SquadMetrics";
import SquadBuilder from "./SquadBuilder";
import SelectFormation from "./SelectFormation";
import LoadingSpinner from "../LoadingSpinner";

// Data
import { formations } from "../../data/formations";

// Types
import { DropZone } from "../../types/dropZone";
import { Country } from "../../types/country";
import { League } from "../../types/league";
import { Team } from "../../types/team";

// Styles
import "../../style/Squad.css";

const Squad: React.FC = () => {
  const {
    myUserId,
    myFormation,
    setMySelectedPlayers,
    setMyTeamOvr,
    setIsDropZoneSelected,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyClubs,
    setMyUserId,
  } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
      myFormation: s.myFormation,
      setMyTeamOvr: s.setMyTeamOvr,
      setIsDropZoneSelected: s.setIsDropZoneSelected,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyClubs: s.setMyClubs,
      setMyUserId: s.setMyUserId,
      setMySelectedPlayers: s.setMySelectedPlayers,
    }),
    shallow
  );

  // State
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<League[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<Team[]>([]);
  const [selectedPos, setSelectedPosition] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedDropZone, setSelectedDropZone] = useState<DropZone>({
    index: -1,
    pos: "",
  });
  const [loading, setLoading] = useState(false);

  const squadSelectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMyUserId(1); // 임시 user ID
  }, []);

  useEffect(() => {
    if (myUserId === -1) return;

    fetchMyClubs(myUserId)
      .then((clubs) => {
        // const padded = Array(3).fill(null);
        // clubs.forEach((club, idx) => (padded[idx] = club ?? null));
        setMyClubs(clubs);
      })
      .catch((err) => console.error("❌ 클럽 설정 실패:", err));
  }, [myUserId]);

  const loadRandomSquad = () => {
    setLoading(true);
    fetchRandomSquad({
      name: myFormation,
      countries: selectedCountries,
      leagues: selectedLeagues,
      clubs: selectedClubs,
      userId: myUserId,
    })
      .then((data) => {
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
  };

  return (
    <div className="app-container">
      {loading && <LoadingSpinner />}
      <div className="squad-container">
        <SquadMetrics />

        <div className="squad-formation" ref={squadSelectRef}>
          {myFormation && (
            <SquadBuilder
              selectedFormation={myFormation as keyof typeof formations}
              setSelectedDropZone={setSelectedDropZone}
              setIsDropZoneSelected={setIsDropZoneSelected}
              setPosition={setSelectedPosition}
              searchPlayerRef={listRef}
              selectedDropZone={selectedDropZone}
            />
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

        <div className="squad-team">
          <div className="team-controls">
            <SelectFormation />
            <Button
              variant="contained"
              color="secondary"
              onClick={loadRandomSquad}
              sx={{ margin: "10px" }}
            >
              Create Squad
            </Button>
          </div>

          <div className="myclub-container">
            <MyClub
              snackbarOpen={snackbarOpen}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Squad;
