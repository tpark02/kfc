import { useEffect, useState } from "react";
import { SeasonResponse } from "../../types/Response";
import { fetchSeasonInfo } from "../../components/MyClub/MyClubUtil";

interface SeasonTimerProps {
  initialRemaining: number;
  seasonId?: number;
  setSeason: (s: SeasonResponse | null) => void;
}

export default function SeasonTimer({
  initialRemaining,
  seasonId,
  setSeason,
}: SeasonTimerProps) {
  const [remaining, setRemaining] = useState(initialRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!seasonId) return;

    // const fetchSeason = async () => {
    //   const res = await axios.get(`http://localhost:8080/season/getSeason/${seasonId}`);
    //   setRemaining(res.data.remainingSeconds);
    // };
    // fetchSeason();

    (async () => {
      const res: SeasonResponse | null = await fetchSeasonInfo(
        seasonId.toString()
      );
      if (res !== null && typeof res.remainingSeconds === "number") {
        setRemaining(res.remainingSeconds);
        setSeason(res);
        console.log("Season Timer ended");
      } else {
        setRemaining(0);
      }
    })();
  }, [seasonId]);

  if (remaining <= 0) return <div>✅ Match Started</div>;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div style={{ marginBottom: "1rem" }}>
      ⏳ Starts in: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
