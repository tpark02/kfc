import React, { useState, useRef } from "react";
import axios from "axios";
import { Snackbar, Alert, Button } from "@mui/material";

// 타입
import { Player } from "../types/Player";
import { Team } from "../types/Team";
import { League } from "../types/League";
import {
  ResponseLoadSquad,
  ResponseSaveSquad,
  ResponseRandomSquad,
} from "../types/Response";
import { Country } from "../types/Country";
import { formations } from "../data/formations";

// 컴포넌트
import SquadBuilder from "./SquadBuilder";
// import SquadFormation from "./SquadFormation";
import SelectFormation from "./SelectFormation";
import SearchPlayer from "./SearchPlayer"; // ✅ default export
import SearchCountry from "./SearchCountry";
import SearchLeague from "./SearchLeague";
import SearchClub from "./SearchClub";
import Filters from "./Filter";

// 스타일
import "../Squad.css";

const FormationDropdown: React.FC = () => {
  // 🔢 기본 데이터 상태
  // const [squad] = useState<SquadMap>(); // 현재 스쿼드 데이터
  const [dropPlayers, setDropPlayers] = useState<{
    [key: string]: Player[] | null;
  }>({});
  const [teamOvr, setTeamOvr] = useState(0);
  // 📦 필터 상태
  const [selectedFormation, setSelectedFormation] = useState("442");
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
  const [isDropZoneSelected, setIsDropZoneSelected] = useState(false);

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
        name: selectedFormation,
      })
      .then((response) => {
        const newDropPlayers: { [key: string]: Player[] | null } = {};
        response.data.content.forEach((p) => {
          if (!newDropPlayers[p.pos]) {
            newDropPlayers[p.pos] = [];
          }
          newDropPlayers[p.pos]!.push(p);
        });
        setSelectedFormation(response.data.name);
        setDropPlayers(newDropPlayers);
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
    const entries = Object.values(dropPlayers)
      .filter((arr): arr is Player[] => Array.isArray(arr)) // remove nulls
      .flat();
    axios
      .post<ResponseSaveSquad>("http://localhost:8080/api/savesquad", {
        name: selectedFormation,
        p1: entries[0]?.id,
        p2: entries[1]?.id,
        p3: entries[2]?.id,
        p4: entries[3]?.id,
        p5: entries[4]?.id,
        p6: entries[5]?.id,
        p7: entries[6]?.id,
        p8: entries[7]?.id,
        p9: entries[8]?.id,
        p10: entries[9]?.id,
        p11: entries[10]?.id,
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
    axios
      .post<ResponseRandomSquad>("http://localhost:8080/api/randomteam", {
        name: selectedFormation,
        countries: selectedCountries,
        leagues: selectedLeagues,
        clubs: selectedClubs,
      })
      .then((response) => {
        const newDropPlayers: { [key: string]: Player[] | null } = {};
        let teamOvr: number = 0;

        response.data.content.forEach((p, index) => {
          const key = p.pos;
          console.log("load:" + key + ":" + index + ":" + p.img);

          if (!newDropPlayers[key]) {
            newDropPlayers[key] = []; // ❗ key가 없을 때만 초기화
          }
          newDropPlayers[key]!.push(p); // 확실하게 push
          teamOvr += p.ovr;
        });
        setDropPlayers(newDropPlayers);
        teamOvr /= 11;
        teamOvr = Math.ceil(teamOvr);
        setTeamOvr(teamOvr);
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
      });
  };

  return (
    <div className="squad-container">
      <div className="squad-random-team">
        <div>OVR : {teamOvr}</div>
      </div>
      {/* <div ref={squadSelectRef}> */}
      <div className="squad-select" ref={squadSelectRef}>
        {selectedFormation && (
          <SquadBuilder
            selectedFormation={selectedFormation as keyof typeof formations}
            dropPlayers={dropPlayers}
            setSelectedDropZone={setSelectedDropZone}
            setIsDropZoneSelected={setIsDropZoneSelected}
            setPosition={selectedPosition}
            searchPlayerRef={listRef}
          />
        )}
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
        <div>
          <SelectFormation
            setSelectedFormation={setSelectedFormation}
            selectedFormation={selectedFormation}
            setDropPlayers={setDropPlayers}
          />

          {isDropZoneSelected && (
            <Button
              onClick={() => {
                setIsDropZoneSelected(!isDropZoneSelected);
              }}
            >
              Close
            </Button>
          )}
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
                dropPlayers={dropPlayers}
                setDropPlayers={setDropPlayers}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
              />
            ) : (
              <>
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
                {/* <SearchPosition selectedPos={selectedPosition} /> */}
                {/* 🧾 Filter  */}
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
                  sx={{ marginLeft: 1 }}
                >
                  Create Squad
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDropdown;
