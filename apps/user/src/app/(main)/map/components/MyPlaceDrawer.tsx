import { memo, useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "@workspace/ui/components/button";
import MyPlaceList from "./MyPlaceList";
import MyPlaceForm from "./MyPlaceForm";
import CurrentLocationCard from "@/app/(main)/map/components/CurrentLocationCard";
import { useMapStore } from "@/store/useMapStore";
import useNaverServiceReady from "@/hooks/map/useNaverServiceReady";
import { GeocodingResult, MyPlace } from "@/types/map";
import { fetchMyPlaces, postMyPlace } from "@/service/map";
import { toast } from "sonner";

interface MyPlaceDrawerProps {
  trigger?: React.ReactNode;
}

const MyPlaceDrawer = ({ trigger }: MyPlaceDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const addPlace = useMapStore((s) => s.addMyPlace);
  const setMyPlaces = useMapStore((s) => s.setMyPlaces);
  const places = useMapStore((s) => s.myPlaces);
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  const setSelectedPlaceId = useMapStore((s) => s.setSelectedPlaceId);
  const serviceReady = useNaverServiceReady();

  // Drawer 열릴 때 서버에서 myPlaces 다시 불러오기
  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      try {
        const places = await fetchMyPlaces();
        setMyPlaces(places);
      } catch {
        toast.error("내 장소를 불러오지 못했습니다.");
      }
    };
    fetchData();
  }, [open, setMyPlaces]);

  const handleAdd = async (name: string, geocode: GeocodingResult) => {
    try {
      const newPlace = await postMyPlace({
        name,
        address: geocode.address,
        latitude: geocode.coordinates[1],
        longitude: geocode.coordinates[0],
      });
      addPlace(newPlace);
      setShowForm(false);
    } catch {
      toast.error("장소 등록에 실패했습니다.");
    }
  };

  return (
    <div className="top-30 absolute right-4 z-50">
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="z-80 fixed inset-0 bg-black/40" />
          <Drawer.Content className="z-100 fixed bottom-0 left-0 right-0 mx-auto max-w-md rounded-t-2xl bg-white p-6 shadow-lg">
            <Drawer.Title className="mb-4 overflow-y-auto text-lg font-bold">내 장소</Drawer.Title>
            {/* 현재 위치 카드 */}
            <CurrentLocationCard
              isSelected={selectedPlaceId === -1}
              onClick={() => setSelectedPlaceId(-1)}
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
