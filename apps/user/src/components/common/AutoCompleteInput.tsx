import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";

interface AutoCompleteInputProps {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: { type: "CATEGORY" | "BRAND"; value: string }[];
  onAutoSelect: (item: string) => void;
  onEnterSearch: (query: string) => void;
}

export default function AutoCompleteInput({
  searchQuery,
  onChange,
  autoComplete,
  onAutoSelect,
  onEnterSearch,
}: AutoCompleteInputProps) {
  const [showAuto, setShowAuto] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.nativeEvent as any).isComposing) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, autoComplete.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev === null ? autoComplete.length - 1 : Math.max(prev - 1, 0)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex !== null) {
        const selected = autoComplete[highlightIndex];
        if (selected) {
          onAutoSelect(selected.value);
          setShowAuto(false);
        }
      } else {
        onEnterSearch(searchQuery);
        setShowAuto(false);
      }
      setHighlightIndex(null);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (item: string) => {
    onAutoSelect(item);
    setShowAuto(false);
    setHighlightIndex(null);
    inputRef.current?.blur();
  };

  // 클릭 시 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowAuto(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section>
      <div className="relative" ref={containerRef}>
        <SearchInput
          ref={inputRef}
          searchQuery={searchQuery}
          onChange={onChange}
          onFocus={() => setShowAuto(true)}
          onKeyDown={handleKeyDown}
        />
        {showAuto && autoComplete.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-10 -mt-[4px] rounded-b-md border border-gray-300 bg-white">
            {autoComplete.map((item, idx) => (
              <li
                key={idx}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${highlightIndex === idx ? "bg-gray-200" : ""}`}
                onMouseDown={() => handleSelect(item.value)}
              >
                <span
                  className={`mr-2 inline-block rounded px-2 py-0.5 text-xs ${item.type === "CATEGORY" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}
                >
                  {item.type === "CATEGORY" ? "카테고리" : "브랜드"}
                </span>
                {item.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
