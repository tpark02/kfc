import axios from "axios";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSquadStore } from "../../store/useSquadStore";
import { TOTAL_DROP_ZONES } from "../../data/formations";
import { DropPlayers } from "../../store/useSquadStore";
import { Player } from "../../types/Player";

interface Club {
  clubId?: number;
  name: string;
  formationName: string;
  players: Player[];
  ovr: number;
  price: number;
  age: number;
  pace: number;
  defense: number;
  attack: number;
  clubCohesion: number;
  stamina: number;
}

const MyClub = () => {
  const [userId] = useState(1); // 로그인된 유저 ID라고 가정
  const [myClubs, setMyClubs] = useState<Club[]>([]);
  const [newClubName, setNewClubName] = useState("");
  const [editingClubId, setEditingClubId] = useState<number | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    myTeamName,
    myFormation,
    setMyFormation,
    dropPlayers,
    setDropPlayers,
    myTeamOvr,
    myTeamSquadValue,
    myTeamAge,
    myTeamPace,
    myTeamDefense,
    myTeamAttack,
    myTeamClubCohesion,
    myTeamStamina,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
  } = useSquadStore();

  const fetchMyClubProperties = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/myclubs`
      );
      console.log("📦 fetchMyClubProperties:", response.data);
      const clubs = Array.isArray(response.data)
        ? response.data
        : [response.data];

    clubs.forEach((club: Club) => {
        const newDropPlayers: { [idx: number]: Player | null } = {};
        club.players.forEach((p, idx) => {
          newDropPlayers[idx] = p;
        });
        setDropPlayers(newDropPlayers);
        setMyFormation(club.formationName);
        setMyTeamOvr(club.ovr);
        setMyTeamSquadValue(club.price);
        setMyTeamAge(club.age);
        setMyTeamPace(club.pace);
        setMyTeamDefense(club.defense);
        setMyTeamAttack(club.attack);
        setMyTeamClubCohesion(club.clubCohesion);
        setMyTeamStamina(club.stamina);
      });
    } catch (error) {
      console.error("❌ 클럽 속성 불러오기 실패:", error);
    }
  };

  // ✅ 1. 클럽 목록 불러오기
  const fetchMyClubs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/myclubs`
      );
      console.log("📦 fetchMyClubs:", response.data);
      const clubs = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setMyClubs(clubs);      
    } catch (error) {
      console.error("❌ 클럽 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchMyClubs();
  }, []);

  useEffect(() => {
    if (snackbarMessage) {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage]);

  // ✅ 2. 클럽 저장
  const saveMyClub = async () => {
    if (!newClubName) return;
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/myclubs`,
        {
          clubName: newClubName,
          formation: myFormation,
          players: Object.values(dropPlayers).map((player) => player?.id),
          ovr: myTeamOvr,
          price: myTeamSquadValue,
          age: myTeamAge,
          pace: myTeamPace,
          defense: myTeamDefense,
          clubCohesion: myTeamClubCohesion,
          attack: myTeamAttack,
          stamina: myTeamStamina,
          formationName: myFormation,          
        }
      );
      console.log("✔ 저장 완료", response.data);
      setNewClubName("");
      fetchMyClubs();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // ✅ 서버에서 내려준 에러 메시지를 스낵바로
        setSnackbarMessage(error.response.data);
      } else {
        console.error("❌ 저장 실패:", error);
        setSnackbarMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // ✅ 3. 클럽 수정
  const updateMyClub = async (clubId: number) => {
    try {
      console.log("클럽 수정 요청", clubId, newClubName);
      const response = await axios.put(
        `http://localhost:8080/api/updatemyclub/${clubId}`,
        {
          name: newClubName,
        }
      );
      console.log("✔ 수정 완료", response.data);
      setEditingClubId(null);
      setNewClubName("");
      fetchMyClubs();
    } catch (error) {
      console.error("❌ 수정 실패:", error);
    }
  };

  // ✅ 4. 클럽 삭제
  const deleteMyClub = async (clubId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletemyclub/${clubId}`);
      console.log("✔ 삭제 완료");
      fetchMyClubs();
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📂 나의 클럽 목록</h2>

      <ul>
        {myClubs.map((club, index) => {
          //   console.log(club.clubId + ":" + club.name + ":" + index);
          return (
            <li key={index}>
              {editingClubId === club.clubId ? (
                <>
                  <input
                    type="text"
                    value={newClubName}
                    onChange={(e) => setNewClubName(e.target.value)}
                  />
                  <button
                    onClick={() => club.clubId && updateMyClub(club.clubId)}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <strong>{club.name}</strong>
                  <button
                    onClick={() => {
                      setEditingClubId(club.clubId!);
                      setNewClubName(club.name);
                    }}
                  >
                    ✏️ 수정
                  </button>
                  <button onClick={() => deleteMyClub(club.clubId!)}>
                    🗑 삭제
                  </button>
                  <button onClick={() => fetchMyClubProperties()}>Set Team</button>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="새 클럽 이름"
          value={newClubName}
          onChange={(e) => setNewClubName(e.target.value)}
        />
        <button onClick={saveMyClub}>➕ 클럽 추가</button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MyClub;
