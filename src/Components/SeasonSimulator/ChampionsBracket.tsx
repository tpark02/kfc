import { useEffect, useState } from "react";
import axios from "axios";
import TournamentRound from "./TournamentRound";
import "../../style/bracket.css";

interface MatchDto {
  id: number;
  round: number;
  player1Name: string;
  player2Name: string;
  winnerName: string;
}

interface MatchListProps {
  seasonId: number;
}

export default function ChampionsBracket({ seasonId }: MatchListProps) {
  const [finalGame, setFinalGame] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!seasonId || isNaN(Number(seasonId))) {
      console.warn("Invalid seasonId:", seasonId);
      return;
    }

    const fetchMatches = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/season/${seasonId}/matches`
        );

        const data: MatchDto[] = res.data;
        if (!Array.isArray(data) || data.length === 0) {
          console.warn("No match data available");
          return;
        }

        const gamesList: any[] = [];
        data.forEach((match) => {
          const game = {
            id: String(match.id),
            name: `Round ${match.round}`,
            scheduled: Date.now(),
            sides: {
              home: {
                team: { id: `${match.id}-1`, name: match.player1Name },
                score: { score: match.winnerName === match.player1Name ? 1 : 0 },
                seed: { displayName: "A1", rank: 1, sourceGame: null, sourcePool: {} },
              },
              visitor: {
                team: { id: `${match.id}-2`, name: match.player2Name },
                score: { score: match.winnerName === match.player2Name ? 1 : 0 },
                seed: { displayName: "A2", rank: 1, sourceGame: null, sourcePool: {} },
              },
            },
            round: match.round,
          };
          gamesList.push(game);
        });

        for (const game of gamesList) {
          const { round, sides } = game;
          const homeName = sides.home.team.name;
          const visitorName = sides.visitor.team.name;

          const sourceHome = gamesList.find(
            (g) =>
              g.round === round - 1 &&
              (g.sides.home.team.name === homeName || g.sides.visitor.team.name === homeName)
          );
          const sourceVisitor = gamesList.find(
            (g) =>
              g.round === round - 1 &&
              (g.sides.home.team.name === visitorName || g.sides.visitor.team.name === visitorName)
          );

          if (sourceHome) game.sides.home.seed.sourceGame = sourceHome;
          if (sourceVisitor) game.sides.visitor.seed.sourceGame = sourceVisitor;
        }

        const final = gamesList.reduce((prev, curr) => (curr.round > prev.round ? curr : prev));
        setFinalGame(final);
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Failed to load matches:", error);
      }
    };

    fetchMatches();
  }, [seasonId]);

  if (isLoading) return <div>⏳ Loading...</div>;
  if (!finalGame) return <div>📭 No match data available.</div>;

  const roundMap = new Map<number, MatchDto[]>();

  function extractRounds(game: any) {
    const match: MatchDto = {
      id: parseInt(game.id),
      round: game.round,
      player1Name: game.sides.home.team.name,
      player2Name: game.sides.visitor.team.name,
      winnerName:
        game.sides.home.score.score > game.sides.visitor.score.score
          ? game.sides.home.team.name
          : game.sides.visitor.team.name,
    };
    if (!roundMap.has(game.round)) roundMap.set(game.round, []);
    roundMap.get(game.round)!.push(match);
    if (game.sides.home.seed.sourceGame) extractRounds(game.sides.home.seed.sourceGame);
    if (game.sides.visitor.seed.sourceGame) extractRounds(game.sides.visitor.seed.sourceGame);
  }

  extractRounds(finalGame);
  const sortedRounds = Array.from(roundMap.entries()).sort(([a], [b]) => a - b);

  return (
    <div className="bracket-container">
      {/* <h1>Tournament Bracket</h1> */}
      <div className="tournament-bracket tournament-bracket--rounded">
        {sortedRounds.map(([round, matches]) => (
          <TournamentRound key={round} title={`Round ${round}`} matches={matches} />
        ))}
      </div>
    </div>
  );
}
