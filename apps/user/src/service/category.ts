import api from "@api/http-commons";
import { apiHandler } from "@api/apiHandler";
import { CategoryListResponse } from "@/types/category";

export const getCategories = () => apiHandler<CategoryListResponse>(() => api.get("/api/category"));
