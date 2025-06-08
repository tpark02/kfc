import axios from "axios";
import { MyPlayer } from "../types/Player";

export const buyPlayer = async (
  userId: number,
  playerId: number
): Promise<string> => {
  try {
    const response = await axios.put<string>(
      "http://localhost:8080/mystore/buyplayer/",
      {
        userId: userId,
        playerId: playerId,
      }
    );

    // 응답 메시지 확인 후 처리
    if (response.data.includes("✅")) {
      return "🟢 Player purchased successfully!";
    } else {
      return "⚠️ Purchase failed: " + response.data;
    }
  } catch (err: any) {
    return "❌ Failed to update store: " + (err?.message || "Unknown error");
  }
};

