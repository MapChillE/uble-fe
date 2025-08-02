import { Skeleton } from "@workspace/ui/components/skeleton";

const FeedbackSkeleton = () => {
  return (
    <div className="space-y-4 px-4 py-8">
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default FeedbackSkeleton;
