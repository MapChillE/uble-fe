import { BrandListData, BrandListResponse, FetchBrandsParams } from "@/types/brand";
import api from "@api/http-commons";

export const fetchBrands = async (
  params: FetchBrandsParams
): Promise<BrandListData> => {
  const res = await api.get<BrandListResponse>(
    "api/brands",
    { params }
  );
  return res.data.data;
};