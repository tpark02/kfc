import React, { useState, useRef } from "react";
import axios from "axios";
import { Snackbar, Alert, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSquadStore } from "../../store/useSquadStore";
// 타입
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import { League } from "../../types/League";
import {
  ResponseLoadSquad,
  ResponseSaveSquad,
  ResponseRandomSquad,
} from "../../types/Response";
import { Country } from "../../types/Country";
import { formations } from "../../data/formations";
import SquadMetrics from "./SquadMetrics";
// 컴포넌트
import SquadBuilder from "./SquadBuilder";
// import SquadFormation from "./SquadFormation";
import SelectFormation from "./SelectFormation";
import SearchPlayer from "./SearchPlayer"; // ✅ default export
import SearchCountry from "./SearchCountry";
import SearchLeague from "./SearchLeague";
import SearchClub from "./SearchClub";
import Filters from "../Players/Filter";
import LoadingSpinner from "../LoadingSpinner";
// 스타일
import "../../style/Squad.css";

const Squad: React.FC = () => {
  const {
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
  } = useSquadStore();

  // 📦 필터 상태
  //const [selectedFormation, setSelectedFormation] = useState("442");
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedLeagues, setLeague] = useState<League[]>([]);
  const [selectedClubs, setClub] = useState<Team[]>([]);
  const [selectedPos, selectedPosition] = useState("");

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

  // 📏 높이 측정용 ref
  const squadSelectRef = useRef<HTMLDivElement>(null);

  // 🔍 DropZone 클릭 감지용
  // const dropZoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchPlayerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // 🧩 포지션 매핑
  const positions = [
    "ST",
    "RW",
    "LW",
    "CAM",
    "RM",
    "LM",
    "CDM",
    "CM",
    "CB",
    "RB",
    "LB",
    "GK",
  ];
  const positionMap: { [key: string]: number } = {};
  positions.forEach((position, index) => {
    positionMap[position] = index + 1;
  });

  // ⬇️ 스쿼드 불러오기
  const loadSquadData = () => {
    axios
      .post<ResponseLoadSquad>("http://localhost:8080/api/loadsquad", {
        name: myFormation,
      })
      .then((response) => {
        const newDropPlayers: { [idx: number]: Player | null } = {};
        response.data.content.forEach((p, idx) => {
          newDropPlayers[idx] = p;
        });
        // response.data.name;
        setMyTeamName(response.data.myTeamName);
        // setFormation(response.data.name);
        setDropPlayers(newDropPlayers);
        setMyTeamOvr(response.data.myTeamOvr);
        console.log("로드 - myTeamOvr:", useSquadStore.getState().myTeamOvr);
        console.log(
          "✅ 로드 - dropPlayers:",
          useSquadStore.getState().dropPlayers
        );
      })
      .catch((error) => {
        setSnackbarMessage(
          error.response?.data || "스쿼드를 불러오지 못했습니다."
        );
        setSnackbarOpen(true);
      });
  };

  // 💾 스쿼드 저장하기
  const saveSquadData = () => {
    axios
      .post<ResponseSaveSquad>("http://localhost:8080/api/savesquad", {
        name: myFormation,
        p1: dropPlayers[0]?.id,
        p2: dropPlayers[1]?.id,
        p3: dropPlayers[2]?.id,
        p4: dropPlayers[3]?.id,
        p5: dropPlayers[4]?.id,
        p6: dropPlayers[5]?.id,
        p7: dropPlayers[6]?.id,
        p8: dropPlayers[7]?.id,
        p9: dropPlayers[8]?.id,
        p10: dropPlayers[9]?.id,
        p11: dropPlayers[10]?.id,
      })
      .then((response) => {
        if (Object.keys(response.data.isSuccessful === "true")) {
          console.log("Formation saved successfully");
        } else {
          setSnackbarMessage("Formation 저장 실패");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        setSnackbarMessage(
          error.response?.data || "Formation 저장 중 오류 발생"
        );
        setSnackbarOpen(true);
      });
  };

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
        setMyTeamName(response.data.myTeamName);
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
          <Typography variant="h6" gutterBottom>
            Formation
          </Typography>
          {myFormation && (
            <SquadBuilder
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
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
        <div className="squad-team">
          <Typography variant="h6" gutterBottom>
            Select Formation
          </Typography>
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
                    // dropPlayers={dropPlayers}
                    // setDropPlayers={setDropPlayers}
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
                    <div className="button-group">
                      <button
                        onClick={() => {
                          loadSquadData();
                        }}
                      >
                        Load
                      </button>
                      <button
                        onClick={() => {
                          saveSquadData();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Squad;
