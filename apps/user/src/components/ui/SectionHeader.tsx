import { scroll } from "@/utils/scroll";
import { Button } from "@workspace/ui/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RefObject, ReactNode } from "react";

interface SectionHeaderProps {
  title: string | ReactNode;
  isScroll?: boolean;
  Scrollref?: RefObject<HTMLDivElement | null>;
}
const SectionHeader = ({ title, isScroll = false, Scrollref }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {isScroll && Scrollref && (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => scroll("left", Scrollref)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => scroll("right", Scrollref)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
