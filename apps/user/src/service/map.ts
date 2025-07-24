import api from "@api/http-commons";
import { apiHandler } from "@api/apiHandler";
import { MyPlace, FetchMyPlacesResponse, PostMyPlacesResponse } from "@/types/map";

export interface PostMyPlaceParams {
  name: string;
  longitude: number;
  latitude: number;
  address: string;
}

// 장소 등록
export const postMyPlace = async (params: PostMyPlaceParams): Promise<MyPlace> => {
  const { data, error } = await apiHandler(async () => {
    return await api.post<PostMyPlacesResponse>("/api/users/pin", params);
  });

  if (error || !data) {
    throw new Error(error || "내 장소 등록 실패");
  }

  const raw = data.data.data;
  if (!raw.pinId) {
    throw new Error("서버 응답에 pinId가 없습니다");
  }

  return {
    id: raw.pinId,
    name: raw.name,
    address: raw.address,
    coordinates: [raw.longitude, raw.latitude],
  };
};

// 장소 조회
export const fetchMyPlaces = async (): Promise<MyPlace[]> => {
  const { data, error } = await apiHandler(async () => {
    const res = await api.get<FetchMyPlacesResponse>("/api/users/pin");
    return res.data.data;
  });

  if (error || !data) {
    throw new Error(error || "내 장소 조회 실패");
  }

  return data.locations.map((item) => {
    if (!item.id) {
      throw new Error("유효하지 않은 장소 ID");
    }

    return {
      id: item.id,
      name: item.name,
      address: item.address,
      coordinates: [item.longitude, item.latitude],
    };
  });
};

// 장소 삭제
export const deleteMyPlace = async (pinId: number): Promise<void> => {
  const { error } = await apiHandler(async () => {
    await api.delete(`/api/users/pin/${pinId}`);
  });

  if (error) {
    throw new Error(error || "삭제 실패");
  }
};
