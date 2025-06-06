import axios from "axios";
import { MyStorePlayer } from "../types/Player";

export const buyPlayer = async (
  userId: number,
  playerId: number
): Promise<string> => {
  try {
    const response = await axios.put<string>(
      "http://localhost:8080/mystore/update/",
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

export const getMyStore = async (userId: number): Promise<MyStorePlayer[]> => {
  try {
    const response = await axios.get<MyStorePlayer[]>(
      `http://localhost:8080/mystore/getmystore/${userId}`
    );
    return response.data;
  } catch (err: any) {
    return [];
  }
};
