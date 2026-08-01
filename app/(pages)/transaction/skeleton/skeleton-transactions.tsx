import { Skeleton } from "@/components/ui/skeleton";

const TransactionListSkeleton = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-zinc-100 py-4"
        >
          {/* LEFT */}
          <div className="flex flex-col">
            <Skeleton className="h-5 w-40" />

            <Skeleton className="mt-2 h-3 w-28" />

            <div className="mt-3 flex gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end">
            <Skeleton className="h-5 w-28" />

            <Skeleton className="mt-2 h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionListSkeleton;
