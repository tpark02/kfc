// src/hooks/useLoadMyClub.ts
import { useEffect, useState } from "react";
import { fetchMyClubs } from "../../util/myClubUtil";
import { setSquadStateFromClubData } from "../../util/setSquadStateFromClubData";
import { useSquadSetters } from "./useSquadSetter";

export const useLoadMyClub = (userId: number | null) => {
  const setters = useSquadSetters();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      setLoading(true);
      const data = await fetchMyClubs(userId);
      if (data) {
        await setSquadStateFromClubData(data, setters);
        setError(null);
      } else {
        setError("❌ Failed to load club data.");
      }
      setLoading(false);
    };

    load();
  }, [userId]);

  return { loading, error };
};
