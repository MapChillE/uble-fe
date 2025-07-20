import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";
import { forwardRef } from "react";

const MyPlaceTriggerBtn = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  (props, ref) => (
    <Button ref={ref} variant="circle_outline" size="icon" aria-label="내 장소" {...props}>
      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
    </Button>
  )
);

export default MyPlaceTriggerBtn;
