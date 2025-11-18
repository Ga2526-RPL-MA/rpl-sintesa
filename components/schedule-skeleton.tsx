import React from 'react';
import { Skeleton } from './ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

function ScheduleSkeleton() {
    const isMobile = useIsMobile();
    return (
        <div className="h-full space-y-2">
            {/* Header */}
            <div className="grid grid-cols-1 gap-2 overflow-hidden lg:grid-cols-[0.15fr_repeat(5,1fr)]">
                <div></div>
                {isMobile ? (
                    <>
                        <Skeleton className="h-[3vh] w-full" />
                    </>
                ) : (
                    <>
                        <Skeleton className="h-[3vh] w-full" />
                        <Skeleton className="h-[3vh] w-full" />
                        <Skeleton className="h-[3vh] w-full" />
                        <Skeleton className="h-[3vh] w-full" />
                        <Skeleton className="h-[3vh] w-full" />
                    </>
                )}
            </div>
            <div className="grid h-full grid-cols-[40px_repeat(1,1fr)] gap-2 overflow-hidden pb-8">
                <div className="space-y-2">
                    <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        </div>
    );
}

export default ScheduleSkeleton;
