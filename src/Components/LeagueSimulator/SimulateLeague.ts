import axios from "axios";

export const simulateLeague = async (teams: string[]) => {
  const res = await axios.post(
    "http://localhost:8080/api/simulate-league",
    { teams },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // ✅ 이게 핵심!
      },
    }
  );
  return res.data;
};
