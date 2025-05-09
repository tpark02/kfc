import { useSquadStore } from "../../store/useSquadStore";

export const LeagueMyTeam = () => {
  const { myTeamName, dropPlayers, myTeamOvr, myFormation } = useSquadStore();

  return (
    <>
      {
        <div style={{ margin: "50px" }}>
          <h2>My Team</h2>
          <div>Formation:{myFormation}</div>
          <div>Team Name: {myTeamName}</div>
          <div>Squad Value: $100,000,000</div>
          <div>OVR: {myTeamOvr}</div>
          <div>Players:</div>
          <ul>
            {dropPlayers ? (
              Object.values(dropPlayers).map((player, idx) => (
                <li key={idx}>
                  {player?.name} - {player?.pos} - OVR: {player?.ovr}
                </li>
              ))
            ) : (
              <div>선수가 없습니다.</div>
            )}
          </ul>
        </div>
      }
    </>
  );
};
