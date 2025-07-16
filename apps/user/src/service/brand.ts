import { BrandListData, FetchBrandsParams } from "@/types/brand";
import api from "@api/http-commons";

export const fetchBrands = async (
  params: FetchBrandsParams
): Promise<BrandListData> => {
  const res = await api.get<{ statusCode: number; message: string; data: BrandListData }>(
    "api/brands",
    { params }
  );
  return res.data.data;
};