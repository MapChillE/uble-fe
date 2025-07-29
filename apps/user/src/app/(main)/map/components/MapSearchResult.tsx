import { MapPin, Tag, Building } from "lucide-react";
import { MapSuggestion } from "@/types/search";

interface MapSearchResultProps {
  searchResults: MapSuggestion[];
  onResultClick: (result: MapSuggestion) => void;
}

export default function MapSearchResult({ searchResults, onResultClick }: MapSearchResultProps) {
  if (searchResults.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">검색어를 입력하거나 주변 검색을 해보세요</p>
          <p className="mt-1 text-sm text-gray-400">
            제휴처 이름이나 키워드로 검색할 수 있습니다 (ex{">"} 강남 맛집)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {searchResults.map((result) => {
        let icon = <MapPin className="h-5 w-5" />;
        let bgColor = "bg-blue-100";
        let iconColor = "text-blue-600";

        if (result.type === "CATEGORY") {
          icon = <Tag className="h-5 w-5" />;
          bgColor = "bg-green-100";
          iconColor = "text-green-600";
        } else if (result.type === "BRAND") {
          icon = <Building className="h-5 w-5" />;
          bgColor = "bg-purple-100";
          iconColor = "text-purple-600";
        }

        return (
          <div
            key={result.id}
            className="flex cursor-pointer items-start gap-3 px-4 py-4 hover:bg-gray-50"
            onClick={() => onResultClick(result)}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor}`}>
              <div className={iconColor}>{icon}</div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{result.suggestion}</h3>
              {result.address && <p className="text-sm text-gray-500">{result.address}</p>}
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-blue-600">{result.category}</span>
                <span className="text-xs text-gray-400">{result.type}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
