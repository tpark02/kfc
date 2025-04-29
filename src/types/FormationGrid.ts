type GridPosition = {
  gridColumn: number;
  gridRow: number;
  position: string;
};

type FormationGrid = {
  [formation: string]: GridPosition[];
};

export const formationGrid: FormationGrid = {
  "442": [
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 12, gridRow: 1, position: "ST" },
    { gridColumn: 7, gridRow: 2, position: "LM" },
    { gridColumn: 14, gridRow: 2, position: "RM" },
    { gridColumn: 9, gridRow: 2, position: "CAM" },
    { gridColumn: 12, gridRow: 2, position: "CAM" },
    { gridColumn: 7, gridRow: 3, position: "LB" },
    { gridColumn: 9, gridRow: 3, position: "CDM" },
    { gridColumn: 12, gridRow: 3, position: "CDM" },
    { gridColumn: 14, gridRow: 3, position: "RB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "433": [
    { gridColumn: 8, gridRow: 1, position: "LW" },
    { gridColumn: 10, gridRow: 1, position: "ST" },
    { gridColumn: 12, gridRow: 1, position: "RW" },
    { gridColumn: 8, gridRow: 2, position: "LM" },
    { gridColumn: 10, gridRow: 2, position: "CM" },
    { gridColumn: 12, gridRow: 2, position: "RM" },
    { gridColumn: 7, gridRow: 3, position: "LB" },
    { gridColumn: 9, gridRow: 3, position: "CB" },
    { gridColumn: 11, gridRow: 3, position: "CB" },
    { gridColumn: 13, gridRow: 3, position: "RB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "4231": [
    { gridColumn: 10, gridRow: 1, position: "ST" },
    { gridColumn: 8, gridRow: 2, position: "CAM" },
    { gridColumn: 10, gridRow: 2, position: "CAM" },
    { gridColumn: 12, gridRow: 2, position: "CAM" },
    { gridColumn: 9, gridRow: 3, position: "CDM" },
    { gridColumn: 11, gridRow: 3, position: "CDM" },
    { gridColumn: 6, gridRow: 4, position: "LB" },
    { gridColumn: 8, gridRow: 4, position: "CB" },
    { gridColumn: 12, gridRow: 4, position: "CB" },
    { gridColumn: 14, gridRow: 4, position: "RB" },
    { gridColumn: 10, gridRow: 5, position: "GK" },
  ],
  "451": [
    { gridColumn: 10, gridRow: 1, position: "ST" },
    { gridColumn: 6, gridRow: 2, position: "LM" },
    { gridColumn: 8, gridRow: 2, position: "LM" },
    { gridColumn: 10, gridRow: 2, position: "CAM" },
    { gridColumn: 12, gridRow: 2, position: "RM" },
    { gridColumn: 14, gridRow: 2, position: "RM" },
    { gridColumn: 6, gridRow: 3, position: "LB" },
    { gridColumn: 8, gridRow: 3, position: "CB" },
    { gridColumn: 12, gridRow: 3, position: "CB" },
    { gridColumn: 14, gridRow: 3, position: "RB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "343": [
    { gridColumn: 8, gridRow: 1, position: "LW" },
    { gridColumn: 10, gridRow: 1, position: "ST" },
    { gridColumn: 12, gridRow: 1, position: "RW" },
    { gridColumn: 6, gridRow: 2, position: "LM" },
    { gridColumn: 8, gridRow: 2, position: "CAM" },
    { gridColumn: 12, gridRow: 2, position: "CAM" },
    { gridColumn: 14, gridRow: 2, position: "RM" },
    { gridColumn: 7, gridRow: 3, position: "CB" },
    { gridColumn: 10, gridRow: 3, position: "CB" },
    { gridColumn: 13, gridRow: 3, position: "CB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "352": [
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 11, gridRow: 1, position: "ST" },
    { gridColumn: 6, gridRow: 2, position: "LM" },
    { gridColumn: 8, gridRow: 2, position: "CM" },
    { gridColumn: 10, gridRow: 2, position: "CM" },
    { gridColumn: 12, gridRow: 2, position: "CM" },
    { gridColumn: 14, gridRow: 2, position: "RM" },
    { gridColumn: 7, gridRow: 3, position: "CB" },
    { gridColumn: 10, gridRow: 3, position: "CB" },
    { gridColumn: 13, gridRow: 3, position: "CB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "532": [
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 11, gridRow: 1, position: "ST" },
    { gridColumn: 8, gridRow: 2, position: "CM" },
    { gridColumn: 10, gridRow: 2, position: "CM" },
    { gridColumn: 12, gridRow: 2, position: "CM" },
    { gridColumn: 5, gridRow: 3, position: "LB" },
    { gridColumn: 7, gridRow: 3, position: "CB" },
    { gridColumn: 10, gridRow: 3, position: "CB" },
    { gridColumn: 13, gridRow: 3, position: "CB" },
    { gridColumn: 15, gridRow: 3, position: "RB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "541": [
    { gridColumn: 10, gridRow: 1, position: "ST" },
    { gridColumn: 6, gridRow: 2, position: "LM" },
    { gridColumn: 8, gridRow: 2, position: "CM" },
    { gridColumn: 12, gridRow: 2, position: "CM" },
    { gridColumn: 14, gridRow: 2, position: "RM" },
    { gridColumn: 5, gridRow: 3, position: "LB" },
    { gridColumn: 7, gridRow: 3, position: "CB" },
    { gridColumn: 10, gridRow: 3, position: "CB" },
    { gridColumn: 13, gridRow: 3, position: "CB" },
    { gridColumn: 15, gridRow: 3, position: "RB" },
    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
  "41212": [
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 11, gridRow: 1, position: "ST" },

    { gridColumn: 10, gridRow: 2, position: "CAM" },

    { gridColumn: 8, gridRow: 3, position: "CM" },
    { gridColumn: 12, gridRow: 3, position: "CM" },

    { gridColumn: 10, gridRow: 4, position: "CDM" },

    { gridColumn: 6, gridRow: 5, position: "LB" },
    { gridColumn: 8, gridRow: 5, position: "LB" },
    { gridColumn: 12, gridRow: 5, position: "CB" },
    { gridColumn: 14, gridRow: 5, position: "RB" },

    { gridColumn: 10, gridRow: 6, position: "GK" },
  ],

  "4222": [
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 11, gridRow: 1, position: "ST" },

    { gridColumn: 8, gridRow: 2, position: "CAM" },
    { gridColumn: 12, gridRow: 2, position: "CAM" },

    { gridColumn: 8, gridRow: 3, position: "CDM" },
    { gridColumn: 12, gridRow: 3, position: "CDM" },

    { gridColumn: 6, gridRow: 4, position: "LB" },
    { gridColumn: 8, gridRow: 4, position: "LB" },
    { gridColumn: 12, gridRow: 4, position: "RB" },
    { gridColumn: 14, gridRow: 4, position: "RB" },

    { gridColumn: 10, gridRow: 5, position: "GK" },
  ],

  "4321": [
    { gridColumn: 10, gridRow: 1, position: "ST" },

    { gridColumn: 8, gridRow: 2, position: "CAM" },
    { gridColumn: 12, gridRow: 2, position: "CAM" },

    { gridColumn: 7, gridRow: 3, position: "CM" },
    { gridColumn: 10, gridRow: 3, position: "CM" },
    { gridColumn: 13, gridRow: 3, position: "CM" },

    { gridColumn: 6, gridRow: 4, position: "LB" },
    { gridColumn: 8, gridRow: 4, position: "CB" },
    { gridColumn: 12, gridRow: 4, position: "CB" },
    { gridColumn: 14, gridRow: 4, position: "RB" },

    { gridColumn: 10, gridRow: 5, position: "GK" },
  ],

  "4132": [
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 11, gridRow: 1, position: "ST" },

    { gridColumn: 6, gridRow: 2, position: "LM" },
    { gridColumn: 10, gridRow: 2, position: "CAM" },
    { gridColumn: 14, gridRow: 2, position: "RM" },

    { gridColumn: 10, gridRow: 3, position: "CDM" },

    { gridColumn: 6, gridRow: 4, position: "LB" },
    { gridColumn: 8, gridRow: 4, position: "CB" },
    { gridColumn: 12, gridRow: 4, position: "CB" },
    { gridColumn: 14, gridRow: 4, position: "RB" },

    { gridColumn: 10, gridRow: 5, position: "GK" },
  ],

  "424": [
    { gridColumn: 7, gridRow: 1, position: "LW" },
    { gridColumn: 9, gridRow: 1, position: "ST" },
    { gridColumn: 11, gridRow: 1, position: "ST" },
    { gridColumn: 13, gridRow: 1, position: "RW" },

    { gridColumn: 9, gridRow: 2, position: "CM" },
    { gridColumn: 11, gridRow: 2, position: "CM" },

    { gridColumn: 6, gridRow: 3, position: "LB" },
    { gridColumn: 8, gridRow: 3, position: "CB" },
    { gridColumn: 12, gridRow: 3, position: "CB" },
    { gridColumn: 14, gridRow: 3, position: "RB" },

    { gridColumn: 10, gridRow: 4, position: "GK" },
  ],
};
