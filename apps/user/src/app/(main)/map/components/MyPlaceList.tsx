import MyPlaceCard from "@/app/(main)/map/components/MyPlaceCard";
import { MyPlace } from "@/types/map";

interface MyPlaceListProps {
  places: MyPlace[];
  selectedPlaceId: number | null;
  onSelect: (id: number) => void;
}

const MyPlaceList = ({ places, selectedPlaceId, onSelect }: MyPlaceListProps) => {
  console.log(places);
  return (
    <>
      {places.map((place) => (
        <MyPlaceCard
          key={place.id}
          placeId={place.id}
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
