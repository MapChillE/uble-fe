import { DashboardResponse } from "@/types/dashboard";
import api from "@api/http-commons";

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const { data } = await api.get("api/admin/dashboard");
  return data;
};
