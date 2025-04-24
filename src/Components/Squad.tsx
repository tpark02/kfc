import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SquadMap, Player } from "../types/Player";
import { formationGrid } from "../types/FormationGrid";
import Select from "react-select";
import { OptionProps } from "react-select";
import { useDrop } from "react-dnd";
import { Snackbar, Alert } from "@mui/material";
import { ResponseLoadSquad } from "../types/ResponseLoadSquad";
import CroppedAvatar from "./CroppedAvatar";
import "../Squad.css";
import { ResponseSaveSquad } from "../types/ResponseSaveSquad";
import SearchComponent from "./SearchComponent";

const formations = [
  { value: "442", label: "4-4-2" },
  { value: "433", label: "4-3-3" },
  { value: "4231", label: "4-2-3-1" },
  { value: "451", label: "4-5-1" },
  { value: "343", label: "3-4-3" },
  { value: "352", label: "3-5-2" },
  { value: "532", label: "5-3-2" },
  { value: "541", label: "5-4-1" },
  { value: "41212", label: "4-1-2-1-2" },
  { value: "4222", label: "4-2-2-2" },
  { value: "4321", label: "4-3-2-1" },
  { value: "4132", label: "4-1-3-2" },
  { value: "424", label: "4-2-4" },
];

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

const createHoverOption = (setSelectedFormation: (value: string) => void) => {
  return (props: OptionProps<{ value: string; label: string }>) => {
    const { data, isFocused, innerRef, innerProps } = props;

    useEffect(() => {
      if (isFocused) {
        setSelectedFormation(data.value);
      }
    }, [isFocused, data, setSelectedFormation]);

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          backgroundColor: isFocused ? "#666" : "#242424",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        {data.label}
      </div>
    );
  };
};

const FormationDropdown: React.FC = () => {
  const [selectedFormation, setSelectedFormation] = useState(
    formations[0].value
  );
  const [squad] = useState<SquadMap>();
  const [dropPlayers, setDropPlayers] = useState<{
    [index: number]: Player | null;
  }>({});
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const squadSelectRef = useRef<HTMLDivElement>(null);
  const [selectHeight, setSelectHeight] = useState<number>(0);

  useEffect(() => {
    if (squadSelectRef.current) {
      setSelectHeight(squadSelectRef.current.offsetHeight);
    }
  }, [dropPlayers, selectedFormation]); // 상황에 따라 업데이트

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
          <button
            onClick={() => {
              console.log("load clicked");
              axios
                .post<ResponseLoadSquad>(
                  "http://localhost:8080/api/loadsquad",
                  {
                    name: selectedFormation,
                  }
                )
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
            }}
          >
            load
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
          <button
            style={{
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            onClick={() => {
              console.log("save clicked");
              axios
                .post<ResponseSaveSquad>(
                  "http://localhost:8080/api/savesquad",
                  {
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
                  }
                )
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
            }}
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
        <div
          className="squad-team"
          style={{
            height: `${selectHeight}px`,
            overflowY: "auto",
          }}
        >
          <Select
            options={formations}
            value={formations.find((f) => f.value === selectedFormation)}
            onChange={(option) => {
              if (option && "value" in option) {
                setSelectedFormation(option.value);
              } else {
                setSelectedFormation("");
              }
            }}
            isSearchable={false}
            components={{ Option: createHoverOption(setSelectedFormation) }} // pass setter
            styles={{
              container: (base) => ({
                ...base,
                width: "100%",
              }),
              control: (base) => ({
                ...base,
                backgroundColor: "#242424",
                color: "#fff", // input text color
                border: "1px solid transparent", // ✅ removes border
                boxShadow: "none", // ✅ removes glow
                outline: "none", // ✅ ensures no native outline
                "&:hover": {
                  borderColor: "#666", // optional: change border on hover
                },
                width: "100%",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff", // selected item shown in the input
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#242424",
                width: "100%",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#3a3a3a" : "#242424",
                color: "#fff", // text color of each option
                width: "100%",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#ccc", // placeholder text
              }),
              input: (base) => ({
                ...base,
                color: "#fff", // typing text color
              }),
            }}
          />
          {<SearchComponent />}
        </div>
      </div>
    </div>
  );
};

export default FormationDropdown;
