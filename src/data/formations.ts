import { totalNumberOfPlayers } from "../types/team";

export const baseFormations = {
  "442": [
    { pos: "GK", top: 95, left: 50 },
    { pos: "LB", top: 80, left: 20 },
    { pos: "CB2", top: 85, left: 40 },
    { pos: "CB1", top: 85, left: 65 },
    { pos: "RB", top: 80, left: 85 },
    { pos: "LM", top: 50, left: 30 },
    { pos: "CM2", top: 60, left: 40 },
    { pos: "CM1", top: 60, left: 65 },
    { pos: "RM", top: 50, left: 75 },
    { pos: "ST2", top: 40, left: 45 },
    { pos: "ST1", top: 40, left: 60 },
  ],
  "433": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 80, left: 20 },
    { pos: "CB2", top: 85, left: 40 },
    { pos: "CB1", top: 85, left: 65 },
    { pos: "RB", top: 80, left: 85 },
    { pos: "CM3", top: 55, left: 30 },
    { pos: "CM2", top: 60, left: 53 },
    { pos: "CM1", top: 55, left: 75 },
    { pos: "LW", top: 40, left: 35 },
    { pos: "ST", top: 35, left: 53 },
    { pos: "RW", top: 40, left: 70 },
  ],
  "352": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 75, left: 25 },
    { pos: "CB", top: 75, left: 53 },
    { pos: "RB", top: 75, left: 83 },
    { pos: "LM", top: 55, left: 25 },
    { pos: "CDM2", top: 60, left: 38 },
    { pos: "CAM", top: 50, left: 53 },
    { pos: "CDM1", top: 60, left: 68 },
    { pos: "RM", top: 55, left: 80 },
    { pos: "ST2", top: 35, left: 45 },
    { pos: "ST1", top: 35, left: 60 },
  ],
  "4231": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 75, left: 18 },
    { pos: "CB2", top: 75, left: 41 },
    { pos: "CB1", top: 75, left: 63 },
    { pos: "RB", top: 75, left: 88 },
    { pos: "CDM2", top: 65, left: 33 },
    { pos: "CDM1", top: 65, left: 73 },
    { pos: "CAM3", top: 37, left: 33 },
    { pos: "CAM2", top: 45, left: 53 },
    { pos: "CAM1", top: 37.5, left: 73 },
    { pos: "ST", top: 35, left: 53 },
  ],
  "451": [
    { pos: "GK", top: 90.0, left: 53 },
    { pos: "LB", top: 75.0, left: 20 },
    { pos: "CB2", top: 75.0, left: 38 },
    { pos: "CB1", top: 75.0, left: 68 },
    { pos: "RB", top: 75.0, left: 88 },
    { pos: "LM", top: 60.0, left: 23 },
    { pos: "CM", top: 60.0, left: 53 },
    { pos: "RM", top: 60.0, left: 83 },
    { pos: "CAM2", top: 45.0, left: 68 },
    { pos: "CAM1", top: 45.0, left: 38 },
    { pos: "ST", top: 35, left: 53 },
  ],
  "343": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 75, left: 31 },
    { pos: "CB", top: 75, left: 53 },
    { pos: "RB", top: 75, left: 73 },
    { pos: "LM", top: 65, left: 23 },
    { pos: "CM2", top: 65, left: 43 },
    { pos: "CM1", top: 65, left: 63 },
    { pos: "RM", top: 65, left: 83 },
    { pos: "LW", top: 45, left: 33 },
    { pos: "ST", top: 35, left: 53 },
    { pos: "RW", top: 45, left: 73 },
  ],
  "532": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 70, left: 23 },
    { pos: "CB3", top: 80, left: 38 },
    { pos: "CB2", top: 70, left: 53 },
    { pos: "CB1", top: 80, left: 68 },
    { pos: "RB", top: 70, left: 83 },
    { pos: "LM", top: 45, left: 28 },
    { pos: "CM", top: 55, left: 53 },
    { pos: "RM", top: 45, left: 78 },
    { pos: "ST2", top: 35, left: 43 },
    { pos: "ST1", top: 35, left: 63 },
  ],
  "541": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 90, left: 53 },

    // 🛡 Defenders
    { pos: "LB", top: 70, left: 23 },
    { pos: "CB3", top: 80, left: 38 },
    { pos: "CB2", top: 70, left: 53 },
    { pos: "CB1", top: 80, left: 68 },
    { pos: "RB", top: 70, left: 83 },

    // 🧠 Midfielders
    { pos: "LM", top: 40, left: 28 },
    { pos: "CM2", top: 50, left: 43 },
    { pos: "CM1", top: 50, left: 63 },
    { pos: "RM", top: 40, left: 75 },

    // ⚔️ Striker
    { pos: "ST", top: 35, left: 53 },
  ],

  "41212": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 75, left: 23 },
    { pos: "CB2", top: 75, left: 38 },
    { pos: "CB1", top: 75, left: 68 },
    { pos: "RB", top: 75, left: 83 },
    { pos: "LM", top: 48, left: 28 },
    { pos: "CDM", top: 60, left: 53 },
    { pos: "RM", top: 48, left: 78 },
    { pos: "CAM", top: 45, left: 53 },
    { pos: "ST2", top: 35, left: 43 },
    { pos: "ST1", top: 35, left: 63 },
  ],
  "4222": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 90, left: 53 },

    // 🛡 Fullbacks (standard)
    { pos: "LB", top: 68, left: 23 },
    { pos: "RB", top: 68, left: 83 },

    // 🛡 Center Backs (deeper than CDMs)
    { pos: "CB2", top: 78, left: 45 },
    { pos: "CB1", top: 78, left: 61 },

    // 🧠 Defensive Midfielders
    { pos: "CDM2", top: 55, left: 43 },
    { pos: "CDM1", top: 55, left: 63 },

    // 🎯 Wide Attacking Midfielders
    { pos: "LM", top: 44, left: 30 },
    { pos: "RM", top: 44, left: 76 },

    // ⚔️ Strikers
    { pos: "ST2", top: 35, left: 45 },
    { pos: "ST1", top: 35, left: 61 },
  ],

  "4321": [
    { pos: "GK", top: 80, left: 53 },
    { pos: "LB", top: 62.5, left: 23 },
    { pos: "CB2", top: 62.5, left: 43 },
    { pos: "CB1", top: 62.5, left: 63 },
    { pos: "RB", top: 62.5, left: 83 },
    { pos: "LM", top: 47.5, left: 38 },
    { pos: "CM", top: 42.5, left: 53 },
    { pos: "RM", top: 47.5, left: 68 },
    { pos: "CAM2", top: 32.5, left: 43 },
    { pos: "CAM1", top: 32.5, left: 63 },
    { pos: "ST", top: 22.5, left: 53 },
  ],
  "4132": [
    { pos: "GK", top: 90, left: 53 },
    { pos: "LB", top: 77.5, left: 23 },
    { pos: "CB2", top: 77.5, left: 43 },
    { pos: "CB1", top: 77.5, left: 63 },
    { pos: "RB", top: 77.5, left: 83 },
    { pos: "LM", top: 57.5, left: 28 },
    { pos: "CM2", top: 67.5, left: 53 },
    { pos: "CM1", top: 50, left: 53 },
    { pos: "RM", top: 57, left: 78 },
    { pos: "ST2", top: 35, left: 43 },
    { pos: "ST1", top: 35, left: 63 },
  ],
  "424": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 100, left: 53 },

    // 🛡 Back 4
    { pos: "LB", top: 83, left: 23 },
    { pos: "CB2", top: 88, left: 43 },
    { pos: "CB1", top: 88, left: 63 },
    { pos: "RB", top: 83, left: 83 },

    // 🧠 Midfield 2 (deeper)
    { pos: "CDM2", top: 75, left: 43 },
    { pos: "CDM1", top: 75, left: 63 },

    // 🪂 Wingers
    { pos: "LW", top: 60, left: 28 },
    { pos: "RW", top: 60, left: 78 },

    // ⚔️ Strikers
    { pos: "ST2", top: 45, left: 43 },
    { pos: "ST1", top: 45, left: 63 },
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

export const positionMultiplier: { [key: string]: number } = {
  GK: 0.9,
  CB: 1.0,
  LB: 1.0,
  RB: 1.0,
  CDM: 1.05,
  CM: 1.1,
  CAM: 1.15,
  LM: 1.1,
  RM: 1.1,
  LW: 1.2,
  RW: 1.2,
  ST: 1.3,
  CF: 1.25,
};

export const TOTAL_DROP_ZONES = totalNumberOfPlayers;
