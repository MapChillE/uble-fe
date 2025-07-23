import { UsageRegistReq, UsageRegistRes } from "@/types/usage";
import api from "@api/http-commons";

export const setUsage = async (
  storeId: number,
  params?: UsageRegistReq
): Promise<UsageRegistRes> => {
  const { data } = await api.post(`api/users/stores/${storeId}/usages`, params);
  return data;
};
