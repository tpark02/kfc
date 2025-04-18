import React, { useState, useEffect, useRef } from "react";

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

const createHoverOption = (setSelectedFormation: (value: string) => void) => {
  return (props: OptionProps<any>) => {
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
  const [selectedFormation, setSelectedFormation] = useState("");

  return (
    <div className="squad-container">
      <div className="squad-dropdown">
        <label className="squad-dropdown-label">Formation</label>
        <Select
          options={formations}
          onChange={(option) => setSelectedFormation(option?.value || "")}
          placeholder="Select formation"
          isSearchable={false}
          components={{ Option: createHoverOption(setSelectedFormation) }} // pass setter
          styles={{
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
            }),
            singleValue: (base) => ({
              ...base,
              color: "#fff", // selected item shown in the input
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#242424",
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

      {selectedFormation && (
        <div className={`squad-formation formation-${selectedFormation}`}>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="squad-player">
              {i + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormationDropdown;
