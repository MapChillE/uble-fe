import { UserRole } from "@/types/profile";
import api from "@api/http-commons";

export const kakaoLogin = async (code: string): Promise<UserRole> => {
  const response = await api.post("/api/auth/login", { code: code });
  const token = response.headers["authorization"];
  if (token) {
    window.localStorage.setItem("accessToken", token.slice(7));
  }
  return response.data.data;
}

export const getUserInfo = async () => {
  const { data } = await api.get("/api/users/userInfo");
  return data;
}
