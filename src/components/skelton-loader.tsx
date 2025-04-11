import { Skeleton } from "./ui/skeleton";

export const SkeltonLoader = () => {
  return (
    <div className="space-y-4 md:px-20 mb-10">
      <div className="flex gap-2 items-center justify-between mx-4">
        <Skeleton className="h-7 w-[240px]" />
      </div>
      <div className="grid grid-row-2 gap-8">
        <Skeleton className="h-[300px] w-full" />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-start">
          <Skeleton className="h-60" />
          <div className="flex gap-4 items-center">
            <Skeleton className="h-60 w-[240px]" />
            <Skeleton className="h-60 w-[240px]" />
            <Skeleton className="h-60 w-[240px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
