import React from 'react';
import { Skeleton } from './ui/skeleton';

function ScheduleSkeleton() {
    return (
        <div className="h-full space-y-2">
            <div className="grid grid-cols-[0.15fr_repeat(5,1fr)] gap-2 overflow-hidden">
                <div></div>
                <Skeleton className="h-[3vh] w-full" />
                <Skeleton className="h-[3vh] w-full" />
                <Skeleton className="h-[3vh] w-full" />
                <Skeleton className="h-[3vh] w-full" />
                <Skeleton className="h-[3vh] w-full" />
            </div>
            <div className="grid h-full grid-cols-[0.03fr_repeat(1,1fr)] gap-2 overflow-hidden pb-8">
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
