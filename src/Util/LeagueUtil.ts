import axios from "axios";
import { Match } from "../types/Match";

export const fetchSchedule = async (userid: number, clubid: number) => {
    try {
      const response = await axios.post<Match[]>(
        "http://localhost:8080/simulate/generate-schedule",
        {
          // myTeamName: teamname,
          userId: userid,
          clubId: clubid,
        }
      );
      return response;
    } catch (error) {
      console.error("🔥 failed to create league schedule:", error);
      return undefined;
    }
  };