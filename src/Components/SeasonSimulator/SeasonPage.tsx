import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChampionsBracket from "./MatchList";
import SeasonParticipantsList from "./SeasonParticipantsList";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // 버튼 클릭 중 상태
  const userId = 1; // TODO: 로그인 사용자 ID로 대체

  useEffect(() => {
    const checkIfJoined = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/season/${seasonId}/participants`
        );
        const alreadyJoined = res.data.some((p: any) => p.id === userId);
        setJoined(alreadyJoined);
      } catch (err) {
        console.error("❌ 참가자 확인 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (seasonId) checkIfJoined();
  }, [seasonId]);

  if (!seasonId) return <Alert severity="error">❌ 잘못된 시즌 ID입니다.</Alert>;

  const toggleJoin = async () => {
    setProcessing(true);
    try {
      if (joined) {
        await axios.delete(`http://localhost:8080/season/${seasonId}/leave`, {
          params: { userId },
        });
        console.log("🚪 탈퇴 완료");
      } else {
        await axios.post(
          `http://localhost:8080/season/${seasonId}/join`,
          null,
          { params: { userId } }
        );
        console.log("✅ 참가 완료");
      }
      setJoined(!joined); // 토글 상태 반전
    } catch (err) {
      console.error("❌ 참가/탈퇴 실패:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🏆 시즌 {seasonId} 브래킷
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color={joined ? "error" : "primary"}
          onClick={toggleJoin}
          disabled={processing}
          sx={{ mb: 3 }}
        >
          {joined ? "탈퇴하기" : "참가하기"}
        </Button>
      )}

      <SeasonParticipantsList
        seasonId={parseInt(seasonId)}
        refreshKey={joined}
      />

      <ChampionsBracket seasonId={parseInt(seasonId)} />
    </Box>
  );
}
