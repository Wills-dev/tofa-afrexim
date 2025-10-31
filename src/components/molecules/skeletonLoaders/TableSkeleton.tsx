import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {["", "", "", "", "", "", "", "", "", ""].map((skeleton, index) => (
        <div
          key={index}
          className="h-10 p-0 bg-white rounded-2xl shadow-sm border border-gray-50"
        >
          <Skeleton className="h-full w-full p-0 bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
