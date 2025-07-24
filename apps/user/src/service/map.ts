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

  const { pinId, name, address, longitude, latitude } = data.data.data;

  return {
    id: pinId,
    name,
    address,
    coordinates: [longitude, latitude],
  };
};

// 장소 조회
export const fetchMyPlaces = async (): Promise<MyPlace[]> => {
  const { data, error } = await apiHandler(async () => {
    const res = await api.get<FetchMyPlacesResponse>("/api/users/pin");
    console.log(res);
    return res.data.data;
  });

  if (error || !data) {
    throw new Error(error || "내 장소 조회 실패");
  }

  return data.locations.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    coordinates: [item.longitude, item.latitude],
  }));
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
