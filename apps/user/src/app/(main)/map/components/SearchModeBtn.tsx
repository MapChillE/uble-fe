import { Button } from "@workspace/ui/components/button";

interface SearchModeBtnProps {
  isSearchMode: boolean;
  onExit: () => void;
  onSearchHere: () => void;
}

const SearchModeBtn = ({ isSearchMode, onExit, onSearchHere }: SearchModeBtnProps) => {
  return (
    <div className="sm:bottom-35 md:bottom-35 lg:bottom-35 absolute bottom-60 left-1/2 z-20 -translate-x-1/2">
      <Button
        className="rounded-full"
        variant="filter_select"
        onClick={isSearchMode ? onExit : onSearchHere}
      >
        {isSearchMode ? "주변 매장 보기" : "현 지도에서 검색"}
      </Button>
    </div>
  );
};

export default SearchModeBtn;
