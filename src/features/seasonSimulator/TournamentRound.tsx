import { MyPlayer } from "../../types/player";

interface MatchDto {
  id: number;
  round: number;
  player1Name: string;
  player2Name: string;
  winnerName: string;
  myPlayerList1: MyPlayer[]; // ✅ 추가
  myPlayerList2: MyPlayer[]; // ✅ 추가
}

interface Props {
  title: string;
  matches: MatchDto[];
  onMatchClick?: (match: MatchDto) => void;
  setIsMatchClicked: (b: boolean) => void;
}

export default function TournamentRound({
  title,
  matches,
  onMatchClick,
  setIsMatchClicked,
}: Props) {
  return (
    <div className="tournament-bracket__round">
      <h2 className="tournament-bracket__round-title">{title}</h2>
      <ul className="tournament-bracket__list">
        {matches.map((match) => (
          <li key={match.id} className="tournament-bracket__item">
            <div
              className="tournament-bracket__match"
              tabIndex={0}
              onBlur={() => setIsMatchClicked(false)}
            >
              <table className="tournament-bracket__table">
                <caption className="tournament-bracket__caption">
                  {/* You can add match date here */}
                </caption>
                <tbody
                  className="tournament-bracket__content"
                  onClick={() => {
                    onMatchClick?.(match);
                    setIsMatchClicked(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {[match.player1Name, match.player2Name].map((player, i) => {
                    const isWinner = match.winnerName === player;
                    return (
                      <tr
                        key={player}
                        className={`tournament-bracket__team ${
                          isWinner ? "tournament-bracket__team--winner" : ""
                        }`}
                      >
                        <td className="tournament-bracket__country">
                          {/* <Tooltip
                            title={
                              i === 0
                                ? match.myPlayerList1
                                    ?.map((p) => p.name)
                                    .join(", ")
                                : match.myPlayerList2
                                    ?.map((p) => p.name)
                                    .join(", ")
                            }
                          > */}
                            <abbr
                              className="tournament-bracket__code"
                              title={player}
                            >
                              {player.slice(0, 3).toUpperCase()}
                            </abbr>
                          {/* </Tooltip> */}
                        </td>
                        <td className="tournament-bracket__score">
                          <span className="tournament-bracket__number">
                            {isWinner ? 1 : 0}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
