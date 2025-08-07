import api from "@api/http-commons";
import { CategoryListResponse } from "@/types/category";

export const getCategories = async (): Promise<CategoryListResponse> => {
  const { data: response } = await api.get("/api/category");
  if (response.data) {
    const data = response.data;
    return data;
  } else return response;
};
