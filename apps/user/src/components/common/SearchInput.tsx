import React from "react";
import { Search } from "lucide-react";
import { Input } from "@workspace/ui/components/input";

interface SearchInputProps {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

export default function SearchInput({
  searchQuery,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
}: SearchInputProps) {
  return (
    <section className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        ref={ref}
        placeholder={placeholder || "제휴처 검색"}
        className="border border-gray-300 pl-10 shadow-none"
        value={searchQuery}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </section>
  );
}
