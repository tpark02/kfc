import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useDrop } from "react-dnd";
import { Snackbar, Alert } from "@mui/material";

import { SquadMap, Player } from "../types/Player";
import { Team } from "../types/Team";
import { League } from "../types/League";
import { formationGrid } from "../types/FormationGrid";
import { ResponseLoadSquad, ResponseSaveSquad } from "../types/Response";
import { Country } from "../types/Country";

import CroppedAvatar from "./CroppedAvatar";

import "../Squad.css";
import SelectFormation from "./SelectFormation";
import SearchPlayer from "./SearchPlayer";
import SearchCountry from "./SearchCountry";
import SearchLeague from "./SearchLeague";
import SearchClub from "./SearchClub";
import SearchPosition from "./SearchPosition";

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

const DropZone = ({
  grid,
  onDrop,
  player,
}: {
  grid: { gridColumn: number; gridRow: number };
  onDrop: (player: Player) => void;
  player?: Player;
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: "PLAYER",
    drop: (player: Player) => {
      onDrop(player);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const divRef = React.useRef<HTMLDivElement>(null);
  dropRef(divRef);

  return (
    <div
      ref={divRef}
      style={{
        gridColumn: grid.gridColumn,
        gridRow: grid.gridRow,
      }}
    >
      {/* Render the dropped player's name */}
      <CroppedAvatar src={player?.img ?? ""} />
    </div>
  );
};

const FormationDropdown: React.FC = () => {
  const [squad] = useState<SquadMap>();
  const [dropPlayers, setDropPlayers] = useState<{
    [index: number]: Player | null;
  }>({});
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const squadSelectRef = useRef<HTMLDivElement>(null);
  const [selectHeight, setSelectHeight] = useState<number>(0);
  const [selectedFormation, setSelectedFormation] = useState<string>("442");
  const [seletecCountry, setSelectedCountries] = useState<Country>();

  const [selectedLeague, setLeague] = useState<League>();
  const [setLeagueTerm, selectedLeagueTerm] = useState("");

  const [selectedClub, setClub] = useState<Team>();
  const [setClubTerm, selectedClubTerm] = useState("");

  const [selectedPos, selectedPosition] = useState("");

  useEffect(() => {
    if (squadSelectRef.current) {
      setSelectHeight(squadSelectRef.current.offsetHeight);
    }
  }, [dropPlayers, selectedFormation]); // 상황에 따라 업데이트

  const loadSquadData = () => {
    console.log("load clicked");
    axios
      .post<ResponseLoadSquad>("http://localhost:8080/api/loadsquad", {
        name: selectedFormation,
      })
      .then((response) => {
        console.log("Squad load successfully", response.data.content);

        const newDropPlayers: { [index: number]: Player | null } = {};
        response.data.content.forEach((p: Player, index: number) => {
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

  const saveSquadData = () => {
    console.log("save clicked");
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
        if (Object.keys(response.data.isSuccessful === "true"))
          console.log("Formation saved successfully");
        else {
          setErrorMsg("Formation not saved");
          setOpen(true);
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setOpen(true);
      });
  };
  // make position dictionary
  positions.forEach((position, index) => {
    positionMap[position] = index + 1;
  });

  const SquadFormation = ({
    formation,
    dropPlayers,
    setDropPlayers,
  }: {
    formation: string;
    squad: SquadMap;
    dropPlayers: { [index: number]: Player | null };
    setDropPlayers: React.Dispatch<
      React.SetStateAction<{ [index: number]: Player | null }>
    >;
  }) => {
    return (
      <div className={`squad-formation formation-${formation}`}>
        {("1" + formation)
          .split("")
          .reverse()
          .flatMap((numStr, rowIndex) => {
            // console.log(rowIndex + " " + numStr);
            const count = parseInt(numStr, 10);
            return Array.from({ length: count }).map((_, i) => {
              const idx =
                formation
                  .split("")
                  .reverse()
                  .slice(0, rowIndex)
                  .reduce((acc, val) => acc + parseInt(val, 10), 0) + i;

              const grid = formationGrid[formation]?.[idx];
              if (!grid) {
                console.log("gird is null");
                return null;
              }

              return (
                <DropZone
                  key={`drop-${idx}`}
                  grid={grid}
                  player={dropPlayers[idx] ?? undefined}
                  onDrop={(player) => {
                    setDropPlayers((prev) => ({
                      ...prev,
                      [idx]: player, // <- associate this player with this position
                    }));
                  }}
                />
              );
            });
          })}
      </div>
    );
  };

  return (
    <div className="squad-container">
      <div className="squad-dropdown"></div>
      <div className="squad-main">
        <div className="squad-select" ref={squadSelectRef}>
          {selectedFormation && (
            <SquadFormation
              formation={selectedFormation}
              squad={squad || ({} as SquadMap)}
              dropPlayers={dropPlayers}
              setDropPlayers={setDropPlayers}
            />
          )}
          <button onClick={loadSquadData}>load</button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={() => setOpen(false)}>
              {errorMsg}
            </Alert>
          </Snackbar>
          <button
            style={{
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            onClick={saveSquadData}
          >
            save
          </button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
            <SearchCountry OnSetSelectedCountry={setSelectedCountries} />
            <SearchLeague
              setLeague={setLeague}
              setSearchLeauge={selectedLeagueTerm}
            />
            <SearchClub
              setClub={setClub}
              setSearchTermClub={selectedClubTerm}
            />
            <SearchPosition selectedPos={selectedPosition} />
            <div
              style={{
                height: `${selectHeight}px`,
                overflowY: "auto",
              }}
            >
              <SearchPlayer
                country={seletecCountry?.name ?? ""}
                league={selectedLeague?.name ?? ""}
                club={selectedClub?.name ?? ""}
                pos={selectedPos}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDropdown;
