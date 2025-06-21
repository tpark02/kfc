import { useEffect, useState } from "react";
import { fetchUserInfo } from "../util/myClubUtil";
import { useSquadSetters } from "./useSquadSetter";
import { isLoggedIn } from "../types/auth";

export const useLoadingMyCoin = (userId: number | null) => {
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0); // 🆕 trigger state
  const setters = useSquadSetters();

  const reload = () => setReloadTrigger((prev) => prev + 1); // 🆕 trigger function

  useEffect(() => {
    if (!userId || !isLoggedIn()) return;

    const load = async () => {
      const data = await fetchUserInfo(userId);
      console.log("💰 userLoadingMyCoin ", data?.username);
      setters.setMyCoin(data?.coin ?? 0);

      if (data) {
        setError(null);
      } else {
        setError("❌ Failed to load useLoadingMyCoin");
      }
    };

    load();
  }, [userId, reloadTrigger]); // 🆕 reloadTrigger dependency

  return { error, reload }; // 🆕 return reload function
};
