import axios from "axios";

export type Player = {
  id: number;
  rank: number;
  name: string;
  ovr: number;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  acceleration: number;
  sprintSpeed: number;
  positioning: number;
  finishing: number;
  shotPower: number;
  longShots: number;
  volleys: number;
  penalties: number;
  vision: number;
  crossing: number;
  freeKickAccuracy: number;
  shortPassing: number;
  longPassing: number;
  curve: number;
  dribbling: number;
  agility: number;
  balance: number;
  reactions: number;
  ballControl: number;
  composure: number;
  interceptions: number;
  headingAccuracy: number;
  defAwareness: number;
  standingTackle: number;
  slidingTackle: number;
  jumping: number;
  stamina: number;
  strength: number;
  aggression: number;
  pos: string;
  weakFoot: number;
  skillMoves: number;
  preferredFoot: string;
  height: string;
  weight: string;
  alternativePositions: string;
  age: number;
  nation: string;
  league: string;
  team: string;
  playStyle: string;
  url: string;
  img: string;
  gkDiving: number;
  gkHandling: number;
  gkKicking: number;
  gkPositioning: number;
  gkReflexes: number;
};

export const defaultPlayer: Player = {
  id: 0,
  rank: 0,
  name: "",
  ovr: 0,
  pac: 0,
  sho: 0,
  pas: 0,
  dri: 0,
  def: 0,
  phy: 0,
  acceleration: 0,
  sprintSpeed: 0,
  positioning: 0,
  finishing: 0,
  shotPower: 0,
  longShots: 0,
  volleys: 0,
  penalties: 0,
  vision: 0,
  crossing: 0,
  freeKickAccuracy: 0,
  shortPassing: 0,
  longPassing: 0,
  curve: 0,
  dribbling: 0,
  agility: 0,
  balance: 0,
  reactions: 0,
  ballControl: 0,
  composure: 0,
  interceptions: 0,
  headingAccuracy: 0,
  defAwareness: 0,
  standingTackle: 0,
  slidingTackle: 0,
  jumping: 0,
  stamina: 0,
  strength: 0,
  aggression: 0,
  pos: "",
  weakFoot: 0,
  skillMoves: 0,
  preferredFoot: "",
  height: "",
  weight: "",
  alternativePositions: "",
  age: 0,
  nation: "",
  league: "",
  team: "",
  playStyle: "",
  url: "",
  img: "",
  gkDiving: 0,
  gkHandling: 0,
  gkKicking: 0,
  gkPositioning: 0,
  gkReflexes: 0,
};

export type MyPlayer = {
  id: number;
  userId: number;
  playerId: number;
  clubId: number;
  yellowCard: number;
  redCard: number;
  rank: number;
  name: string;
  ovr: number;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  acceleration: number;
  sprintSpeed: number;
  positioning: number;
  finishing: number;
  shotPower: number;
  longShots: number;
  volleys: number;
  penalties: number;
  vision: number;
  crossing: number;
  freeKickAccuracy: number;
  shortPassing: number;
  longPassing: number;
  curve: number;
  dribbling: number;
  agility: number;
  balance: number;
  reactions: number;
  ballControl: number;
  composure: number;
  interceptions: number;
  headingAccuracy: number;
  defAwareness: number;
  standingTackle: number;
  slidingTackle: number;
  jumping: number;
  stamina: number;
  strength: number;
  aggression: number;
  pos: string;
  weakFoot: number;
  skillMoves: number;
  preferredFoot: string;
  height: string;
  weight: string;
  alternativePositions: string;
  age: number;
  nation: string;
  league: string;
  team: string;
  playStyle: string;
  url: string;
  img: string;
  gkDiving: number;
  gkHandling: number;
  gkKicking: number;
  gkPositioning: number;
  gkReflexes: number;
};

export type SquadMap = {
  [position: string]: Player[];
};

export const fetchPlayers = async (
  userId: number,
  clubId: number
): Promise<Player[]> => {
  try {
    console.log(`📦 fetchPlayers: userId=${userId}, clubId=${clubId}`);
    const response = await axios.get(
      `http://localhost:8080/players/${userId}/${clubId}`
    );
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("❌ 클럽 목록 불러오기 실패:", error);
    return [];
  }
};

export const myPlayerToPlayer = (myPlayer: MyPlayer): Player => ({
  id: myPlayer.playerId, // MyPlayer에는 playerId가 따로 존재
  rank: myPlayer.rank,
  name: myPlayer.name,
  ovr: myPlayer.ovr,
  pac: myPlayer.pac,
  sho: myPlayer.sho,
  pas: myPlayer.pas,
  dri: myPlayer.dri,
  def: myPlayer.def,
  phy: myPlayer.phy,
  acceleration: myPlayer.acceleration,
  sprintSpeed: myPlayer.sprintSpeed,
  positioning: myPlayer.positioning,
  finishing: myPlayer.finishing,
  shotPower: myPlayer.shotPower,
  longShots: myPlayer.longShots,
  volleys: myPlayer.volleys,
  penalties: myPlayer.penalties,
  vision: myPlayer.vision,
  crossing: myPlayer.crossing,
  freeKickAccuracy: myPlayer.freeKickAccuracy,
  shortPassing: myPlayer.shortPassing,
  longPassing: myPlayer.longPassing,
  curve: myPlayer.curve,
  dribbling: myPlayer.dribbling,
  agility: myPlayer.agility,
  balance: myPlayer.balance,
  reactions: myPlayer.reactions,
  ballControl: myPlayer.ballControl,
  composure: myPlayer.composure,
  interceptions: myPlayer.interceptions,
  headingAccuracy: myPlayer.headingAccuracy,
  defAwareness: myPlayer.defAwareness,
  standingTackle: myPlayer.standingTackle,
  slidingTackle: myPlayer.slidingTackle,
  jumping: myPlayer.jumping,
  stamina: myPlayer.stamina,
  strength: myPlayer.strength,
  aggression: myPlayer.aggression,
  pos: myPlayer.pos,
  weakFoot: myPlayer.weakFoot,
  skillMoves: myPlayer.skillMoves,
  preferredFoot: myPlayer.preferredFoot,
  height: myPlayer.height,
  weight: myPlayer.weight,
  alternativePositions: myPlayer.alternativePositions,
  age: myPlayer.age,
  nation: myPlayer.nation,
  league: myPlayer.league,
  team: myPlayer.team,
  playStyle: myPlayer.playStyle,
  url: myPlayer.url,
  img: myPlayer.img,
  gkDiving: myPlayer.gkDiving,
  gkHandling: myPlayer.gkHandling,
  gkKicking: myPlayer.gkKicking,
  gkPositioning: myPlayer.gkPositioning,
  gkReflexes: myPlayer.gkReflexes,
});
