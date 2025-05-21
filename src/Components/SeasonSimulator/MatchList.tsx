import { useEffect, useState } from "react";
import axios from "axios";
import { BracketGenerator } from "react-tournament-bracket";

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
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!seasonId || isNaN(Number(seasonId))) {
      console.warn("잘못된 seasonId:", seasonId);
      return;
    }

    const fetchMatches = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/season/${seasonId}/matches`
        );

        const data: MatchDto[] = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("매치 데이터 없음");
          setGames([]);
          return;
        }

        const gameMap = new Map<number, any>();
        const gamesList: any[] = [];

        data.forEach((match) => {
          const game = {
            id: String(match.id),
            name: `Round ${match.round}`,
            scheduled: Date.now(),
            sides: {
              home: {
                team: {
                  id: `${match.id}-1`,
                  name: match.player1Name,
                },
                score: {
                  score: match.winnerName === match.player1Name ? 1 : 0,
                },
                seed: {
                  displayName: "A1",
                  rank: 1,
                  sourceGame: null,
                  sourcePool: {},
                },
              },
              visitor: {
                team: {
                  id: `${match.id}-2`,
                  name: match.player2Name,
                },
                score: {
                  score: match.winnerName === match.player2Name ? 1 : 0,
                },
                seed: {
                  displayName: "A2",
                  rank: 1,
                  sourceGame: null,
                  sourcePool: {},
                },
              },
            },
            round: match.round,
          };

          gameMap.set(match.id, game);
          gamesList.push(game);
        });

        // 연결 설정
        for (const game of gamesList) {
          const { round, sides } = game;
          const homeName = sides.home.team.name;
          const visitorName = sides.visitor.team.name;

          const sourceHome = gamesList.find(
            (g) =>
              g.round === round - 1 &&
              (g.sides.home.team.name === homeName ||
                g.sides.visitor.team.name === homeName)
          );

          const sourceVisitor = gamesList.find(
            (g) =>
              g.round === round - 1 &&
              (g.sides.home.team.name === visitorName ||
                g.sides.visitor.team.name === visitorName)
          );

          if (sourceHome) game.sides.home.seed.sourceGame = sourceHome;
          if (sourceVisitor) game.sides.visitor.seed.sourceGame = sourceVisitor;
        }

        const finalGame = gamesList.reduce((prev, curr) => {
          return curr.round > prev.round ? curr : prev;
        }, gamesList[0]);

        setGames([finalGame]);
        setIsLoading(false);

        fetchMatches();
      } catch (error) {
        console.error("❌ 매치 불러오기 실패:", error);
        setGames([]);
      }
    };
    fetchMatches();
  }, [seasonId]);

  if (isLoading) return <div>⏳ 로딩 중...</div>;

  if (games.length === 0) return <div>📭 경기 데이터가 없습니다.</div>;

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <BracketGenerator games={games} />
    </div>
  );
}
