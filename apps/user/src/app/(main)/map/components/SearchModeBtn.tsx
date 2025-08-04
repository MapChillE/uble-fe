import { Button } from "@workspace/ui/components/button";

interface SearchModeBtnProps {
  isSearchMode: boolean;
  onExit: () => void;
  onSearchHere: () => void;
  searchType?: string | null;
}

const SearchModeBtn = ({ isSearchMode, onExit, onSearchHere, searchType }: SearchModeBtnProps) => {
  const getButtonText = () => {
    if (isSearchMode) {
      if (searchType === "STORE") {
        return "주변 매장 보기";
      } else if (searchType === "BRAND") {
        return "주변 브랜드 보기";
      } else if (searchType === "CATEGORY") {
        return "주변 카테고리 보기";
      } else {
        return "주변 매장 보기";
      }
    } else {
      return "현 지도에서 검색";
    }
  };

  return (
    <div className="sm:bottom-35 md:bottom-35 lg:bottom-35 absolute bottom-60 left-1/2 z-20 -translate-x-1/2">
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
