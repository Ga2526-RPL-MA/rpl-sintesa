'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleCalendar from '../schedule-calendar';
import { useEffect, useState } from 'react';
import ScheduleSkeleton from '../schedule-skeleton';

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
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (open) {
            setIsLoading(true)
        }
        // fake async loading delay
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1.5s delay — adjust as needed

        return () => clearTimeout(timeout); // cleanup on unmount
    },[open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='min-w-[90vw] h-[80vh] grid-rows-[auto_1fr]'>
                <DialogTitle>
                    Schedule - {schedule.id}
                </DialogTitle>
                <div>
                    {isLoading ? (
                        <ScheduleSkeleton />
                    ) : (
                        <ScheduleCalendar 
                        scheduleData={schedule} 
                        className='w-full h-full'
                        />
                    )}

                </div>
            </DialogContent>
        </Dialog>
    );
}
