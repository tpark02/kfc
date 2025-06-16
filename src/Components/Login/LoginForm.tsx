import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { AuthRequest, AuthResponse } from "../../types/auth";
import { getProtectedData } from "../../types/auth"; // 선택적 테스트용
import { shallow } from "zustand/shallow";
import { useSquadStore } from "../../store/useSquadStore";
import { fetchMyClubs } from "../../util/myClubUtil";
import { setSquadStateFromClubData } from "../../util/setSquadStateFromClubData";

const LoginForm: React.FC = () => {
  const {
    setMySelectedPlayers,
    setMyTeamOvr,
    setMyTeamSquadValue,
    setMyTeamAge,
    setMyTeamPace,
    setMyTeamDefense,
    setMyTeamAttack,
    setMyTeamClubCohesion,
    setMyTeamStamina,
    setMyUserId,
    setMyFormation,
  } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
      myFormation: s.myFormation,
      mySelectedPlayers: s.mySelectedPlayers,
      myClubs: s.myClubs,
      setMyTeamOvr: s.setMyTeamOvr,
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
      setMyFormation: s.setMyFormation,
    }),
    shallow
  );

  const { setMyLogoImgUrl, setMyTeamName, setMyLogoId } = useSquadStore(
    (s) => ({
      setMyLogoId: s.setMyLogoId,
      setMyNation: s.setMyNation,
      setMyTeamName: s.setMyTeamName,
      setMyLogoImgUrl: s.setMyLogoImgUrl,
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
      console.log("✅ Updating Zustand store...");
      const response = await axiosInstance.post<AuthResponse>(
        "/api/login",
        form
      );

      // ✅ 로그인 성공 시 토큰 및 userId 저장
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", String(response.data.userId));
      setError("");

      // ✅ 선택: 로그인 후 보호된 API 요청 (테스트용)
      // const protectedData = await getProtectedData();
      // console.log("🔐 보호된 데이터:", protectedData.message);

      const userId = await fetchMyInfo(); // ✅ correct, freshly returned

      if (!userId) throw new Error("유저 정보를 불러오지 못했습니다");

      // ✅ 로그인 성공 후 페이지 이동
      setTimeout(() => navigate("/squad"), 300);
    } catch (err: any) {
      // ✅ 서버가 문자열 에러 메시지를 직접 body에 보내는 경우
      const msg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.message || "알 수 없는 오류 발생";

      setError(msg); // 사용자에게 표시
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
  const fetchMyInfo = async (): Promise<number | null> => {
    try {
      const res = await axiosInstance.get("/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const userId = res.data.userId;
      const myClub = res.data.myClub;
      const myFormation = res.data.myFormation;
      const myplayers = res.data.myPlayers;

      // ✅ 응답 로그 출력
      console.log("✅ /api/me 응답");
      console.log("👤 userId:", userId);
      console.log("🏟️ myClub:", myClub);
      console.log("🧩 myFormation:", myFormation);
      console.log("🧍 myPlayers:", myplayers);

      // ✅ Zustand 상태 저장
      setMyUserId(userId);
      setMyFormation(myFormation.name);
      setMySelectedPlayers(myplayers);

      // ✅ 상태 저장 후 로그
      console.log("✅ 상태 저장 완료");
      console.log("🧠 Zustand 저장 상태:");
      console.log(" - myUserId:", userId);
      console.log(" - myFormation.name:", myFormation.name);
      console.log(" - myClubs length:", myClub?.length ?? 0);
      console.log(" - mySelectedPlayers length:", myplayers?.length ?? 0);

      if (myClub) {
        console.log("2️⃣ setMyTeamOvr 실행");
        setMyTeamOvr(myClub.ovr);

        console.log("3️⃣ setMyTeamSquadValue 실행");
        setMyTeamSquadValue(myClub.price);

        console.log("4️⃣ setMyTeamAge 실행");
        setMyTeamAge(myClub.age);

        console.log("5️⃣ setMyTeamPace 실행");
        setMyTeamPace(myClub.pace);

        console.log("6️⃣ setMyTeamDefense 실행");
        setMyTeamDefense(myClub.defense);

        console.log("7️⃣ setMyTeamAttack 실행");
        setMyTeamAttack(myClub.attack);

        console.log("8️⃣ setMyTeamClubCohesion 실행");
        setMyTeamClubCohesion(myClub.clubCohesion);

        console.log("9️⃣ setMyTeamStamina 실행");
        setMyTeamStamina(myClub.stamina);

        console.log("🔟 setMyTeamName 실행");
        setMyTeamName(myClub.name);

        console.log("✅ 팀 이름 설정됨:", myClub.name);

        setMyLogoImgUrl(myClub.teamLogoImg);
        console.log("✅ 로고 이미지 URL 설정됨:", myClub.teamLogoImg);

        setMyFormation(myClub.formationName);
        console.log("✅ 포메이션 설정됨:", myClub.formationName);

        setMyLogoId(myClub.teamLogoId);
        console.log("✅ 로고 이미지 id 설정됨:", myClub.teamLogoId);

        console.log("✅ Store update complete");
      }
      return userId;
    } catch (e) {
      console.error("❌ 사용자 정보 가져오기 실패:", e);
      return null;
    }
  };

  return (
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
      <p style={{ marginTop: 10 }}>
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
