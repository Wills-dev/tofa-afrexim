import { Skeleton } from "@/components/ui/skeleton";

const ChartLoader = () => {
  return (
    <div className="h-80 p-0 bg-white rounded-2xl shadow-sm border border-gray-50">
      <Skeleton className="h-full w-full p-0 bg-gray-200" />
    </div>
  );
};

export default ChartLoader;
