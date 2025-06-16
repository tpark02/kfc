// src/hooks/useLoadMyClub.ts
import { useEffect, useState } from "react";
import { fetchMyClubs } from "../../util/myClubUtil";
import { setSquadStateFromClubData } from "../../util/setSquadStateFromClubData";
import { useSquadSetters } from "./useSquadSetter";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";

export const useLoadMyClub = (userId: number | null) => {
  const setters = useSquadSetters();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      useLoadingSpinnerStore.getState().setIsLoading(true);
      console.log("9");
      const data = await fetchMyClubs(userId);
      if (data) {
        await setSquadStateFromClubData(data, setters);
        setError(null);
      } else {
        setError("❌ Failed to load club data.");
      }
      useLoadingSpinnerStore.getState().setIsLoading(false);
    };

    load();
  }, [userId]);

  return { error };
};
