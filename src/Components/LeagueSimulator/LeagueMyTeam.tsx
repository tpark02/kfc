import { useSquadStore } from "../../store/useSquadStore";

const LeagueMyTeam = () => {
  const { myTeamName, dropPlayers, myTeamOvr, myFormation, myTeamSquadValue } =
    useSquadStore();

  return (
    <>
      {
        <div
          style={{
            outline: "1px solid blue",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <div>My Team</div>
          <div>Formation:{myFormation}</div>
          <div>Team Name: {myTeamName}</div>
          <div>Squad Value: {myTeamSquadValue}</div>
          <div>OVR: {myTeamOvr}</div>
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
            {dropPlayers ? (
              Object.values(dropPlayers).map((player, idx) => (
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
