import { Skeleton } from "@/components/ui/skeleton";

const StatCardSkeleton = () => {
  return (
    <div className="h-32 p-0 bg-white rounded-2xl shadow-sm border border-gray-50">
      <Skeleton className="h-full w-full p-0 bg-gray-100" />
    </div>
  );
};

export default StatCardSkeleton;
