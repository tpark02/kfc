import React, { useEffect, useState } from "react";
import axios from "axios";

interface Participant {
  id: number;
  name: string;
  rank: number;
  ovr: number;
}
interface Props {
  seasonId: number;
  refreshKey?: any; // 값이 바뀌면 useEffect가 다시 실행됨
}

export default function SeasonParticipantsList({ seasonId, refreshKey }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/season/${seasonId}/participants`)
      .then((res) => {
        console.log("participants list:", res.data);
        setParticipants(res.data);
      })
      .catch((err) => {
        console.error("❌ 참가자 불러오기 실패:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [seasonId, refreshKey]); // ✅ refreshKey가 바뀔 때마다 리로드

  if (loading) return <div>⏳ 참가자 목록 불러오는 중...</div>;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">👥 참가자 명단</h3>
      <ul className="list-disc list-inside space-y-1">
        {participants.map((p) => (
          <li key={p.id}>
            #{p.rank} {p.name} (OVR: {p.ovr})
          </li>
        ))}
      </ul>
    </div>
  );
}
