'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleCalendar from '../schedule/schedule-calendar';
import { useEffect, useState } from 'react';
import ScheduleSkeleton from '../schedule/schedule-skeleton';

interface ViewScheduleHistoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    schedule: ScheduleList;
}

export default function ViewScheduleHistoryDialog({
    open,
    onOpenChange,
    schedule,
}: ViewScheduleHistoryDialogProps) {
    if (!schedule) return null;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (open) {
            setIsLoading(true);
        }
        // fake async loading delay
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1.5s delay — adjust as needed

        return () => clearTimeout(timeout); // cleanup on unmount
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-[80vh] min-w-[90vw] grid-rows-[auto_1fr]">
                <DialogTitle>Schedule - {schedule.id}</DialogTitle>
                <DialogDescription className="sr-only">
                    Schedule details dialog
                </DialogDescription>
                <div className="overflow-auto">
                    {isLoading ? (
                        <ScheduleSkeleton />
                    ) : (
                        <div className="h-full overflow-auto rounded-md">
                            <div className="min-w-[900px]">
                                <ScheduleCalendar
                                    scheduleData={schedule}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
