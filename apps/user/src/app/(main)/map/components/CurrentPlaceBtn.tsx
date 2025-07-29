import { Button } from "@workspace/ui/components/button";
import { Navigation } from "lucide-react";
import { forwardRef } from "react";
import { useLocationStore } from "@/store/useLocationStore";

const CurrentPlaceBtn = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  (props, ref) => {
    const setSelectedPlaceId = useLocationStore((s) => s.setSelectedPlaceId);
    const currentLocation = useLocationStore((s) => s.currentLocation);
    const setBaseLocation = useLocationStore((s) => s.setBaseLocation);

    return (
      <Button
        ref={ref}
        variant="circle_outline"
        size="icon"
        aria-label="현재 위치"
        {...props}
        className="absolute bottom-40 right-4 z-20"
        onClick={() => {
          setSelectedPlaceId(-1);
          if (currentLocation) {
            setBaseLocation(currentLocation);
          }
        }}
      >
        <Navigation className="h-6 w-6 fill-blue-600 text-blue-600" />
      </Button>
    );
  }
);

export default CurrentPlaceBtn;
