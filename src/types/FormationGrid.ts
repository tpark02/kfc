type GridPosition = { gridColumn: number; gridRow: number };

type FormationGrid = {
  [formation: string]: GridPosition[];
};

export const formationGrid: FormationGrid = {
  "442": [
    // ST (Forwards)
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 12, gridRow: 1 }, // RS

    // Midfielders (LM, RM, LCM, RCM)
    { gridColumn: 7, gridRow: 2 }, // LM (was 5)
    { gridColumn: 14, gridRow: 2 }, // RM (was 16)
    { gridColumn: 9, gridRow: 2 }, // LCM (was 8)
    { gridColumn: 12, gridRow: 2 }, // RCM (was 13)

    // Defenders (LB, LCB, RCB, RB)
    { gridColumn: 7, gridRow: 3 }, // LB (was 4)
    { gridColumn: 9, gridRow: 3 }, // LCB (was 7)
    { gridColumn: 12, gridRow: 3 }, // RCB (was 14)
    { gridColumn: 14, gridRow: 3 }, // RB (was 17)

    // Goalkeeper
    { gridColumn: 10, gridRow: 4 }, // GK (centered)
  ],
  "433": [
    // Forwards (LW, ST, RW)
    { gridColumn: 8, gridRow: 1 }, // LW
    { gridColumn: 10, gridRow: 1 }, // ST
    { gridColumn: 12, gridRow: 1 }, // RW

    // Midfielders (LCM, CM, RCM)
    { gridColumn: 8, gridRow: 2 }, // LCM
    { gridColumn: 10, gridRow: 2 }, // CM
    { gridColumn: 12, gridRow: 2 }, // RCM

    // Defenders (LB, LCB, RCB, RB)
    { gridColumn: 7, gridRow: 3 }, // LB
    { gridColumn: 9, gridRow: 3 }, // LCB
    { gridColumn: 11, gridRow: 3 }, // RCB
    { gridColumn: 13, gridRow: 3 }, // RB

    // Goalkeeper
    { gridColumn: 10, gridRow: 4 }, // GK
  ],
  "4231": [
    { gridColumn: 10, gridRow: 1 }, // ST
    { gridColumn: 8, gridRow: 2 }, // CAM-L
    { gridColumn: 10, gridRow: 2 }, // CAM-C
    { gridColumn: 12, gridRow: 2 }, // CAM-R
    { gridColumn: 9, gridRow: 3 }, // CDM-L
    { gridColumn: 11, gridRow: 3 }, // CDM-R
    { gridColumn: 6, gridRow: 4 }, // LB
    { gridColumn: 8, gridRow: 4 }, // LCB
    { gridColumn: 12, gridRow: 4 }, // RCB
    { gridColumn: 14, gridRow: 4 }, // RB
    { gridColumn: 10, gridRow: 5 }, // GK
  ],
  "451": [
    { gridColumn: 10, gridRow: 1 }, // ST

    { gridColumn: 6, gridRow: 2 }, // LM
    { gridColumn: 8, gridRow: 2 }, // LCM
    { gridColumn: 10, gridRow: 2 }, // CAM
    { gridColumn: 12, gridRow: 2 }, // RCM
    { gridColumn: 14, gridRow: 2 }, // RM

    { gridColumn: 6, gridRow: 3 }, // LB
    { gridColumn: 8, gridRow: 3 }, // LCB
    { gridColumn: 12, gridRow: 3 }, // RCB
    { gridColumn: 14, gridRow: 3 }, // RB

    { gridColumn: 10, gridRow: 4 }, // GK
  ],
  "343": [
    { gridColumn: 8, gridRow: 1 }, // LW
    { gridColumn: 10, gridRow: 1 }, // ST
    { gridColumn: 12, gridRow: 1 }, // RW

    { gridColumn: 6, gridRow: 2 }, // LM
    { gridColumn: 8, gridRow: 2 }, // LCM
    { gridColumn: 12, gridRow: 2 }, // RCM
    { gridColumn: 14, gridRow: 2 }, // RM

    { gridColumn: 7, gridRow: 3 }, // LCB
    { gridColumn: 10, gridRow: 3 }, // CB
    { gridColumn: 13, gridRow: 3 }, // RCB

    { gridColumn: 10, gridRow: 4 }, // GK
  ],
  "352": [
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 11, gridRow: 1 }, // RS

    { gridColumn: 6, gridRow: 2 }, // LM
    { gridColumn: 8, gridRow: 2 }, // LCM
    { gridColumn: 10, gridRow: 2 }, // CM
    { gridColumn: 12, gridRow: 2 }, // RCM
    { gridColumn: 14, gridRow: 2 }, // RM

    { gridColumn: 7, gridRow: 3 }, // LCB
    { gridColumn: 10, gridRow: 3 }, // CB
    { gridColumn: 13, gridRow: 3 }, // RCB

    { gridColumn: 10, gridRow: 4 }, // GK
  ],
  "532": [
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 11, gridRow: 1 }, // RS

    { gridColumn: 8, gridRow: 2 }, // LCM
    { gridColumn: 10, gridRow: 2 }, // CM
    { gridColumn: 12, gridRow: 2 }, // RCM

    { gridColumn: 5, gridRow: 3 }, // LB
    { gridColumn: 7, gridRow: 3 }, // LCB
    { gridColumn: 10, gridRow: 3 }, // CB
    { gridColumn: 13, gridRow: 3 }, // RCB
    { gridColumn: 15, gridRow: 3 }, // RB

    { gridColumn: 10, gridRow: 4 }, // GK
  ],
  "541": [
    { gridColumn: 10, gridRow: 1 }, // ST

    { gridColumn: 6, gridRow: 2 }, // LM
    { gridColumn: 8, gridRow: 2 }, // LCM
    { gridColumn: 12, gridRow: 2 }, // RCM
    { gridColumn: 14, gridRow: 2 }, // RM

    { gridColumn: 5, gridRow: 3 }, // LB
    { gridColumn: 7, gridRow: 3 }, // LCB
    { gridColumn: 10, gridRow: 3 }, // CB
    { gridColumn: 13, gridRow: 3 }, // RCB
    { gridColumn: 15, gridRow: 3 }, // RB

    { gridColumn: 10, gridRow: 4 }, // GK
  ],
  "41212": [
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 11, gridRow: 1 }, // RS

    { gridColumn: 10, gridRow: 2 }, // CAM

    { gridColumn: 8, gridRow: 3 }, // LCM
    { gridColumn: 12, gridRow: 3 }, // RCM

    { gridColumn: 10, gridRow: 4 }, // CDM

    { gridColumn: 6, gridRow: 5 }, // LB
    { gridColumn: 8, gridRow: 5 }, // LCB
    { gridColumn: 12, gridRow: 5 }, // RCB
    { gridColumn: 14, gridRow: 5 }, // RB

    { gridColumn: 10, gridRow: 6 }, // GK
  ],
  "4222": [
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 11, gridRow: 1 }, // RS

    { gridColumn: 8, gridRow: 2 }, // L-CAM
    { gridColumn: 12, gridRow: 2 }, // R-CAM

    { gridColumn: 8, gridRow: 3 }, // LCDM
    { gridColumn: 12, gridRow: 3 }, // RCDM

    { gridColumn: 6, gridRow: 4 }, // LB
    { gridColumn: 8, gridRow: 4 }, // LCB
    { gridColumn: 12, gridRow: 4 }, // RCB
    { gridColumn: 14, gridRow: 4 }, // RB

    { gridColumn: 10, gridRow: 5 }, // GK
  ],
  "4321": [
    { gridColumn: 10, gridRow: 1 }, // ST

    { gridColumn: 8, gridRow: 2 }, // L-CAM
    { gridColumn: 12, gridRow: 2 }, // R-CAM

    { gridColumn: 7, gridRow: 3 }, // LCM
    { gridColumn: 10, gridRow: 3 }, // CM
    { gridColumn: 13, gridRow: 3 }, // RCM

    { gridColumn: 6, gridRow: 4 }, // LB
    { gridColumn: 8, gridRow: 4 }, // LCB
    { gridColumn: 12, gridRow: 4 }, // RCB
    { gridColumn: 14, gridRow: 4 }, // RB

    { gridColumn: 10, gridRow: 5 }, // GK
  ],
  "4132": [
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 11, gridRow: 1 }, // RS

    { gridColumn: 6, gridRow: 2 }, // LM
    { gridColumn: 10, gridRow: 2 }, // CAM
    { gridColumn: 14, gridRow: 2 }, // RM

    { gridColumn: 10, gridRow: 3 }, // CDM

    { gridColumn: 6, gridRow: 4 }, // LB
    { gridColumn: 8, gridRow: 4 }, // LCB
    { gridColumn: 12, gridRow: 4 }, // RCB
    { gridColumn: 14, gridRow: 4 }, // RB

    { gridColumn: 10, gridRow: 5 }, // GK
  ],
  "424": [
    { gridColumn: 7, gridRow: 1 }, // LW
    { gridColumn: 9, gridRow: 1 }, // LS
    { gridColumn: 11, gridRow: 1 }, // RS
    { gridColumn: 13, gridRow: 1 }, // RW

    { gridColumn: 9, gridRow: 2 }, // LCM
    { gridColumn: 11, gridRow: 2 }, // RCM

    { gridColumn: 6, gridRow: 3 }, // LB
    { gridColumn: 8, gridRow: 3 }, // LCB
    { gridColumn: 12, gridRow: 3 }, // RCB
    { gridColumn: 14, gridRow: 3 }, // RB

    { gridColumn: 10, gridRow: 4 }, // GK
  ],
};
