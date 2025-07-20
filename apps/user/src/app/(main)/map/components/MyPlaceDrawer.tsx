import { memo, useCallback, useEffect, useReducer, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "@workspace/ui/components/button";
import MyPlaceCard from "@/app/(main)/map/components/MyPlaceCard";
import CurrentLocationCard from "@/app/(main)/map/components/CurrentLocationCard";
import { useMapStore } from "@/store/useMapStore";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";
import { GeocodeStatus, GeocodingResult, MyPlace } from "@/types/map";

interface MyPlaceDrawerProps {
  trigger?: React.ReactNode;
}
type FormState = {
  showForm: boolean;
  name: string;
  addressInput: string;
  geocode: GeocodingResult | null;
  loading: boolean;
  serviceReady: boolean;
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_ADDRESS_INPUT"; payload: string }
  | { type: "SET_GEOCODE"; payload: GeocodingResult | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SERVICE_READY"; payload: boolean }
  | { type: "TOGGLE_FORM"; payload?: boolean }
  | { type: "RESET_FORM" };

const initialState: FormState = {
  showForm: false,
  name: "",
  addressInput: "",
  geocode: null,
  loading: false,
  serviceReady: false,
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ADDRESS_INPUT":
      return { ...state, addressInput: action.payload };
    case "SET_GEOCODE":
      return { ...state, geocode: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SERVICE_READY":
      return { ...state, serviceReady: action.payload };
    case "TOGGLE_FORM":
      return { ...state, showForm: action.payload ?? !state.showForm };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const MyPlaceDrawer = ({ trigger }: MyPlaceDrawerProps) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const { showForm, name, addressInput, geocode, loading } = formState;
  const [serviceReady, setServiceReady] = useState(false);

  const places = useMapStore((s) => s.myPlaces);
  const addPlace = useMapStore((s) => s.addMyPlace);
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  const setSelectedPlaceId = useMapStore((s) => s.setSelectedPlaceId);
  const currentLocation = useCurrentLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.naver?.maps?.Service) {
        setServiceReady(true);
        clearInterval(interval); // 성공 시 종료
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleGeocode = useCallback(() => {
    if (!addressInput.trim() || typeof window === "undefined" || !window.naver?.maps?.Service) {
      alert("지오코딩 서비스를 사용할 수 없습니다.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    window.naver.maps.Service.geocode(
      { query: addressInput },
      (status: GeocodeStatus, response: any) => {
        dispatch({ type: "SET_LOADING", payload: false });

        if (status !== window.naver.maps.Service.Status.OK) {
          alert(`지오코딩 오류: ${status}`);
          return;
        }

        const result = response.v2.addresses[0];
        if (result) {
          dispatch({
            type: "SET_GEOCODE",
            payload: {
              address: result.roadAddress || result.jibunAddress,
              coordinates: [parseFloat(result.x), parseFloat(result.y)],
            },
          });
        } else {
          alert("해당 주소를 찾을 수 없습니다.");
        }
      }
    );
  }, [addressInput]);

  const handleAdd = () => {
    if (!name) return alert("내 장소 이름을 입력해주세요");
    if (!geocode) return alert("주소 검색 후 장소명을 입력해주세요");

    const newPlace: MyPlace = {
      id: crypto.randomUUID(),
      name,
      address: geocode.address,
      coordinates: [geocode.coordinates[0], geocode.coordinates[1]],
    };
    addPlace(newPlace);
    dispatch({ type: "RESET_FORM" });
    // TODO: 내장소 등록 API 연결
  };

  return (
    <div className="top-30 absolute right-4 z-10">
      <Drawer.Root>
        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md rounded-t-2xl bg-white p-6 shadow-lg">
            <Drawer.Title className="mb-4 overflow-y-auto text-lg font-bold">내 장소</Drawer.Title>

            {/* 현재 위치 카드 */}
            <CurrentLocationCard
              isSelected={selectedPlaceId === "current"}
              onClick={() => setSelectedPlaceId("current")}
            />
            <hr className="my-4 text-gray-300" />

            {/* 장소 카드 목록 */}
            {places.length === 0 && !showForm ? (
              <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                아직 등록된 장소가 없어요.
                <div className="mt-2">
                  <Button size="sm" onClick={() => dispatch({ type: "TOGGLE_FORM" })}>
                    + 장소 등록하기
                  </Button>
                </div>
              </div>
            ) : (
              places.map((place) => (
                <MyPlaceCard
                  key={place.id}
                  name={place.name}
                  address={place.address}
                  selected={selectedPlaceId === place.id}
                  onClick={() => setSelectedPlaceId(place.id)}
                />
              ))
            )}

            {/* 등록 폼 */}
            {showForm && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="주소를 입력하세요"
                  value={addressInput}
                  onChange={(e) => dispatch({ type: "SET_ADDRESS_INPUT", payload: e.target.value })}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleGeocode}
                  disabled={!addressInput || loading || !serviceReady}
                >
                  {loading ? "검색 중..." : "주소 검색"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "RESET_FORM" })}>
                  취소
                </Button>
                {geocode && (
                  <div className="rounded-md bg-gray-50 p-3 text-sm">
                    <p>
                      <strong>주소:</strong> {geocode.address}
                    </p>
                    <p>
                      <strong>위도/경도:</strong> {geocode.coordinates[1]}, {geocode.coordinates[0]}
                    </p>

                    <input
                      type="text"
                      placeholder="장소 이름"
                      value={name}
                      onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
                      className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                    <div className="mt-3 flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: "RESET_FORM" })}
                      >
                        취소
                      </Button>
                      <Button size="sm" onClick={handleAdd} disabled={!name.trim()}>
                        저장
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 등록 버튼 */}
            {!showForm && places.length == 1 && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch({ type: "TOGGLE_FORM" })}
                >
                  + 장소 추가하기
                </Button>
              </div>
            )}

            {/* 최대 등록 안내 */}
            {places.length >= 2 && (
              <div className="mt-4 text-center text-sm text-gray-400">
                장소는 최대 2개까지 등록할 수 있어요.
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default MyPlaceDrawer;
