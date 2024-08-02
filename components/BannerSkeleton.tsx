import { Skeleton } from "./ui/skeleton";

const BannerSkeleton = () => {
  return (
    <div className="relative w-full aspect-square flex flex-col gap-5 p-4 items-center border-2 border-muted bg-card">
      <Skeleton className="w-full h-[10%]" />
      <div className="flex flex-col items-center w-[90%] h-[25%] gap-4">
        <Skeleton className="w-[80%] flex-1" />
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-[80%] flex-1" />
      </div>
      <Skeleton className="flex-1 w-full" />
    </div>
  );
};

export default BannerSkeleton;
