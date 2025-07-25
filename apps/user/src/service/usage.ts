import { UsageHistoryResponse, UsageRegistRequest, UsageRegistResponse } from "@/types/usage";
import api from "@api/http-commons";

export const setUsage = async (
  storeId: number,
  params?: UsageRegistRequest
): Promise<UsageRegistResponse> => {
  const { data } = await api.post(`api/users/stores/${storeId}/usages`, params);
  return data;
};

export const fetchUsageHistory = async (
  page: number,
  size: number,
  year: number,
  month: number
): Promise<UsageHistoryResponse> => {
  const { data } = await api.get("api/users/history", {
    params: { page, size, year, month },
  });
  return data;
};
