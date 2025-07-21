import { useReducer, useCallback } from "react";
import { Button } from "@workspace/ui/components/button";
import { GeocodingResult } from "@/types/map";

export type MyPlaceFormProps = {
  onAdd: (name: string, geocode: GeocodingResult) => void;
  onCancel: () => void;
  serviceReady: boolean;
};

type FormState = {
  name: string;
  addressInput: string;
  geocode: GeocodingResult | null;
  loading: boolean;
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_ADDRESS_INPUT"; payload: string }
  | { type: "SET_GEOCODE"; payload: GeocodingResult | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET_FORM" };

const initialState: FormState = {
  name: "",
  addressInput: "",
  geocode: null,
  loading: false,
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
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const MyPlaceForm = ({ onAdd, onCancel, serviceReady }: MyPlaceFormProps) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const { name, addressInput, geocode, loading } = formState;

  const handleGeocode = useCallback(() => {
    if (!addressInput.trim() || typeof window === "undefined" || !window.naver?.maps?.Service) {
      alert("지오코딩 서비스를 사용할 수 없습니다.");
      return;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    window.naver.maps.Service.geocode(
      { query: addressInput },
      (status: naver.maps.Service.Status, response: naver.maps.Service.GeocodeResponse) => {
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
    onAdd(name, geocode);
    dispatch({ type: "RESET_FORM" });
  };

  return (
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
      <Button variant="ghost" size="sm" onClick={onCancel}>
        취소
      </Button>
      {geocode && (
        <div className="rounded-md bg-gray-50 p-3 text-sm">
          <p>
            <strong>주소:</strong> {geocode.address}
          </p>
          <input
            type="text"
            placeholder="장소 이름"
            value={name}
            onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              취소
            </Button>
            <Button size="sm" onClick={handleAdd} disabled={!name.trim()}>
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaceForm;
