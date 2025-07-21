import { memo, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "@workspace/ui/components/button";
import MyPlaceList from "./MyPlaceList";
import MyPlaceForm from "./MyPlaceForm";
import CurrentLocationCard from "@/app/(main)/map/components/CurrentLocationCard";
import { useMapStore } from "@/store/useMapStore";
import useNaverServiceReady from "@/hooks/map/useNaverServiceReady";
import { GeocodingResult, MyPlace } from "@/types/map";

interface MyPlaceDrawerProps {
  trigger?: React.ReactNode;
}

const MyPlaceDrawer = ({ trigger }: MyPlaceDrawerProps) => {
  const [showForm, setShowForm] = useState(false);
  const places = useMapStore((s) => s.myPlaces);
  const addPlace = useMapStore((s) => s.addMyPlace);
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  const setSelectedPlaceId = useMapStore((s) => s.setSelectedPlaceId);
  const serviceReady = useNaverServiceReady();

  const handleAdd = (name: string, geocode: GeocodingResult) => {
    const newPlace: MyPlace = {
      id: crypto.randomUUID(),
      name,
      address: geocode.address,
      coordinates: [geocode.coordinates[0], geocode.coordinates[1]],
    };
    addPlace(newPlace);
    setShowForm(false);
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
                  <Button size="sm" onClick={() => setShowForm(true)}>
                    + 장소 등록하기
                  </Button>
                </div>
              </div>
            ) : (
              <MyPlaceList
                places={places}
                selectedPlaceId={selectedPlaceId}
                onSelect={setSelectedPlaceId}
              />
            )}
            {/* 등록 폼 */}
            {showForm && (
              <MyPlaceForm
                onAdd={handleAdd}
                onCancel={() => setShowForm(false)}
                serviceReady={serviceReady}
              />
            )}
            {/* 등록 버튼 */}
            {!showForm && places.length === 1 && (
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
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
