import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

interface Props {
  createdAt: string;
}

export default function SeasonTimerLobby({ createdAt }: Props) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      //const deadline = dayjs(createdAt).add(5, "minute"); // 5분 후 시작
      const deadline = dayjs(createdAt).add(5, "second"); // 3초 후 시작      
      const diff = deadline.diff(now, "second");
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  if (remaining <= 0) return <div>✅ Match Started</div>;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
      ⏳ Starts in: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
