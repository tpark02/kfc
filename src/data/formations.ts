import { totalNumberOfPlayers } from "../types/team";

export const baseFormations = {
  "442": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 80, left: 15 },
    { pos: "CB2", top: 85, left: 35 },
    { pos: "CB1", top: 85, left: 65 },
    { pos: "RB", top: 80, left: 85 },
    { pos: "LM", top: 50, left: 20 },
    { pos: "CM2", top: 60, left: 35 },
    { pos: "CM1", top: 60, left: 65 },
    { pos: "RM", top: 50, left: 80 },
    { pos: "ST2", top: 30, left: 40 },
    { pos: "ST1", top: 30, left: 60 },
  ],
  "433": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 80, left: 15 },
    { pos: "CB2", top: 85, left: 35 },
    { pos: "CB1", top: 85, left: 65 },
    { pos: "RB", top: 80, left: 85 },
    { pos: "CM3", top: 55, left: 20 },
    { pos: "CM2", top: 60, left: 48 },
    { pos: "CM1", top: 55, left: 80 },
    { pos: "LW", top: 35, left: 25 },
    { pos: "ST", top: 30, left: 48 },
    { pos: "RW", top: 35, left: 75 },
  ],
  "352": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 75, left: 15 },
    { pos: "CB", top: 75, left: 50 },
    { pos: "RB", top: 75, left: 85 },
    { pos: "LM", top: 55, left: 20 },
    { pos: "CDM2", top: 60, left: 33 },
    { pos: "CAM", top: 50, left: 50 },
    { pos: "CDM1", top: 60, left: 63 },
    { pos: "RM", top: 55, left: 80 },
    { pos: "ST2", top: 30, left: 40 },
    { pos: "ST1", top: 30, left: 60 },
  ],
  "4231": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 75, left: 15 },
    { pos: "CB2", top: 75, left: 38 },
    { pos: "CB1", top: 75, left: 60 },
    { pos: "RB", top: 75, left: 85 },
    { pos: "CDM2", top: 65, left: 30 },
    { pos: "CDM1", top: 65, left: 70 },
    { pos: "CAM3", top: 37, left: 25 },
    { pos: "CAM2", top: 45, left: 50 },
    { pos: "CAM1", top: 37.5, left: 75 },
    { pos: "ST", top: 30, left: 50 },
  ],
  "451": [
    { pos: "GK", top: 90.0, left: 50 },
    { pos: "LB", top: 75.0, left: 15 },
    { pos: "CB2", top: 75.0, left: 35 },
    { pos: "CB1", top: 75.0, left: 65 },
    { pos: "RB", top: 75.0, left: 85 },
    { pos: "LM", top: 60.0, left: 20 },
    { pos: "CM", top: 60.0, left: 50 },
    { pos: "RM", top: 60.0, left: 80 },
    { pos: "CAM2", top: 45.0, left: 65 },
    { pos: "CAM1", top: 45.0, left: 35 },
    { pos: "ST", top: 30, left: 50 },
  ],
  "343": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 75, left: 28 },
    { pos: "CB", top: 75, left: 50 },
    { pos: "RB", top: 75, left: 70 },
    { pos: "LM", top: 65, left: 20 },
    { pos: "CM2", top: 65, left: 40 },
    { pos: "CM1", top: 65, left: 60 },
    { pos: "RM", top: 65, left: 80 },
    { pos: "LW", top: 45, left: 30 },
    { pos: "ST", top: 30, left: 50 },
    { pos: "RW", top: 45, left: 70 },
  ],
  "532": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 70, left: 20 },
    { pos: "CB3", top: 80, left: 35 },
    { pos: "CB2", top: 70, left: 50 },
    { pos: "CB1", top: 80, left: 65 },
    { pos: "RB", top: 70, left: 80 },
    { pos: "LM", top: 40, left: 25 },
    { pos: "CM", top: 50, left: 50 },
    { pos: "RM", top: 40, left: 75 },
    { pos: "ST2", top: 30, left: 40 },
    { pos: "ST1", top: 30, left: 60 },
  ],
  "541": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 90, left: 50 },

    // 🛡 Defenders
    { pos: "LB", top: 70, left: 20 },
    { pos: "CB3", top: 80, left: 35 },
    { pos: "CB2", top: 70, left: 50 },
    { pos: "CB1", top: 80, left: 65 },
    { pos: "RB", top: 70, left: 80 },

    // 🧠 Midfielders
    { pos: "LM", top: 40, left: 25 },
    { pos: "CM2", top: 50, left: 40 },
    { pos: "CM1", top: 50, left: 60 },
    { pos: "RM", top: 40, left: 75 },

    // ⚔️ Striker
    { pos: "ST", top: 30, left: 50 },
  ],

  "41212": [
    { pos: "GK", top: 90, left: 50 },
    { pos: "LB", top: 75, left: 20 },
    { pos: "CB2", top: 75, left: 35 },
    { pos: "CB1", top: 75, left: 65 },
    { pos: "RB", top: 75, left: 80 },
    { pos: "LM", top: 48, left: 25 },
    { pos: "CDM", top: 60, left: 50 },
    { pos: "RM", top: 48, left: 75 },
    { pos: "CAM", top: 45, left: 50 },
    { pos: "ST2", top: 30, left: 40 },
    { pos: "ST1", top: 30, left: 60 },
  ],
  "4222": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 90, left: 50 },

    // 🛡 Fullbacks (standard)
    { pos: "LB", top: 68, left: 20 },
    { pos: "RB", top: 68, left: 80 },

    // 🛡 Center Backs (deeper than CDMs)
    { pos: "CB2", top: 78, left: 42 },
    { pos: "CB1", top: 78, left: 58 },

    // 🧠 Defensive Midfielders
    { pos: "CDM2", top: 55, left: 40 },
    { pos: "CDM1", top: 55, left: 60 },

    // 🎯 Wide Attacking Midfielders
    { pos: "LM", top: 44, left: 27 },
    { pos: "RM", top: 44, left: 73 },

    // ⚔️ Strikers
    { pos: "ST2", top: 28, left: 42 },
    { pos: "ST1", top: 28, left: 58 },
  ],

  "4321": [
    { pos: "GK", top: 80, left: 50 },
    { pos: "LB", top: 62.5, left: 20 },
    { pos: "CB2", top: 62.5, left: 40 },
    { pos: "CB1", top: 62.5, left: 60 },
    { pos: "RB", top: 62.5, left: 80 },
    { pos: "LM", top: 47.5, left: 35 },
    { pos: "CM", top: 42.5, left: 50 },
    { pos: "RM", top: 47.5, left: 65 },
    { pos: "CAM2", top: 32.5, left: 40 },
    { pos: "CAM1", top: 32.5, left: 60 },
    { pos: "ST", top: 22.5, left: 50 },
  ],
  "4132": [
    { pos: "GK", top: 85, left: 50 },
    { pos: "LB", top: 62.5, left: 20 },
    { pos: "CB2", top: 62.5, left: 40 },
    { pos: "CB1", top: 62.5, left: 60 },
    { pos: "RB", top: 62.5, left: 80 },
    { pos: "LM", top: 42.5, left: 25 },
    { pos: "CM2", top: 52.5, left: 50 },
    { pos: "CM1", top: 35.5, left: 50 },
    { pos: "RM", top: 42.5, left: 75 },
    { pos: "ST2", top: 22.5, left: 40 },
    { pos: "ST1", top: 22.5, left: 60 },
  ],
  "424": [
    // 🧤 Goalkeeper
    { pos: "GK", top: 90, left: 50 },

    // 🛡 Back 4
    { pos: "LB", top: 65, left: 20 },
    { pos: "CB2", top: 75, left: 40 },
    { pos: "CB1", top: 75, left: 60 },
    { pos: "RB", top: 65, left: 80 },

    // 🧠 Midfield 2 (deeper)
    { pos: "CDM2", top: 55, left: 40 },
    { pos: "CDM1", top: 55, left: 60 },

    // 🪂 Wingers
    { pos: "LW", top: 40, left: 25 },
    { pos: "RW", top: 40, left: 75 },

    // ⚔️ Strikers
    { pos: "ST2", top: 30, left: 40 },
    { pos: "ST1", top: 30, left: 60 },
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
