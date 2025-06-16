import { MyPlayer } from "../../types/player";

function getMaxClubCount(players: { [index: number]: MyPlayer | null }) {
  const clubCount: { [key: string]: number } = {};

  for (const p of Object.values(players)) {
    if (p && p.team && p.team !== "") {
      clubCount[p.team] = (clubCount[p.team] || 0) + 1;
    }
  }

  const maxCount = Math.max(...Object.values(clubCount), 0);
  return maxCount * 10;
}

// Position multipliers
const POSITION_MULTIPLIER = Object.freeze({
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
});

// Estimate value function
function estimateValue(player: MyPlayer) {
  const baseValue = Math.pow(player.ovr, 2);
  const multiplier =
    POSITION_MULTIPLIER[player.pos as keyof typeof POSITION_MULTIPLIER] || 1.0;

  // console.log(
  //   `estimating: ${player.name} / pos=${player.pos} / ovr=${player.ovr}`
  // );

  return Math.round(baseValue * multiplier);
}

export const getTeamAvr = (players: MyPlayer[]) => {
  let totalCount = 0;
  Object.values(players).map((p) => {
    totalCount += p !== null ? 1 : 0;
  });

  let ovr = 0,
    spd = 0,
    atk = 0,
    def = 0,
    sta = 0,
    tc = 0,
    squadVal = 0;

  for (let i = 0; i < Object.values(players).length; i++) {
    if (players[i] === undefined) continue;
    ovr += players[i]?.ovr ?? 0;
    spd += players[i]?.pac ?? 0;
    atk += players[i]?.sho ?? 0;
    def += players[i]?.def ?? 0;
    sta += players[i]?.stamina ?? 0;
    squadVal += estimateValue(players[i]!);
  }

  ovr /= totalCount;
  spd /= totalCount;
  atk /= totalCount;
  def /= totalCount;
  sta /= totalCount;
  tc = getMaxClubCount(players);

  ovr = Math.round(ovr);
  spd = Math.round(spd);
  atk = Math.round(atk);
  def = Math.round(def);
  sta = Math.round(sta);
  tc = Math.round(tc);

  return {
    ovr: ovr,
    spd: spd,
    atk: atk,
    def: def,
    sta: sta,
    tc: tc,
    squadVal: squadVal,
  };
};
