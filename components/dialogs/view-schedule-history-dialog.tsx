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
import { Button } from '../ui/button';
import Schedule from '@/src/domain/entities/Schedule';
import axios from 'axios';
import ConfirmDialog from './confirm-dialog';
import { Spinner } from '../ui/spinner';
import { toast } from 'sonner';

interface ViewScheduleHistoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    scheduleList: ScheduleList;
}

export default function ViewScheduleHistoryDialog({
    open,
    onOpenChange,
    scheduleList,
}: ViewScheduleHistoryDialogProps) {
    if (!scheduleList) return null;
    const [isLoading, setIsLoading] = useState(true);
    const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
    // Dirty schedule as in schedules that have been updated
    const [dirtySchedules, setDirtySchedules] = useState<Schedule[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    console.log(dirtySchedules);
    useEffect(() => {
        if (scheduleList) {
            setOriginalSchedules(scheduleList.schedules);
        }
    }, []);

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

    function handleUpdate(updated: Schedule) {
        if (originalSchedules.length === 0) return;

        console.log(updated);
        const original = originalSchedules.find((s) => s.id === updated.id);

        const isSame =
            original &&
            original.startHour === updated.startHour &&
            original.endHour === updated.endHour &&
            original.weekDay === updated.weekDay &&
            original.room?.id === updated.room?.id &&
            original.lecturer?.id === updated.lecturer?.id;

        if (isSame) {
            setDirtySchedules((prev) =>
                prev.filter((s) => s.id !== updated.id),
            );
            return;
        }

        setDirtySchedules((prev) => {
            const exists = prev.find((s) => s.id === updated.id);

            if (exists) {
                return prev.map((s) => (s.id === updated.id ? updated : s));
            }

            return [...prev, updated];
        });
    }

    async function handleSave() {
        try {
            setIsSaving(true);

            setIsSaving(false);
            setDirtySchedules([]);
        } catch (err) {}
        // Patch schedules[] into database based on id
        // const response = await axios
        //     .patch()
    }

    function handleConfirmClose() {
        onOpenChange(false);
        setDirtySchedules([]);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (isSaving) {
                    toast.info('Please wait until schedule is saved.');
                    return;
                }

                if (!value && dirtySchedules.length > 0) {
                    setOpenAlert(true);
                    return; // stop closing
                }

                onOpenChange(value);
                if (!value) {
                    setDirtySchedules([]);
                }
            }}
        >
            <DialogContent className="h-[80vh] min-w-[90vw] grid-rows-[auto_1fr]">
                <div className="flex items-center justify-between">
                    <DialogTitle>Schedule - {scheduleList.id}</DialogTitle>
                    <Button
                        className="mr-[2em]"
                        onClick={handleSave}
                        disabled={dirtySchedules.length === 0}
                    >
                        {isSaving ? (
                            <>
                                <Spinner />
                                Saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
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
                                    scheduleData={scheduleList}
                                    className="h-full w-full"
                                    updatedSchedule={handleUpdate}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
            <ConfirmDialog
                title="Confirm leave before saving changes"
                description="Are you sure you want to leave without saving changes?"
                open={openAlert}
                onOpenChange={setOpenAlert}
                onConfirm={handleConfirmClose}
            />
        </Dialog>
    );
}
