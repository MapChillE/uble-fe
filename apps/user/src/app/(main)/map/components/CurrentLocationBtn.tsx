import { Crosshair } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface CurrentLocationBtnProps {
  onClick: () => void;
  disabled?: boolean;
}

const CurrentLocationBtn = ({ onClick, disabled = false }: CurrentLocationBtnProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="top-42 absolute right-4 z-30 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
      size="icon"
      variant="outline"
    >
      <Crosshair className="h-5 w-5 text-blue-500" />
    </Button>
  );
};

export default CurrentLocationBtn;
