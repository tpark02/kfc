import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  initialRemaining: number; // 서버에서 전달받은 초
  seasonId?: number; // optional
}

export default function SeasonTimer({ initialRemaining, seasonId }: Props) {
  const [remaining, setRemaining] = useState(initialRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!seasonId) return;

    const fetchSeason = async () => {
      const res = await axios.get(`http://localhost:8080/season/${seasonId}`);
      setRemaining(res.data.remainingSeconds);
    };
    fetchSeason();
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
