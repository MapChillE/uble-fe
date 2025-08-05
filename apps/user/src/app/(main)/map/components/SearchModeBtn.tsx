import { Button } from "@workspace/ui/components/button";

interface SearchModeBtnProps {
  isSearchMode: boolean;
  onExit: () => void;
  onSearchHere: () => void;
}

const SearchModeBtn = ({ isSearchMode, onExit, onSearchHere }: SearchModeBtnProps) => {
  const getButtonText = () => {
    if (isSearchMode) {
      return "주변 매장 보기";
    } else {
      return "현 지도에서 검색";
    }
  };

  return (
    <div className="top-30 absolute left-1/2 z-20 -translate-x-1/2 select-none">
      <Button
        className="rounded-full"
        variant="filter_select"
        onClick={isSearchMode ? onExit : onSearchHere}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default SearchModeBtn;
