import React from "react";
import { getColor } from "../util/Util";

export const getStatDisplay = (label: string, value: number) => {
  return (
    <div style={{ textAlign: "center", lineHeight: 1.2 }}>
      <div style={{ fontSize: 12, color: "#64625B" }}>
        {label.toUpperCase()}
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: "bold",
          position: "relative",
          display: "inline-block",
          paddingBottom: "4px",
          color: getColor(value),
        }}
      >
        {value}
        {/* <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: "100%",
            borderRadius: "2px",
          }}
        /> */}
      </div>
    </div>
  );
};
