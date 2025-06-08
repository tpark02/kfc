export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const getProtectedData = async () => {
  const token = localStorage.getItem("token");
  console.log("🔐 Token:", token);

  const response = await fetch("http://localhost:8080/api/protected", {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ 꼭 있어야 해
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("인증 실패");

  return await response.json();
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
