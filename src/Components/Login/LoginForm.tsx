import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRequest, AuthResponse } from "../../types/Auth";
import { getProtectedData } from "../../types/Auth";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 로그인 폼 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 로그인 처리
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data: AuthResponse = await response.json();
      localStorage.setItem("token", data.token);
      setError("");

      // 보호된 API 테스트 (생략 가능)
      const protectedData = await getProtectedData();
      console.log("🔐 보호된 데이터:", protectedData);

      navigate("/squad");
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류");
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // 새로고침해서 상태 초기화
  };

  // 토큰 있으면 로그아웃 화면
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

  // 로그인 폼
  return (
    <div style={{ maxWidth: 300, margin: "auto" }}>
      <h2>로그인</h2>
      <input
        type="text"
        name="username"
        placeholder="아이디"
        value={form.username}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
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
  );
};

export default LoginForm;
