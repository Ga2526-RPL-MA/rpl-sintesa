'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';
import { CalendarDays, CalendarRange, Clock12, Clock3, MapPin, User } from 'lucide-react';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import ViewScheduleHistoryDialog from './view-schedule-history-dialog';

interface ScheduleHistoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    schedule: ScheduleList;
}

export default function ScheduleHistoryDialog({
    open,
    onOpenChange,
    schedule,
}: ScheduleHistoryDialogProps) {
    if (!schedule) return null;
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    function handleViewDialogClicked(){
        setViewDialogOpen(true)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='w-[18vw]'>
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-primary">
                            Schedule - {schedule.id}
                        </DialogTitle>
                    </div>
                    <Separator />
                </DialogHeader>
                <div className="space-y-3 p-1 text-sm">
                    {schedule.createdAt && (
                        <div className="flex items-start gap-2">
                            <CalendarDays className="text-muted-foreground mt-1" />
                            <div>
                            Generated on:
                            {schedule.createdAt && (
                                <h1 className="">
                                    {new Date(schedule.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    })} at {new Date(schedule.createdAt).toLocaleTimeString(undefined, {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    })}
                                </h1>
                            )}
                            </div>
                        </div>
                    )}
                    {schedule.semester && (
                        <div className="flex items-start gap-2">
                            <CalendarRange className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Semester:</h1>
                                <p>{schedule.semester}</p>
                            </div>
                        </div>
                    )}
                    {schedule.year && (
                        <div className="flex items-start gap-2">
                            <CalendarRange className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Year:</h1>
                                <p>{schedule.year}</p>
                            </div>
                        </div>
                    )}
                    <div className='grid mt-8 space-y-4'>
                        <Button onClick={handleViewDialogClicked} variant={'outline'} className='w-full'>
                            View
                        </Button>
                        <Button variant={'outline'}>
                            Export
                        </Button>
                    </div>
                </div>
                <ViewScheduleHistoryDialog 
                    open={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    schedule={schedule}
                />
                
            </DialogContent>
        </Dialog>
    );
}
