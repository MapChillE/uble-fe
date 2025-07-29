import SectionHeader from "@/components/ui/SectionHeader";
import { Skeleton } from "@workspace/ui/components/skeleton";

const SectionSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <div className="space-y-4">
        <SectionHeader title="추천 제휴처 불러오는 중..." />
        <div className="flex gap-4 px-4 pb-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-56 flex-shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionSkeleton;
