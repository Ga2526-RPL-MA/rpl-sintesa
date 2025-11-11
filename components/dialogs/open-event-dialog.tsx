'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Schedule } from '@/lib/mockScheduleData';
import { Separator } from '../ui/separator';
import { Clock12, Clock3, MapPin, User } from 'lucide-react';

interface ScheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: Schedule;
}

export default function ScheduleDialog({
    open,
    onOpenChange,
    event,
}: ScheduleDialogProps) {
    if (!event) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-primary">
                            {event.course.name}
                        </DialogTitle>
                        {event.course.code && (
                            <h1 className="text-primary">
                                {event.course.code}
                            </h1>
                        )}
                    </div>
                    <Separator />
                </DialogHeader>
                <div className="space-y-3 p-1 text-sm">
                    {event.room && (
                        <div className="flex items-start gap-2">
                            <MapPin className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Room:</h1>
                                <p>{event.room.name}</p>
                            </div>
                        </div>
                    )}
                    {event.lecturer && (
                        <div className="flex items-start gap-2">
                            <User className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Lecturer:</h1>
                                <p>{event.lecturer.name}</p>
                            </div>
                        </div>
                    )}
                    {event.startHour && (
                        <div className="flex items-start gap-2">
                            <Clock12 className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Start Time:</h1>
                                <p>{event.startHour}</p>
                            </div>
                        </div>
                    )}
                    {event.endHour && (
                        <div className="flex items-start gap-2">
                            <Clock3 className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">End Time:</h1>
                                <p>{event.endHour}</p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
