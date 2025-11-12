import { Skeleton } from '@/components/ui/skeleton';

export function HistoryListSkeleton() {
    return (
        <>
            <div className="space-y-2">
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
            </div>
        </>
    );
}
