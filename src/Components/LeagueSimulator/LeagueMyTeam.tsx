import { useSquadStore } from "../../store/useSquadStore";
import { adjustTeamOvr, getTeamOvrIndicator } from "../myclub/MyClubUtil";
import { shallow } from "zustand/shallow";

const LeagueMyTeam = () => {
  const {
    myTeamName,
    myFormation,
    myTeamOvr,
    myTeamSquadValue,
    mySelectedPlayers,
  } = useSquadStore(
    (s) => ({
      myTeamName: s.myTeamName,
      myFormation: s.myFormation,
      myTeamOvr: s.myTeamOvr,
      myTeamSquadValue: s.myTeamSquadValue,
      mySelectedPlayers: s.mySelectedPlayers,
    }),
    shallow
  );
  const adjustedTeamOvr = adjustTeamOvr(mySelectedPlayers);

  return (
    <>
      {
        <div
          style={{
            outline: "1px solid blue",
            minWidth: "300px", // ✅ prevent items from becoming too small
            flex: "1 1 30%", // ✅ flexible but constrained
            maxWidth: "100%", // ✅ responsive on shrink
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "auto",
          }}
        >
          <div>My Team</div>
          <div>Formation:{myFormation}</div>
          <div>Team Name: {myTeamName}</div>
          <div>Squad Value: {myTeamSquadValue}</div>
          <div>
            OVR: {myTeamOvr}
            <span>{"->"}</span>
            {adjustedTeamOvr}
            {getTeamOvrIndicator(adjustedTeamOvr, myTeamOvr)}
          </div>
          <div>Players:</div>

          <div
            style={{
              outline: "1px solid red",
              display: "flex",
              flexDirection: "column",
              // flexWrap: "nowrap",
              width: "100%",
              height: "auto",
            }}
          >
            {mySelectedPlayers ? (
              Object.values(mySelectedPlayers).map((player, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // flexWrap: "nowrap",
                    justifyContent: "stretch",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                    outline: "1px solid red",
                  }}
                >
                  {player?.name} - {player?.pos} - OVR: {player?.ovr}
                </div>
              ))
            ) : (
              <div>선수가 없습니다.</div>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default LeagueMyTeam;
