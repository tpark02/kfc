import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { AuthRequest, AuthResponse } from "../../types/auth";
import { getProtectedData } from "../../types/auth"; // 선택적 테스트용

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/api/login", form);
      localStorage.setItem("token", response.data.token);
      setError("");

      // 선택: 로그인 후 보호 API 테스트
      const protectedData = await getProtectedData();
      console.log("🔐 보호된 데이터:", protectedData);

      navigate("/squad");
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
