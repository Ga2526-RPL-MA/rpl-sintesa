'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';
import { CalendarDays, CalendarFold, CalendarRange } from 'lucide-react';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import ViewScheduleHistoryDialog from './view-schedule-history-dialog';
import ExportDropdown from '../export/export-dropdown';

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

    function handleViewDialogClicked() {
        setViewDialogOpen(true);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-primary">
                            Schedule - {schedule.id}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Schedule details dialog
                        </DialogDescription>
                    </div>
                    <Separator />
                </DialogHeader>
                <div className="space-y-3 p-1 text-sm">
                    {schedule.createdAt && (
                        <div className="flex items-start gap-2">
                            <CalendarDays className="text-muted-foreground mt-1" />
                            <div>
                                <span className="font-bold">Generated on:</span>
                                {schedule.createdAt && (
                                    <h1 className="">
                                        {new Date(
                                            schedule.createdAt,
                                        ).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}{' '}
                                        at{' '}
                                        {new Date(
                                            schedule.createdAt,
                                        ).toLocaleTimeString(undefined, {
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
                            <CalendarFold className="text-muted-foreground mt-1" />
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
                    <div className="mt-8 grid space-y-4">
                        <Button
                            onClick={handleViewDialogClicked}
                            variant={'outline'}
                            className="w-full"
                        >
                            View
                        </Button>
                        <ExportDropdown scheduleId={schedule.id}>
                            <Button variant={'outline'}>Export</Button>
                        </ExportDropdown>
                    </div>
                </div>
                <ViewScheduleHistoryDialog
                    open={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    scheduleList={schedule}
                />
            </DialogContent>
        </Dialog>
    );
}
