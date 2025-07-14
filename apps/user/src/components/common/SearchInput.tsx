import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ searchQuery, handleChange }: SearchInputProps) {
  return (
    <section>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="제휴처 검색"
          className="border border-gray-300 pl-10 shadow-none"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
