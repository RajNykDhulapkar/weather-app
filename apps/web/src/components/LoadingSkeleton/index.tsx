import { Skeleton } from "@/components/ui/skeleton";

const MetricSkeleton: React.FC = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="size-6" />
    <Skeleton className="w-16 h-6" />
  </div>
);

const ForecastItemSkeleton: React.FC = () => (
  <div className="text-center space-y-2">
    <Skeleton className="size-10 mx-auto" />
    <Skeleton className="w-16 h-6 mx-auto" />
    <Skeleton className="w-20 h-4 mx-auto" />
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <>
    <div className="flex items-center justify-between">
      <Skeleton className="size-48" />

      <div className="flex flex-col gap-4 items-center">
        <Skeleton className="w-32 h-32" />
        <Skeleton className="w-20 h-6" />
      </div>

      <div className="space-y-2 px-6">
        {[...Array(4)].map((_, i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>
    </div>

    <div className="grid grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <ForecastItemSkeleton key={i} />
      ))}
    </div>
  </>
);

export default LoadingSkeleton;
