import { UsageRegistRequest, UsageRegistResponse } from "@/types/usage";
import api from "@api/http-commons";

export const setUsage = async (
  storeId: number,
  params?: UsageRegistRequest
): Promise<UsageRegistResponse> => {
  const { data } = await api.post(`api/users/stores/${storeId}/usages`, params);
  return data;
};
