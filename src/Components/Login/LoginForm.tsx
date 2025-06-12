import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { AuthRequest, AuthResponse } from "../../types/auth";
import { getProtectedData } from "../../types/auth"; // 선택적 테스트용
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";

const LoginForm: React.FC = () => {
  const {
    setMySelectedPlayers,
    setMyTeamOvr,
    setIsDropZoneSelected,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyClubs,
    setMyUserId,
  } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
      myFormation: s.myFormation,
      setMyTeamOvr: s.setMyTeamOvr,
      setIsDropZoneSelected: s.setIsDropZoneSelected,
      setMyTeamSquadValue: s.setMyTeamSquadValue,
      setMyTeamAge: s.setMyTeamAge,
      setMyTeamPace: s.setMyTeamPace,
      setMyTeamDefense: s.setMyTeamDefense,
      setMyTeamAttack: s.setMyTeamAttack,
      setMyTeamClubCohesion: s.setMyTeamClubCohesion,
      setMyTeamStamina: s.setMyTeamStamina,
      setMyClubs: s.setMyClubs,
      setMyUserId: s.setMyUserId,
      setMySelectedPlayers: s.setMySelectedPlayers,
    }),
    shallow
  );

  const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/login",
        form
      );
      localStorage.setItem("token", response.data.token);
      setError("");

      // 선택: 로그인 후 보호 API 테스트
      const protectedData = await getProtectedData();
      console.log("🔐 보호된 데이터:", protectedData.message);
      await fetchMyInfo();

      setTimeout(() => navigate("/squad"), 300);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "알 수 없는 오류 발생";
      setError(msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (token) {
    return (
      <div style={{ maxWidth: 300, margin: "auto" }}>
        <h2>✅ 이미 로그인됨</h2>
        <button onClick={handleLogout} style={{ width: "100%" }}>
          로그아웃
        </button>
      </div>
    );
  }

  const fetchMyInfo = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8080/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("🙋 내 정보:", res.data); // { userId: 3 }
      setMyUserId(res.data.userId); // ✅ 저장

    } catch (e) {
      console.error("❌ 사용자 정보 가져오기 실패:", e);
    }
  };

  return (
    <div className="app-container">
      <div style={{ maxWidth: 300, margin: "auto" }}>
        <h2>로그인</h2>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          style={{ width: "100%", margin: "50px auto" }}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button onClick={handleLogin} style={{ width: "100%" }}>
          로그인
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
