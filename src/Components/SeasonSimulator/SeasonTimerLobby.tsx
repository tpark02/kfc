import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { devMatchTimer } from "../../util/Util";

interface Props {
  createdAt: string;
  finishedAt: string;
}

export default function SeasonTimerLobby({ createdAt, finishedAt }: Props) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      //const deadline = dayjs(createdAt).add(5, "minute"); // 5분 후 시작
      const deadline = dayjs(createdAt).add(devMatchTimer / 1000, "second"); // 초 후 시작
      const diff = deadline.diff(now, "second");
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  if (finishedAt !== null) return <span>Finished</span>;
  if (remaining <= 0) return <span>in progress...</span>;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <span style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
      ⏳ Starts in: {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
}
