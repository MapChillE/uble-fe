import api from "@api/http-commons";

export const fetchFeedbackList = async (page: number) => {
  const { data } = await api.get("/api/admin/feedback", {
    params: {
      page: page,
    },
  });
  return data;
};
