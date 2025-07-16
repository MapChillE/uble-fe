import { InfoForm, SetUserInfo, UserRole } from "@/types/profile";
import api from "@api/http-commons";

export const kakaoLogin = async (code: string): Promise<UserRole> => {
  const response = await api.post("/api/auth/login", { code: code });
  const token = response.headers?.["authorization"];
  if (token) {
    window.localStorage.setItem("accessToken", token.slice(7));
  }
  if (!response.data?.data) {
    throw new Error("응답이 정상적으로 오지 않음");
  }
  return response.data.data;
}

export const getUserInfo = async () => {
  const { data } = await api.get("/api/users/userInfo");
  if (!data) throw new Error("유저 데이터가 존재하지 않음");
  return data;
}

export const setUserInfo = async (params: InfoForm): Promise<SetUserInfo> => {
  const { data } = await api.put("api/users/userInfo", params);
  return data;
}

