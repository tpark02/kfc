import React from "react";
import { useSquadStore } from "../../store/useSquadStore";

const LeagueOpponentTeam: React.FC = () => {
  const { matches, hoveredMatchIndex } = useSquadStore();
  const hoveredMatch =
    hoveredMatchIndex !== null ? matches[hoveredMatchIndex] : matches[0];

  return (
    <>
      <div
        style={{
          outline: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div>Opponent Team</div>
        {/* <div>Formation:{myFormation}</div> */}
        <div>Team Name: {hoveredMatch?.awayTeam}</div>
        {/* <div>Squad Value: {myTeamSquadValue}</div> */}
        <div>OVR: {hoveredMatch?.ovr}</div>
        <div>Players:</div>
        <div
          style={{
            outline: "1px solid red",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            width: "100%",
            height: "100%",
          }}
        >
          {hoveredMatch?.members ? (
            hoveredMatch.members.map((player, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "stretch",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  outline: "1px solid red",
                }}
              >
                {player.name} - {player.pos} - OVR: {player.ovr}
              </div>
            ))
          ) : (
            <div>선수가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default LeagueOpponentTeam;
