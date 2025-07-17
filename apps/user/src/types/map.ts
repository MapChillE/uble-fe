// 좌표 타입 (사용자 정의)
export type Coordinates = [number, number]; // [longitude, latitude]

// 네이버 지도 API 타입들
export type NaverMap = naver.maps.Map;
export type NaverLatLng = naver.maps.LatLng;
export type NaverMarker = naver.maps.Marker;
export type NaverInfoWindow = naver.maps.InfoWindow;
export type NaverMapOptions = naver.maps.MapOptions;
export type NaverMarkerOptions = naver.maps.MarkerOptions;
export type NaverInfoWindowOptions = naver.maps.InfoWindowOptions;

// 지오코딩 관련 타입
export type GeocodeStatus = naver.maps.Service.Status;

// 사용자 정의 인터페이스들
export interface MapLocation {
  coordinates: Coordinates;
  address?: string;
  title?: string;
}

export interface GeocodingResult {
  address: string;
  coordinates: Coordinates;
  roadAddress?: string;
  jibunAddress?: string;
}

export interface MyPlace {
  id: string;
  name: string;
  address?: string;
  lng?: number;
  lat?: number;
}
