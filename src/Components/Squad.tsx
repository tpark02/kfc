import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

// 타입
import { SquadMap, Player } from "../types/Player";
import { Team } from "../types/Team";
import { League } from "../types/League";
import { ResponseLoadSquad, ResponseSaveSquad } from "../types/Response";
import { Country } from "../types/Country";

// 컴포넌트
import SquadFormation from "./SquadFormation";
import SelectFormation from "./SelectFormation";
import SearchPlayer from "./SearchPlayer"; // ✅ default export
import SearchCountry from "./SearchCountry";
import SearchLeague from "./SearchLeague";
import SearchClub from "./SearchClub";
import SearchPosition from "./SearchPosition";

// 스타일
import "../Squad.css";

const FormationDropdown: React.FC = () => {
  // 🔢 기본 데이터 상태
  const [squad] = useState<SquadMap>(); // 현재 스쿼드 데이터
  const [dropPlayers, setDropPlayers] = useState<{
    [index: number]: Player | null;
  }>({});

  // 📦 필터 상태
  const [selectedFormation, setSelectedFormation] = useState("442");
  const [seletecCountry, setSelectedCountries] = useState<Country>();
  const [selectedLeague, setLeague] = useState<League>();
  const [selectedClub, setClub] = useState<Team>();
  const [selectedPos, selectedPosition] = useState("");

  // 📌 UI 제어
  const [selectHeight, setSelectHeight] = useState<number>(0);
  const [selectedDropZone, setSelectedDropZone] = useState<{ index: number }>({
    index: -1,
  });
  const [isDropZoneSelected, setIsDropZoneSelected] = useState(false);

  // ⚠️ 에러 핸들링
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 📏 높이 측정용 ref
  const squadSelectRef = useRef<HTMLDivElement>(null);

  // 🔍 DropZone 클릭 감지용
  const dropZoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchPlayerRef = useRef<HTMLDivElement | null>(null);

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

  // 📏 DropZone 높이 측정
  useEffect(() => {
    if (squadSelectRef.current) {
      setSelectHeight(squadSelectRef.current.offsetHeight);
    }
  }, [dropPlayers, selectedFormation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const clickedInsideDropZone = dropZoneRefs.current.some(
        (ref) => ref && ref.contains(target)
      );
      const clickedInsideSearch = !!target.closest("#search-player-root");

      console.log("DropZone?", clickedInsideDropZone);
      console.log("SearchPlayer?", clickedInsideSearch);

      if (!clickedInsideDropZone && !clickedInsideSearch) {
        console.log("❌ 외부 클릭, 닫기");
        setIsDropZoneSelected(false);
      } else {
        console.log("✅ 내부 클릭, 유지");
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // ⬇️ 스쿼드 불러오기
  const loadSquadData = () => {
    axios
      .post<ResponseLoadSquad>("http://localhost:8080/api/loadsquad", {
        name: selectedFormation,
      })
      .then((response) => {
        const newDropPlayers: { [index: number]: Player | null } = {};
        response.data.content.forEach((p, index) => {
          newDropPlayers[index] = p;
        });
        setSelectedFormation(response.data.name);
        setDropPlayers(newDropPlayers);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setOpen(true);
      });
  };

  // 💾 스쿼드 저장하기
  const saveSquadData = () => {
    axios
      .post<ResponseSaveSquad>("http://localhost:8080/api/savesquad", {
        name: selectedFormation,
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
          setErrorMsg("Formation not saved");
          setOpen(true);
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setOpen(true);
      });
  };

  return (
    <div className="squad-container">
      <div className="squad-dropdown">
        {/* <SelectFormation ... /> 등 필터용 */}
      </div>
      <div className="squad-main">
        <div className="squad-select" ref={squadSelectRef}>
          {selectedFormation && (
            <SquadFormation
              formation={selectedFormation}
              dropPlayers={dropPlayers}
              setDropPlayers={setDropPlayers}
              setSelectedDropZone={setSelectedDropZone}
              setIsDropZoneSelected={setIsDropZoneSelected}
              dropZoneRefs={dropZoneRefs}
              squad={squad || {}}
              selectedDropZone={selectedDropZone}
            />
          )}

          <button onClick={loadSquadData}>load</button>
          <button onClick={saveSquadData}>save</button>

          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
          >
            <Alert severity="error" onClose={() => setOpen(false)}>
              {errorMsg}
            </Alert>
          </Snackbar>
        </div>

        <div className="squad-team">
          <div>
            <SelectFormation
              setSelectedFormation={setSelectedFormation}
              selectedFormation={selectedFormation}
            />
            {/* <SearchCountry OnSetSelectedCountry={setSelectedCountries} />
            <SearchLeague
              setLeague={setLeague}
              setSearchLeauge={selectedLeagueTerm}
            />
            <SearchClub
              setClub={setClub}
              setSearchTermClub={selectedClubTerm}
            />
            <SearchPosition selectedPos={selectedPosition} /> */}
            <div>
              {isDropZoneSelected && (
                <SearchPlayer
                  ref={searchPlayerRef}
                  country={seletecCountry?.name ?? ""}
                  league={selectedLeague?.name ?? ""}
                  club={selectedClub?.name ?? ""}
                  pos={selectedPos}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDropdown;
