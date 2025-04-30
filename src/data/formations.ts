// export const formations = [
//   { value: "442", label: "4-4-2" },
//   { value: "433", label: "4-3-3" },
//   { value: "4231", label: "4-2-3-1" },
//   { value: "451", label: "4-5-1" },
//   { value: "343", label: "3-4-3" },
//   { value: "352", label: "3-5-2" },
//   { value: "532", label: "5-3-2" },
//   { value: "541", label: "5-4-1" },
//   { value: "41212", label: "4-1-2-1-2" },
//   { value: "4222", label: "4-2-2-2" },
//   { value: "4321", label: "4-3-2-1" },
//   { value: "4132", label: "4-1-3-2" },
//   { value: "424", label: "4-2-4" },
// ];

export const baseFormations = {
  "442": [
    { pos: "GK", top: 95, left: 50 },
    { pos: "LB", top: 70, left: 20 },
    { pos: "CDM", top: 70, left: 40 },
    { pos: "CDM", top: 70, left: 60 },
    { pos: "RB", top: 70, left: 80 },
    { pos: "LM", top: 50, left: 20 },
    { pos: "CAM", top: 50, left: 40 },
    { pos: "CAM", top: 50, left: 60 },
    { pos: "RM", top: 50, left: 80 },
    { pos: "ST", top: 30, left: 40 },
    { pos: "ST", top: 30, left: 60 },
  ],
  "433": [
    { pos: "GK", top: 95, left: 50 },
    { pos: "LB", top: 70, left: 20 },
    { pos: "CM", top: 70, left: 40 },
    { pos: "CM", top: 70, left: 60 },
    { pos: "RB", top: 70, left: 80 },
    { pos: "CAM", top: 55, left: 35 },
    { pos: "CAM", top: 50, left: 50 },
    { pos: "CAM", top: 55, left: 65 },
    { pos: "LW", top: 30, left: 20 },
    { pos: "ST", top: 25, left: 50 },
    { pos: "RW", top: 30, left: 80 },
  ],
  "352": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 70, left: 30 },
    { pos: "CB", top: 70, left: 50 },
    { pos: "RB", top: 70, left: 70 },
    { pos: "LM", top: 55, left: 15 },
    { pos: "LM", top: 55, left: 35 },
    { pos: "CM", top: 50, left: 50 },
    { pos: "RM", top: 55, left: 65 },
    { pos: "RM", top: 55, left: 85 },
    { pos: "ST", top: 30, left: 40 },
    { pos: "ST", top: 30, left: 60 },
  ],
  "4231": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 62.5, left: 20 },
    { pos: "LB", top: 72, left: 40 },
    { pos: "RM", top: 72.5, left: 60 },
    { pos: "RB", top: 62.5, left: 80 },
    { pos: "CDM", top: 52.5, left: 40 },
    { pos: "CDM", top: 52.5, left: 60 },
    { pos: "LM", top: 37.5, left: 30 },
    { pos: "CAM", top: 37.5, left: 50 },
    { pos: "RM", top: 37.5, left: 70 },
    { pos: "ST", top: 22.5, left: 50 },
  ],
  "451": [
    { pos: "GK", top: 85.0, left: 50 },
    { pos: "LB", top: 65.0, left: 20 },
    { pos: "LB", top: 65.0, left: 40 },
    { pos: "RM", top: 65.0, left: 60 },
    { pos: "RB", top: 65.0, left: 80 },
    { pos: "LM", top: 50.0, left: 20 },
    { pos: "CM", top: 50.0, left: 40 },
    { pos: "CM", top: 50.0, left: 60 },
    { pos: "RM", top: 50.0, left: 80 },
    { pos: "CAM", top: 35.0, left: 50 },
    { pos: "ST", top: 20.0, left: 50 },
  ],
  "343": [
    { pos: "GK", top: 83, left: 50 },
    { pos: "LB", top: 62.5, left: 30 },
    { pos: "CB", top: 62.5, left: 50 },
    { pos: "RM", top: 62.5, left: 70 },
    { pos: "LM", top: 47.5, left: 20 },
    { pos: "CM", top: 47.5, left: 40 },
    { pos: "CM", top: 47.5, left: 60 },
    { pos: "RM", top: 47.5, left: 80 },
    { pos: "LW", top: 27.5, left: 30 },
    { pos: "ST", top: 22.5, left: 50 },
    { pos: "RW", top: 27.5, left: 70 },
  ],
  "532": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 57.5, left: 20 },
    { pos: "LB", top: 68.5, left: 35 },
    { pos: "CB", top: 72.5, left: 50 },
    { pos: "RM", top: 68.5, left: 65 },
    { pos: "RB", top: 57.5, left: 80 },
    { pos: "LM", top: 40.5, left: 35 },
    { pos: "CM", top: 50.5, left: 50 },
    { pos: "RM", top: 40.5, left: 65 },
    { pos: "ST", top: 22.5, left: 40 },
    { pos: "ST", top: 22.5, left: 60 },
  ],
  "541": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 95, left: 47.5 },

    // 🛡 Defenders
    { pos: "LB", top: 72, left: 7.5 },
    { pos: "LB", top: 75, left: 27.5 },
    { pos: "CB", top: 75, left: 47.5 },
    { pos: "RM", top: 75, left: 67.5 },
    { pos: "RB", top: 72, left: 87.5 },

    // 🧠 Midfielders
    { pos: "LM", top: 48, left: 12.5 },
    { pos: "LM", top: 48, left: 32.5 },
    { pos: "RM", top: 48, left: 62.5 },
    { pos: "RM", top: 48, left: 82.5 },

    // ⚔️ Striker
    { pos: "ST", top: 28, left: 47.5 },
  ],

  "41212": [
    { pos: "GK", top: 85, left: 50 },
    { pos: "LB", top: 62.5, left: 20 },
    { pos: "LM", top: 62.5, left: 40 },
    { pos: "RM", top: 62.5, left: 60 },
    { pos: "RB", top: 62.5, left: 80 },
    { pos: "CDM", top: 52.5, left: 50 },
    { pos: "LM", top: 42.5, left: 35 },
    { pos: "RM", top: 42.5, left: 65 },
    { pos: "CAM", top: 32.5, left: 50 },
    { pos: "ST", top: 22.5, left: 40 },
    { pos: "ST", top: 22.5, left: 60 },
  ],
  "4222": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 98, left: 50 },

    // 🛡 Fullbacks (standard)
    { pos: "LB", top: 68, left: 20 },
    { pos: "RB", top: 68, left: 80 },

    // 🛡 Center Backs (deeper than CDMs)
    { pos: "LB", top: 78, left: 42 },
    { pos: "RM", top: 78, left: 58 },

    // 🧠 Defensive Midfielders
    { pos: "CDM", top: 55, left: 40 },
    { pos: "CDM", top: 55, left: 60 },

    // 🎯 Wide Attacking Midfielders
    { pos: "CAM", top: 44, left: 27 },
    { pos: "CAM", top: 44, left: 73 },

    // ⚔️ Strikers
    { pos: "ST", top: 28, left: 42 },
    { pos: "ST", top: 28, left: 58 },
  ],

  "4321": [
    { pos: "GK", top: 80, left: 50 },
    { pos: "LB", top: 62.5, left: 20 },
    { pos: "LB", top: 62.5, left: 40 },
    { pos: "RM", top: 62.5, left: 60 },
    { pos: "RB", top: 62.5, left: 80 },
    { pos: "LM", top: 47.5, left: 35 },
    { pos: "CM", top: 42.5, left: 50 },
    { pos: "RM", top: 47.5, left: 65 },
    { pos: "LM", top: 32.5, left: 40 },
    { pos: "RM", top: 32.5, left: 60 },
    { pos: "ST", top: 22.5, left: 50 },
  ],
  "4132": [
    { pos: "GK", top: 85, left: 50 },
    { pos: "LB", top: 62.5, left: 20 },
    { pos: "LB", top: 62.5, left: 40 },
    { pos: "RM", top: 62.5, left: 60 },
    { pos: "RB", top: 62.5, left: 80 },
    { pos: "CDM", top: 52.5, left: 50 },
    { pos: "LM", top: 42.5, left: 25 },
    { pos: "CM", top: 35.5, left: 50 },
    { pos: "RM", top: 42.5, left: 75 },
    { pos: "ST", top: 22.5, left: 40 },
    { pos: "ST", top: 22.5, left: 60 },
  ],
  "424": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 100, left: 50 },

    // 🛡 Back 4
    { pos: "LB", top: 75, left: 20 },
    { pos: "LM", top: 80, left: 40 },
    { pos: "RM", top: 80, left: 60 },
    { pos: "RB", top: 75, left: 80 },

    // 🧠 Midfield 2 (deeper)
    { pos: "LM", top: 55, left: 40 },
    { pos: "RM", top: 55, left: 60 },

    // 🪂 Wingers
    { pos: "LW", top: 38, left: 15 },
    { pos: "RW", top: 38, left: 85 },

    // ⚔️ Strikers
    { pos: "ST", top: 30, left: 35 },
    { pos: "ST", top: 30, left: 65 },
  ],
};

export const centerFormationVertically = (
  formation: { pos: string; top: number; left: number }[]
) => {
  const tops = formation.map((p) => p.top);
  const minTop = Math.min(...tops);
  const maxTop = Math.max(...tops);
  const center = (minTop + maxTop) / 2;
  const offset = 45 - center;
  const offsetL = -5;
  return formation.map((p) => ({
    ...p,
    top: p.top + offset,
    left: p.left + offsetL,
  }));
};

export const formations = {
  "442": centerFormationVertically(baseFormations["442"]),
  "433": centerFormationVertically(baseFormations["433"]),
  "352": centerFormationVertically(baseFormations["352"]),
  "4231": centerFormationVertically(baseFormations["4231"]),
  "451": centerFormationVertically(baseFormations["451"]),
  "343": centerFormationVertically(baseFormations["343"]),
  "532": centerFormationVertically(baseFormations["532"]),
  "541": centerFormationVertically(baseFormations["541"]),
  "41212": centerFormationVertically(baseFormations["41212"]),
  "4222": centerFormationVertically(baseFormations["4222"]),
  "4321": centerFormationVertically(baseFormations["4321"]),
  "4132": centerFormationVertically(baseFormations["4132"]),
  "424": centerFormationVertically(baseFormations["424"]),
};
