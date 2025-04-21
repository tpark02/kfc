import React, { useState, useEffect } from "react";
import axios from "axios";
import { Team } from "../types/Team";
import { TeamPage } from "../types/TeamPage";
import { SquadMap, Player } from "../types/Player";
import { formationGrid } from "../types/FormationGrid";

import "../Squad.css";
import "../Squad/442.css";
import "../Squad/443.css";
import "../Squad/4231.css";
import "../Squad/451.css";
import "../Squad/343.css";
import "../Squad/352.css";
import "../Squad/532.css";
import "../Squad/541.css";
import "../Squad/41212.css";
import "../Squad/4222.css";
import "../Squad/4321.css";
import "../Squad/4132.css";
import "../Squad/424.css";
import Select from "react-select";
import { OptionProps } from "react-select";

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

const getSquad = ({
  value,
  setSelectedSquad,
}: {
  value: string;
  setSelectedSquad: (squad: SquadMap) => void;
}) => {
  axios
    .post<SquadMap>("http://localhost:8080/api/squad", {
      teamName: value,
    })
    .then((response) => {
      setSelectedSquad(response.data);
    })
    .catch((err) => console.error(err));
};

const SquadFormation = ({
  formation,
  squad,
}: {
  formation: string;
  squad: SquadMap;
}) => {
  const playerList: Player[] = positions.flatMap((pos) => squad[pos] ?? []);

  return (
    <div className={`squad-formation formation-${formation}`}>
      {formation
        .split("")
        .reverse()
        .flatMap((numStr, rowIndex) => {
          console.log(rowIndex + " " + numStr);
          const count = parseInt(numStr, 10);
          return Array.from({ length: count }).map((_, i) => {
            const idx =
              formation
                .split("")
                .reverse()
                .slice(0, rowIndex)
                .reduce((acc, val) => acc + parseInt(val, 10), 0) + i;

            const grid = formationGrid[formation]?.[idx];
            if (!grid) return null;

            return (
              <div
                key={`player-${idx}`}
                className="squad-player"
                style={{
                  gridColumn: grid.gridColumn,
                  gridRow: grid.gridRow,
                }}
              >
                {idx + 1}
                {playerList[idx]?.name}
              </div>
            );
          });
        })}
    </div>
  );
};

const FormationDropdown: React.FC = () => {
  const [selectedFormation, setSelectedFormation] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [squad, setSquad] = useState<SquadMap>();

  // make position dictionary
  positions.forEach((position, index) => {
    positionMap[position] = index + 1;
  });

  console.log(positionMap);

  useEffect(() => {
    axios
      .get<TeamPage>("http://localhost:8080/api/teams", {})
      .then((response) => {
        console.log(response.data.content);
        setTeams(response.data.content);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .post<SquadMap>("http://localhost:8080/api/squad", {
        teamName: "Real Madrid",
      })
      .then((response) => {
        console.log(response.data);
        setSquad(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.name,
    imageUrl: team.url,
  }));

  return (
    <div className="squad-container">
      <div className="squad-dropdown">
        <Select
          options={formations}
          onChange={(option) => {
            if (option && "value" in option) {
              setSelectedFormation(option.value);
            } else {
              setSelectedFormation("");
            }
          }}
          placeholder="Select a formation"
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
        <Select
          options={teamOptions}
          placeholder="Select a team"
          onChange={(team) => {
            if (team?.label) {
              console.log(team.label);
              getSquad({ value: team.label, setSelectedSquad: setSquad });
            } else {
              console.error("Team label is undefined");
            }
          }}
          formatOptionLabel={(option) => (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={
                  option.imageUrl !== ""
                    ? option.imageUrl
                    : "../../img/fallback.png"
                }
                alt={option.label}
                style={{ width: "24px", height: "24px", objectFit: "contain" }}
                onError={(e) => {
                  e.currentTarget.onerror = null; // 무한 루프 방지
                  e.currentTarget.src = "../../img/fallback.png"; // 대체 이미지 경로
                }}
              />
              <span>{option.label}</span>
            </div>
          )}
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
      </div>
      <div className="squad-main">
        <div className="squad-select">
          {selectedFormation && squad && (
            <SquadFormation formation={selectedFormation} squad={squad} />
          )}
        </div>
        <div className="squad-team">
          {squad &&
            Object.entries(squad ?? []).flatMap(([_, players]) =>
              players.map((p) => (
                <div key={p.id} className="squad-team-player">
                  <div>{p.name}</div>
                  <div>{p.pos}</div>
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default FormationDropdown;
