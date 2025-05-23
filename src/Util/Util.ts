export const getOvrColor = (value: number) => {
  if (value === null) return "#9e9e9e"; // N/A
  if (value >= 90) return "#1AB25C";
  if (value >= 70) return "#FFC002";
  return "#F83959"; // default color
};

export const getPosColor = (pos: string) => {
  let c = "";
  if (pos.includes("ST") || pos.includes("W")) c = "red";
  else if (pos.includes("M")) c = "orange";
  else if (pos.includes("B")) c = "blue";
  else if (pos.includes("G")) c = "orange";
  return c;
};

export const devMatchTimer = 3000;
export const matchTimer = 1000 * 60 * 3;
export const redirectTimer = 2000;