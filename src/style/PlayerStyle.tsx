import React from "react";

export const getStatDisplay = (label: string, value: number) => {
  const getUnderlineColor = () => {
    if (value >= 90) return "red";
    if (value >= 80) return "green";
    if (value >= 70) return "orange";
    return "yellow";
  };

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
        }}
      >
        {value}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: "100%",
            borderRadius: "2px",
            backgroundColor: getUnderlineColor(),
          }}
        />
      </div>
    </div>
  );
};
