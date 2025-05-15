import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Snackbar, Alert, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useSquadStore } from "../../store/useSquadStore";
// 타입
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import { League } from "../../types/League";
import { ResponseRandomSquad } from "../../types/Response";
import { Club } from "../../types/Club"; // ✅ Add this import
import { Country } from "../../types/Country";
import { formations } from "../../data/formations";
import SquadMetrics from "./SquadMetrics";
// 컴포넌트
import SquadBuilder from "./SquadBuilder";
import SelectFormation from "./SelectFormation";
import SearchPlayer from "./SearchPlayer"; // ✅ default export
import SearchCountry from "./SearchCountry";
import SearchLeague from "./SearchLeague";
import SearchClub from "./SearchClub";
import Filters from "../Players/Filter";
import LoadingSpinner from "../LoadingSpinner";
import { fetchMyClubs } from "../MyClub/MyClubUtil";
import MyClub from "../MyClub/MyClub";
// 스타일
import "../../style/Squad.css";

const Squad: React.FC = () => {
  const {
    myUserId,
    myFormation,
    dropPlayers,
    setDropPlayers,
    setMyTeamName,
    setMyTeamOvr,
    isDropZoneSelected,
    setIsDropZoneSelected,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyClubs,
    setuserId,
  } = useSquadStore();

  // 📦 필터 상태
  //const [selectedFormation, setSelectedFormation] = useState("442");
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedLeagues, setLeague] = useState<League[]>([]);
  const [selectedClubs, setClub] = useState<Team[]>([]);
  const [selectedPos, selectedPosition] = useState("");
  // const [selectedMyClubName, setSelectedMyClubName] = useState(""); // ✅ 빈 문자열로 시작
  // const [selectedMyClubIdx, setSelectedMyClubIdx] = useState(-1);
  // const [newClubName, setNewClubName] = useState("");
  // const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // 📦 스낵바 상태 하나로 통일
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 📌 UI 제어
  const [selectedDropZone, setSelectedDropZone] = useState<{
    index: number;
    pos: string;
  }>({
    index: -1,
    pos: "",
  });
  // const [isDropZoneSelected, setIsDropZoneSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [openAddDialog, setOpenAddDialog] = useState(false);

  // 📏 높이 측정용 ref
  const squadSelectRef = useRef<HTMLDivElement>(null);

  // 🔍 DropZone 클릭 감지용
  const searchPlayerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("setting user id:", myUserId);
    setuserId(1); // 임시 user id
  }, []);

  useEffect(() => {
    if (myUserId === -1) {
      return;
    }
    console.log("userId:", myUserId);
    fetchMyClubs(myUserId)
      .then((clubs) => {
        const paddedClubs: (Club | null)[] = Array(3).fill(null);
        clubs.forEach((club, idx) => {
          paddedClubs[idx] = club ?? null;
        });
        console.log(paddedClubs);
        setMyClubs(paddedClubs);
      })
      .catch((error) => {
        console.error("❌ 클럽 설정 실패:", error);
      });
  }, [myUserId]);

  const loadRandomSquad = () => {
    console.log("start");
    setLoading(true);
    axios
      .post<ResponseRandomSquad>("http://localhost:8080/api/randomteam", {
        name: myFormation,
        countries: selectedCountries,
        leagues: selectedLeagues,
        clubs: selectedClubs,
      })
      .then((response) => {
        const newDropPlayers: { [idx: number]: Player | null } = {};
        response.data.content.forEach((p, idx) => {
          newDropPlayers[idx] = p;
        });

        setDropPlayers(newDropPlayers);
        setMyTeamOvr(response.data.myTeamOvr);
        setMyTeamSquadValue(response.data.myTeamSquadValue);
        setMyTeamAge(response.data.myTeamAge);
        setMyTeamPace(response.data.myTeamPace);
        setMyTeamDefense(response.data.myTeamDef);
        setMyTeamAttack(response.data.myTeamAtk);
        setMyTeamClubCohesion(response.data.myTeamClubCohesion);
        setMyTeamStamina(response.data.myTeamStamina);
        // 이미지 URL이 모두 로드될 때까지 대기
        const imagePromises = response.data.content.map((player) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = player.img; // ✅ 실제 이미지 경로
            img.onload = () => resolve();
            img.onerror = () => resolve(); // 실패해도 해제
          });
        });

        return Promise.all(imagePromises);
      })
      .catch((error) => {
        console.log("🔥 error 전체:", error);
        console.log("🔥 error.response:", error.response);
        console.log("🔥 error.response.data:", error.response?.data);
        if (axios.isAxiosError(error) && error.response) {
          setSnackbarMessage(error.response.data || "에러가 발생했습니다.");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("알 수 없는 오류가 발생했습니다.");
          setSnackbarOpen(true);
        }
      })
      .finally(() => {
        console.log("finish");
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="squad-container">
        <SquadMetrics />
        <div className="squad-formation" ref={squadSelectRef}>
          {/* <Typography variant="h6" gutterBottom>
              Formation
            </Typography> */}
          {myFormation && (
            <SquadBuilder
              // benchPlayers={benchPlayers}
              selectedFormation={myFormation as keyof typeof formations}
              dropPlayers={dropPlayers}
              setSelectedDropZone={setSelectedDropZone}
              setIsDropZoneSelected={setIsDropZoneSelected}
              setPosition={selectedPosition}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SelectFormation />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                outline: "1px solid gray",
                borderRadius: "8px",
                width: "90%",
                margin: "20px 0 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {isDropZoneSelected && (
                  <IconButton
                    onClick={() => {
                      setIsDropZoneSelected(!isDropZoneSelected);
                    }}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "transparent", // 🔑 배경 유지
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
              <div>
                {isDropZoneSelected ? (
                  <SearchPlayer
                    ref={searchPlayerRef}
                    listRef={listRef}
                    country=""
                    league=""
                    club=""
                    pos={selectedPos}
                    selectedDropZone={selectedDropZone}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                  />
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                      Filters
                    </Typography>
                    <SearchCountry
                      setSelectedCountry={setSelectedCountries}
                      prevList={selectedCountries}
                    />
                    <SearchLeague
                      setSelectedLeague={(league) => setLeague(league || [])}
                      prevList={selectedLeagues}
                    />
                    <SearchClub
                      setClub={setClub}
                      setSearchTermClub={(term: string) =>
                        console.log("Search term:", term)
                      }
                      prevList={selectedClubs}
                    />
                    <Filters
                      selectedCountries={selectedCountries}
                      selectedTeams={selectedClubs}
                      selectedLeagues={selectedLeagues}
                      selectedPosition={[]}
                      searchTerm={""}
                      sortType={""}
                      setSelectedCountries={setSelectedCountries}
                      setSelectedTeams={setClub}
                      setSelectedLeagues={setLeague}
                      fetchPage={(page: number) =>
                        console.log(`Fetching page ${page}`)
                      }
                      setSelectedPosition={() => {}}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        loadRandomSquad();
                      }}
                      sx={{ margin: "10px" }}
                    >
                      Create Squad
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MyClub
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Squad;
