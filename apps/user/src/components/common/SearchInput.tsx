import React, { memo } from "react";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { Input } from "@workspace/ui/components/input";

interface SearchInputProps {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      searchQuery,
      onChange,
      placeholder,
      onFocus,
      onBlur,
      onKeyDown,
      onBackClick,
      showBackButton = false,
    },
    ref
  ) => {
    return (
      <section className="relative">
        {showBackButton ? (
          <button
            onClick={onBackClick}
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        )}
        <Input
          ref={ref}
          placeholder={placeholder || "제휴처 검색"}
          className="border border-gray-300 pl-10 pr-10 shadow-none"
          value={searchQuery}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </section>
    );
  }
);

export default memo(SearchInput);
