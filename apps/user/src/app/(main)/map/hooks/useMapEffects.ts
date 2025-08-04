import { useEffect } from "react";
import { Coordinates } from "@/types/map";
import { createBoundsFromCenterAndZoom } from "@/utils/mapBounds";
import { DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { Pin } from "@/app/(main)/map/components/NaverMap";

interface UseMapEffectsProps {
  // baseLocation 관련
  baseLocation: Coordinates;
  lastBaseLocationRef: React.RefObject<Coordinates>;
  isChangingBaseLocation: boolean;
  setIsChangingBaseLocation: (changing: boolean) => void;
  isMyPlaceButtonClick: boolean;
  selectedCategory: { categoryId: number | "SEASON" | "VIP" | "LOCAL" };
  searchType: string | null;
  state: { center: Coordinates; bounds: naver.maps.LatLngBounds | null; zoom: number };
  dispatch: (action: any) => void;
  fetchPins: (
    center: Coordinates,
    bounds: naver.maps.LatLngBounds,
    category: number | "SEASON" | "VIP" | "LOCAL",
    brandId?: number,
    zoom?: number
  ) => Promise<void>;
  setShowSearchBtn: (show: boolean) => void;

  // selectedPlaceId 관련
  selectedPlaceId: number;
  lastSelectedPlaceIdRef: React.MutableRefObject<number>;
  setIsMyPlaceButtonClick: (clicked: boolean) => void;

  // 카테고리 변경 관련
  isInitialized: boolean;

  // 검색 관련
  searchLocation: Coordinates | null;
  searchId: number | null;
  searchStoreId: number | null;
  hasSearched: boolean;
  setHasSearched: (searched: boolean) => void;
  isExitingSearchMode: boolean;
  setIsExitingSearchMode: (exiting: boolean) => void;
  onPinClick: (pin: Pin) => void;
}

export const useMapEffects = ({
  // baseLocation 관련
  baseLocation,
  lastBaseLocationRef,
  isChangingBaseLocation,
  setIsChangingBaseLocation,
  isMyPlaceButtonClick,
  selectedCategory,
  searchType,
  state,
  dispatch,
  fetchPins,
  setShowSearchBtn,

  // selectedPlaceId 관련
  selectedPlaceId,
  lastSelectedPlaceIdRef,
  setIsMyPlaceButtonClick,

  // 카테고리 변경 관련
  isInitialized,

  // 검색 관련
  searchLocation,
  searchId,
  searchStoreId,
  hasSearched,
  setHasSearched,
  isExitingSearchMode,
  setIsExitingSearchMode,
  onPinClick,
}: UseMapEffectsProps) => {
  // baseLocation 변경 감지 (내 장소 변경)
  useEffect(() => {
    if (
      baseLocation[0] !== lastBaseLocationRef.current[0] ||
      baseLocation[1] !== lastBaseLocationRef.current[1]
    ) {
      // 내 장소 변경 중 플래그 설정
      setIsChangingBaseLocation(true);

      // center를 내 장소로 변경
      dispatch({ type: "SET_CENTER", payload: baseLocation });
      lastBaseLocationRef.current = baseLocation;

      // 새로운 baseLocation에 맞는 bounds 생성
      const newBounds = createBoundsFromCenterAndZoom(baseLocation, DEFAULT_ZOOM_LEVEL);
      if (newBounds) {
        dispatch({ type: "SET_BOUNDS", payload: newBounds });

        // 내 장소 버튼 클릭이면 지도 중심만 이동, 아니면 fetchPins 실행
        if (!isMyPlaceButtonClick) {
          fetchPins(baseLocation, newBounds, selectedCategory.categoryId, undefined, state.zoom);
        }
        setShowSearchBtn(false);
      }

      // 내 장소 변경 완료 후 플래그 해제 (약간의 지연 후)
      setTimeout(() => {
        setIsChangingBaseLocation(false);
      }, 500);
    }
  }, [baseLocation, selectedCategory.categoryId, fetchPins, searchType]);

  // selectedPlaceId 변경 감지 (내 장소 버튼 클릭 감지)
  useEffect(() => {
    if (selectedPlaceId !== lastSelectedPlaceIdRef.current) {
      setIsMyPlaceButtonClick(true);
      lastSelectedPlaceIdRef.current = selectedPlaceId;

      // 1초 후 플래그 해제
      setTimeout(() => {
        setIsMyPlaceButtonClick(false);
      }, 1000);
    }
  }, [selectedPlaceId]);

  // 카테고리 변경시 현재 위치에서 fetchPins (baseLocation 변경과 중복되지 않도록)
  useEffect(() => {
    if (isInitialized && state.bounds && state.center && !searchType && !isChangingBaseLocation) {
      // baseLocation 변경으로 인한 fetchPins와 중복되지 않도록 약간의 지연
      const timer = setTimeout(() => {
        if (state.bounds) {
          fetchPins(state.center, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
        }
      }, 200); // 지연 시간을 늘려서 baseLocation 변경이 완전히 끝난 후 실행

      return () => clearTimeout(timer);
    }
  }, [selectedCategory.categoryId, isInitialized, fetchPins, searchType, isChangingBaseLocation]);

  // 검색 위치로 이동 (초기화 완료 후에만 실행)
  useEffect(() => {
    if (searchLocation && isInitialized && searchType && !isChangingBaseLocation) {
      // 초기화 시에는 이미 처리했으므로 중복 실행 방지
      const isInitialSearch =
        searchLocation[0] === state.center[0] && searchLocation[1] === state.center[1];

      if (!isInitialSearch) {
        dispatch({ type: "SET_CENTER", payload: searchLocation });
        const newBounds = createBoundsFromCenterAndZoom(searchLocation, DEFAULT_ZOOM_LEVEL);
        if (newBounds) {
          dispatch({ type: "SET_BOUNDS", payload: newBounds });
          // 지도 이동 후 검색 실행을 위해 별도 useEffect에서 처리
          setShowSearchBtn(false);
        }
      }
    }
  }, [
    searchLocation,
    isInitialized,
    searchType,
    searchId,
    searchStoreId,
    selectedCategory.categoryId,
    onPinClick,
    isChangingBaseLocation,
  ]);

  // 지도 중심 이동 후 검색 실행 (searchLocation과 state.center가 일치할 때)
  useEffect(() => {
    if (
      isInitialized &&
      state.bounds &&
      state.center &&
      searchLocation &&
      searchType &&
      !hasSearched && // 아직 검색하지 않은 경우에만 실행
      // 지도 중심이 검색 위치와 일치할 때만 실행
      Math.abs(state.center[0] - searchLocation[0]) < 0.0001 &&
      Math.abs(state.center[1] - searchLocation[1]) < 0.0001
    ) {
      if (searchType === "BRAND" && searchId) {
        fetchPins(state.center, state.bounds, 0, searchId, state.zoom);
      } else if (searchType === "CATEGORY" && searchId) {
        fetchPins(state.center, state.bounds, searchId, undefined, state.zoom);
      } else if (searchType === "STORE" && searchStoreId) {
        // STORE 타입: 해당 위치로 이동하고 storeId로 drawer 열기
        fetchPins(state.center, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
        // 검색 위치 변경 시에만 drawer 열기 (중복 방지)
        const storePin: Pin = {
          id: searchStoreId,
          coords: state.center,
          name: "",
          category: "store",
          type: "store",
        };
        onPinClick(storePin);
      }

      // 검색 완료 표시
      setHasSearched(true);
    }
  }, [
    state.center,
    state.bounds,
    searchLocation,
    searchType,
    searchId,
    searchStoreId,
    isInitialized,
    fetchPins,
    selectedCategory.categoryId,
    onPinClick,
    hasSearched,
  ]);

  // 새로운 검색 시작 시 hasSearched 리셋 (핀 클릭으로 인한 searchLocation 변경은 제외)
  useEffect(() => {
    if (searchLocation || searchType) {
      // searchLocation이 변경되었지만 이미 검색이 완료된 상태라면 핀 클릭으로 인한 변경일 가능성이 높음
      // 이 경우 hasSearched를 리셋하지 않음
      if (!hasSearched) {
        setHasSearched(false);
      }
    }
  }, [searchLocation, searchType, hasSearched]);

  // 검색 타입 변경 시 즉시 검색 실행 (searchLocation이 설정되지 않은 경우에만)
  useEffect(() => {
    if (
      isInitialized &&
      state.bounds &&
      state.center &&
      searchType === "BRAND" &&
      searchId &&
      !searchLocation // searchLocation이 없을 때만 실행 (이미 이동된 경우 제외)
    ) {
      fetchPins(state.center, state.bounds, 0, searchId, state.zoom);
      setHasSearched(true); // 검색 완료 표시
    }
  }, [searchType, searchId, isInitialized, fetchPins, searchLocation]);

  // 검색 모드 해제 시 주변 매장 표시
  useEffect(() => {
    if (isExitingSearchMode && isInitialized && state.bounds && state.center) {
      fetchPins(state.center, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
      setIsExitingSearchMode(false);
      setHasSearched(false); // 검색 모드 해제 시 리셋
    }
  }, [isExitingSearchMode, isInitialized, fetchPins, selectedCategory.categoryId]);
};
