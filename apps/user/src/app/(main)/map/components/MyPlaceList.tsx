import MyPlaceCard from "@/app/(main)/map/components/MyPlaceCard";
import { MyPlace } from "@/types/map";

interface MyPlaceListProps {
  places: MyPlace[];
  selectedPlaceId: string | null;
  onSelect: (id: string) => void;
}

const MyPlaceList = ({ places, selectedPlaceId, onSelect }: MyPlaceListProps) => {
  return (
    <>
      {places.map((place) => (
        <MyPlaceCard
          key={place.id}
          name={place.name}
          address={place.address}
          selected={selectedPlaceId === place.id}
          onClick={() => onSelect(place.id)}
        />
      ))}
    </>
  );
};

export default MyPlaceList;
