import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { filterOptions } from "@/types/constants";
import { AgeRangeType, StatisticsFilter as StatisticsType } from "@/types/statistics";
import { Button } from "@workspace/ui/components/button";

interface StatisticsFilterProps {
  filters: StatisticsType;
  setFilters: React.Dispatch<React.SetStateAction<StatisticsType>>;
}
const StatisticsFilter = ({ filters, setFilters }: StatisticsFilterProps) => {
  return (
    <Card className="border-none pb-5 pt-5">
      <CardHeader>
        <CardTitle className="text-xl font-bold">필터 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">통계 대상</label>
            <Select
              value={filters.rankTarget}
              onValueChange={(value: "BRAND" | "CATEGORY") =>
                setFilters({ ...filters, rankTarget: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.rankTarget.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">성별</label>
            <Select
              value={filters.gender || "none"}
              onValueChange={(value: "MALE" | "FEMALE" | "none") =>
                setFilters({ ...filters, gender: value === "none" ? null : value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택 안함" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                {filterOptions.gender
                  .filter((g) => g !== null)
                  .map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">나이대</label>
            <Select
              value={filters.ageRange ? String(filters.ageRange) : "none"}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  ageRange: value === "none" ? null : (Number(value) as AgeRangeType),
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택 안함" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                {filterOptions.ageRange
                  .filter((age) => age !== null)
                  .map((age) => (
                    <SelectItem key={age} value={String(age)}>
                      {age}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">사용자 등급</label>
            <Select
              value={filters.rank || "none"}
              onValueChange={(value: "NONE" | "NORMAL" | "PREMIUM" | "VIP" | "VVIP" | "none") =>
                setFilters({ ...filters, rank: value === "none" ? null : value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택 안함" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                {filterOptions.rank
                  .filter((r) => r !== null)
                  .map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">혜택 타입</label>
            <Select
              value={filters.benefitType || "none"}
              onValueChange={(value: "VIP" | "LOCAL" | "NORMAL" | "none") =>
                setFilters({ ...filters, benefitType: value === "none" ? null : value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택 안함" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                {filterOptions.benefitType
                  .filter((type) => type !== null)
                  .map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              setFilters({
                rankTarget: "BRAND",
                gender: null,
                ageRange: null,
                rank: null,
                benefitType: null,
              })
            }
          >
            초기화
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsFilter;
