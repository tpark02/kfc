export const getOvrColor = (value: number) => {
  if (value === null) return "#9e9e9e"; // N/A
  if (value >= 90) return "#1AB25C";
  if (value >= 70) return "#FFC002";
  return "#F83959"; // default color
};

export const getPosColor = (pos: string) => {
  const upperPos = pos.toUpperCase();
  let c = "";
  if (upperPos.includes("ST") || upperPos.includes("W")) c = "red";
  else if (upperPos.includes("M")) c = "orange";
  else if (upperPos.includes("B")) c = "blue";
  else if (upperPos.includes("G")) c = "green";
  return c;
};

export const devMatchTimer = 3000;
export const matchTimer = 1000 * 60 * 3;
export const redirectTimer = 2000;
