import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

interface Participant {
  id: number;
  name: string;
  rank: number;
  ovr: number;
}

interface Props {
  seasonId: number;
  refreshKey?: any; // Triggers useEffect re-run when this changes
}

export default function SeasonParticipantsList({
  seasonId,
  refreshKey,
}: Props) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axiosInstance
      .get<Participant[]>(`/season/${seasonId}/participants`)
      .then((res: { data: Participant[] }) => {
        console.log("participants list:", res.data);
        setParticipants(res.data);
      })
      .catch((err: unknown) => {
        console.error("❌ Failed to load participants:", err);
      })
      .finally((): void => {
        setLoading(false);
      });
  }, [seasonId, refreshKey]); // ✅ Reloads when refreshKey changes

  if (loading) return <div>⏳ Loading participants...</div>;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">👥 Participants</h3>
      <ul className="list-disc list-inside space-y-1">
        {participants.map((p, index) => (
          <li key={`${p.id}-${index}`}>
            #{p.rank} {p.name} (OVR: {p.ovr})
          </li>
        ))}
      </ul>
    </div>
  );
}
