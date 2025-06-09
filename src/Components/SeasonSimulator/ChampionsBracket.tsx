import { useEffect, useState } from "react";
import TournamentRound from "../seasonSimulator/TournamentRound";
import "../../style/bracket.css";
import axiosInstance from "../../axiosInstance";
import { MyPlayer } from "../../types/player";

interface MatchDto {
  id: number;
  round: number;
  player1Name: string;
  player2Name: string;
  winnerName: string;
  myPlayerList1: MyPlayer[];
  myPlayerList2: MyPlayer[];
}

interface Game {
  id: string;
  round: number;
  name: string;
  scheduled: number;
  sides: {
    home: Side;
    visitor: Side;
  };
}

interface Side {
  team: { id: string; name: string };
  score: { score: number };
  seed: {
    displayName: string;
    rank: number;
    sourceGame: Game | null;
    sourcePool: object;
  };
  myPlayerList: MyPlayer[];
}

interface MatchListProps {
  seasonId: number;
  onMatchClick?: (match: MatchDto) => void;
  setIsMatchClicked: (b: boolean) => void;
}

export default function ChampionsBracket({
  seasonId,
  onMatchClick,
  setIsMatchClicked,
}: MatchListProps) {
  const [finalGame, setFinalGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!seasonId || isNaN(Number(seasonId))) {
      console.warn("Invalid seasonId:", seasonId);
      return;
    }

    const fetchMatches = async () => {
      try {
        const res = await axiosInstance.get(`/season/${seasonId}/matches`);
        const matches: MatchDto[] = res.data;

        if (!Array.isArray(matches) || matches.length === 0) {
          console.warn("No match data available");
          return;
        }

        const games: Game[] = matches.map((match) => ({
          id: String(match.id),
          round: match.round,
          name: `Round ${match.round}`,
          scheduled: Date.now(),
          sides: {
            home: {
              team: { id: `${match.id}-1`, name: match.player1Name },
              score: {
                score: match.winnerName === match.player1Name ? 1 : 0,
              },
              seed: {
                displayName: "A1",
                rank: 1,
                sourceGame: null,
                sourcePool: {},
              },
              myPlayerList: match.myPlayerList1,
            },
            visitor: {
              team: { id: `${match.id}-2`, name: match.player2Name },
              score: {
                score: match.winnerName === match.player2Name ? 1 : 0,
              },
              seed: {
                displayName: "A2",
                rank: 1,
                sourceGame: null,
                sourcePool: {},
              },
              myPlayerList: match.myPlayerList2,
            },
          },
        }));

        games.forEach((game) => {
          const { round, sides } = game;
          const homeName = sides.home.team.name;
          const visitorName = sides.visitor.team.name;

          const sourceHome = games.find(
            (g) =>
              g.round === round - 1 &&
              (g.sides.home.team.name === homeName ||
                g.sides.visitor.team.name === homeName)
          );

          const sourceVisitor = games.find(
            (g) =>
              g.round === round - 1 &&
              (g.sides.home.team.name === visitorName ||
                g.sides.visitor.team.name === visitorName)
          );

          sides.home.seed.sourceGame = sourceHome ?? null;
          sides.visitor.seed.sourceGame = sourceVisitor ?? null;
        });

        const final = games.reduce((prev, curr) =>
          curr.round > prev.round ? curr : prev
        );

        setFinalGame(final);
      } catch (error) {
        console.error("❌ Failed to load matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [seasonId]);

  const roundMap = new Map<number, MatchDto[]>();
  const visited = new Set<string>();

  const extractRounds = (game: Game) => {
    if (visited.has(game.id)) return;
    visited.add(game.id);

    const match: MatchDto = {
      id: +game.id,
      round: game.round,
      player1Name: game.sides.home.team.name,
      player2Name: game.sides.visitor.team.name,
      winnerName:
        game.sides.home.score.score > game.sides.visitor.score.score
          ? game.sides.home.team.name
          : game.sides.visitor.team.name,
      myPlayerList1: game.sides.home.myPlayerList,
      myPlayerList2: game.sides.visitor.myPlayerList,
    };

    if (!roundMap.has(game.round)) roundMap.set(game.round, []);
    roundMap.get(game.round)!.push(match);

    if (game.sides.home.seed.sourceGame)
      extractRounds(game.sides.home.seed.sourceGame);
    if (game.sides.visitor.seed.sourceGame)
      extractRounds(game.sides.visitor.seed.sourceGame);
  };

  if (finalGame) extractRounds(finalGame);
  const sortedRounds = Array.from(roundMap.entries()).sort(([a], [b]) => a - b);

  if (isLoading) return <div>⏳ Loading...</div>;
  if (!finalGame) return <div>📫 No match data available.</div>;

  return (
    <div className="bracket-container">
      <div className="tournament-bracket tournament-bracket--rounded">
        {sortedRounds.map(([round, matches]) => (
          <TournamentRound
            key={round}
            title={`Round ${round}`}
            matches={matches}
            onMatchClick={onMatchClick}
            setIsMatchClicked={setIsMatchClicked}
          />
        ))}
      </div>
    </div>
  );
}
