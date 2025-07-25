import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";

interface AutoCompleteInputProps {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string[];
  onAutoSelect: (item: string) => void;
}

export default function AutoCompleteInput({
  searchQuery,
  onChange,
  autoComplete,
  onAutoSelect,
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
          onAutoSelect(selected);
          setShowAuto(false);
        }
      } else {
        onAutoSelect(searchQuery);
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
          <ul className="absolute left-0 right-0 top-full z-10 rounded border border-gray-200 bg-white shadow">
            {autoComplete.map((item, idx) => (
              <li
                key={item + idx}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${highlightIndex === idx ? "bg-gray-200" : ""}`}
                onMouseDown={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
