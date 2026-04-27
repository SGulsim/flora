interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton-shimmer rounded-xl ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/5] rounded-2xl mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function OrderRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
