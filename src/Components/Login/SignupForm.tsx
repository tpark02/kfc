import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";

interface SignUpFormData {
  username: string;
  password: string;
  email: string;
}

const SignUpForm: React.FC = () => {
  const { setMyUserId } = useSquadStore(
    (s) => ({
      setMyUserId: s.setMyUserId,
    }),
    shallow
  );
  const [form, setForm] = useState<SignUpFormData>({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { username, password, email } = form;

    if (!username || !password || !email) {
      setError("❌ 모든 항목을 입력해주세요.");
      setSuccess("");
      return;
    }

    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    if (!usernameRegex.test(username)) {
      setError(
        "❌ username은 영문자와 숫자의 조합이어야 하며, 다른 문자는 사용할 수 없습니다."
      );
      setSuccess("");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    if (!passwordRegex.test(password)) {
      setError(
        "❌ 비밀번호는 대문자, 숫자, 특수문자(!@#$%^&*)를 포함한 영문/숫자 조합이어야 합니다."
      );
      setSuccess("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("❌ 유효한 이메일 주소를 입력해주세요.");
      setSuccess("");
      return;
    }

    console.log("input password : ", password); // true or false

    try {
      useLoadingSpinnerStore.getState().setIsLoading(true);
      const res = await axiosInstance.post("/api/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId); // ✅ userId도 저장
      console.log("🆕 회원가입 완료:", res.data);

      setMyUserId(res.data.userId);

      setSuccess("회원가입이 완료되었습니다! 클럽 셋업 페이지로 이동합니다.");
      setError("");
    } catch (err: any) {
      const msg = err.response?.data || err.message || "알 수 없는 오류 발생";
      if (msg.includes("이미 존재하는")) {
        setError("❌ 이미 존재하는 사용자명입니다. 다른 이름을 사용해주세요.");
      } else {
        setError(msg);
      }
      setSuccess("");
    } finally {
      useLoadingSpinnerStore.getState().setIsLoading(false);
    }
  };

  // ✅ 성공 시 1.5초 후 자동 이동
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/register"), 1500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="아이디"
        value={form.username}
        onChange={handleChange}
        style={{ width: "100%", margin: "16px auto" }}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        style={{ width: "100%", margin: "16px auto" }}
      />
      <input
        type="email"
        name="email"
        placeholder="example@domain.com"
        value={form.email}
        onChange={handleChange}
        style={{ width: "100%", margin: "16px auto" }}
      />
      <button
        onClick={handleSignUp}        
        style={{ width: "100%", padding: "10px", marginTop: "16px" }}
      >        
        Sign Up
      </button>
      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: 12 }}>{success}</p>}
    </div>
  );
};

export default SignUpForm;
