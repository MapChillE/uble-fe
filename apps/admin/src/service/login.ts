import { LoginResponse } from "@/types/user";
import api from "@api/http-commons";
export const adminLogin = async (code: string): Promise<LoginResponse> => {
  const response = await api.post("api/admin/verify", { code: code });
  const token = response.headers?.["authorization"];
  if (token) {
    window.localStorage.setItem("accessToken", token.slice(7));
  }
  if (!response.data?.data) {
    throw new Error("응답이 정상적으로 오지 않음");
  }
  return response.data;
};
