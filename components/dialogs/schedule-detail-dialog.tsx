'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Schedule from '@/src/domain/entities/Schedule';
import { Separator } from '../ui/separator';
import {
    CalendarFold,
    ClipboardList,
    Clock12,
    Clock3,
    MapPin,
    User,
} from 'lucide-react';
import { weekDaysEngRecord } from '@/src/shared/helper/enumHelper';
import { useEffect, useState } from 'react';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import Room from '@/src/domain/entities/Room';
import Lecturer from '@/src/domain/entities/Lecturer';
import WeekDay from '@/src/domain/enums/WeekDay';
import { Button } from '../ui/button';
import { ComboBoxResponsive } from '../combobox';
import axios from 'axios';
import Hour from '@/src/domain/enums/Hour';
import { Input } from '../ui/input';
import { toast } from 'sonner';

interface ScheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDialogUpdate: (schedule: Schedule) => void;
    event: Schedule;
    scheduleList: ScheduleList | undefined;
}

export default function ScheduleDialog({
    open,
    onOpenChange,
    onDialogUpdate,
    event,
    scheduleList,
}: ScheduleDialogProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [lecturerList, setLecturerList] = useState<Lecturer[]>([]);

    // Fix: Initialize with null instead of undefined
    const [room, setRoom] = useState<Room | null>(null);
    const [lecturer, setLecturer] = useState<Lecturer | null>(null);
    const [weekDay, setWeekDay] = useState<WeekDay | null>(null);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    console.log(event);
    // Remove unused weekDayList state
    const weekDayOptions = [
        { value: 'Monday', label: 'Monday', data: WeekDay.SENIN },
        { value: 'Tuesday', label: 'Tuesday', data: WeekDay.SELASA },
        { value: 'Wednesday', label: 'Wednesday', data: WeekDay.RABU },
        { value: 'Thursday', label: 'Thursday', data: WeekDay.KAMIS },
        { value: 'Friday', label: 'Friday', data: WeekDay.JUMAT },
    ];

    function clampTime(time: string, min = '07:00', max = '20:00'): string {
        if (time < min) {
            toast.error('Time is less than minimum: 07:00');
            return min;
        }
        if (time > max) {
            toast.error('Time exceeded maximum: 08:00');
            return max;
        }
        return time;
    }

    function roundToInterval(
        time: string,
        intervalMinutes: number = 10,
    ): string {
        const [hours, minutes] = time.split(':').map(Number);
        const roundedMinutes =
            Math.round(minutes / intervalMinutes) * intervalMinutes;

        // Handle rounding to 60 (next hour)
        if (roundedMinutes === 60) {
            return `${String(hours + 1).padStart(2, '0')}:00`;
        }

        return `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
    }

    useEffect(() => {
        async function getDatas() {
            try {
                const [roomResponse, lecturerResponse] = await Promise.all([
                    axios.get<Room[]>('/api/rooms', { withCredentials: true }),
                    axios.get<Lecturer[]>('/api/lecturers', {
                        withCredentials: true,
                    }),
                ]);

                setRoomList(roomResponse.data);
                setLecturerList(lecturerResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        if (event) {
            setStartTime(event.startHour);
            setEndTime(event.endHour);
        }
        getDatas();
    }, [event, onOpenChange]);

    useEffect(() => {
        if (!isEditing) return;

        const changed =
            (weekDay !== null && weekDay !== event.weekDay) ||
            (lecturer !== null && lecturer.id !== event.lecturer?.id) ||
            (room !== null && room.id !== event.room?.id) ||
            startTime !== event.startHour ||
            endTime !== event.endHour;

        setHasUnsavedChanges(changed);
    }, [weekDay, lecturer, room, startTime, endTime, event, isEditing]);

    // Helper function to check if two time ranges overlap
    function timesOverlap(
        start1: string,
        end1: string,
        start2: string,
        end2: string,
    ): boolean {
        // Two time ranges overlap if:
        // start1 < end2 AND end1 > start2
        return start1 < end2 && end1 > start2;
    }

    function handleSave() {
        if (endTime < startTime) {
            toast.error('Start and end times are invalid!');
            return;
        }

        console.log(scheduleList);
        // Check for overlaps with other schedules
        const hasOverlap = scheduleList?.schedules.some((schedule) => {
            // Skip checking against itself
            if (schedule.id === event.id) return false;

            // Only check schedules on the same day
            const checkWeekDay = weekDay ?? event.weekDay;
            if (schedule.weekDay !== checkWeekDay) return false;

            // Check if lecturer overlaps (if lecturer changed)
            const checkLecturer = lecturer ?? event.lecturer;
            if (checkLecturer && schedule.lecturer?.id === checkLecturer.id) {
                // Check time overlap
                if (
                    timesOverlap(
                        startTime,
                        endTime,
                        schedule.startHour,
                        schedule.endHour,
                    )
                ) {
                    toast.error(
                        `Lecturer ${checkLecturer.name} is already scheduled at this time`,
                    );
                    return true;
                }
            }

            // Check if room overlaps (if room changed)
            const checkRoom = room ?? event.room;
            if (checkRoom && schedule.room?.id === checkRoom.id) {
                // Check time overlap
                if (
                    timesOverlap(
                        startTime,
                        endTime,
                        schedule.startHour,
                        schedule.endHour,
                    )
                ) {
                    toast.error(
                        `Room ${checkRoom.name} is already booked at this time`,
                    );
                    return true;
                }
            }

            return false;
        });

        if (hasOverlap) return;

        const updatedEvent: Schedule = {
            ...event,
            weekDay: weekDay ?? event.weekDay,
            startHour: startTime as Hour,
            endHour: endTime as Hour,
            lecturer: lecturer ?? event.lecturer,
            room: room ?? event.room,
        };

        // Update via api
        //const response = await axios.patch/put based on schedule id

        onDialogUpdate(updatedEvent);
        onOpenChange(false);
    }

    if (!event) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
                if (!value) {
                    setIsEditing(false);
                    setLecturer(null);
                    setRoom(null);
                    setWeekDay(null);
                    setStartTime(event.startHour);
                    setEndTime(event.endHour);
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-primary">
                            {event.course.name}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Schedule details dialog
                        </DialogDescription>
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
                                {isEditing ? (
                                    <div className="mt-2">
                                        <ComboBoxResponsive<Room>
                                            options={roomList.map((room) => ({
                                                value: room.name,
                                                label: room.name,
                                                data: room,
                                            }))}
                                            placeholder={event.room.name}
                                            value={room}
                                            onChange={setRoom}
                                        />
                                    </div>
                                ) : (
                                    <p>{event.room.name}</p>
                                )}
                            </div>
                        </div>
                    )}
                    {event.lecturer && (
                        <div className="flex items-start gap-2">
                            <User className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Lecturer:</h1>
                                {isEditing ? (
                                    <div className="mt-2">
                                        <ComboBoxResponsive<Lecturer>
                                            options={lecturerList.map(
                                                (lecturer) => ({
                                                    value: lecturer.name,
                                                    label: lecturer.name,
                                                    data: lecturer,
                                                }),
                                            )}
                                            placeholder={event.lecturer.name}
                                            value={lecturer}
                                            onChange={setLecturer}
                                        />
                                    </div>
                                ) : (
                                    <p>{event.lecturer.name}</p>
                                )}
                            </div>
                        </div>
                    )}
                    {event.course.sks && (
                        <div className="flex items-start gap-2">
                            <ClipboardList className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">SKS:</h1>
                                <p>{event.course.sks}</p>
                            </div>
                        </div>
                    )}
                    {event.weekDay && (
                        <div className="flex items-start gap-2">
                            <CalendarFold className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Day:</h1>
                                {isEditing ? (
                                    <div className="mt-2">
                                        <ComboBoxResponsive<WeekDay>
                                            options={weekDayOptions}
                                            placeholder={
                                                weekDaysEngRecord[event.weekDay]
                                            }
                                            value={weekDay}
                                            onChange={setWeekDay}
                                        />
                                    </div>
                                ) : (
                                    <p>{weekDaysEngRecord[event.weekDay]}</p>
                                )}
                            </div>
                        </div>
                    )}
                    {event.startHour && (
                        <div className="flex items-start gap-2">
                            <Clock12 className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Start Time:</h1>
                                {isEditing ? (
                                    <div className="mt-2">
                                        <Input
                                            type="time"
                                            id="time-picker"
                                            value={startTime}
                                            onChange={(e) =>
                                                setStartTime(e.target.value)
                                            }
                                            onBlur={(e) => {
                                                const clamped = clampTime(
                                                    e.target.value,
                                                );
                                                const rounded = roundToInterval(
                                                    clamped,
                                                    10,
                                                );
                                                setStartTime(rounded);
                                            }}
                                            step="600"
                                            min={'07:00'}
                                            max={'20:00'}
                                            className="bg-background appearance-none invalid:border-red-500 invalid:ring-red-500 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                    </div>
                                ) : (
                                    <p>{event.startHour}</p>
                                )}
                            </div>
                        </div>
                    )}
                    {event.endHour && (
                        <div className="flex items-start gap-2">
                            <Clock3 className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">End Time:</h1>
                                {isEditing ? (
                                    <div className="mt-2">
                                        <Input
                                            type="time"
                                            id="time-picker"
                                            value={endTime}
                                            onChange={(e) =>
                                                setEndTime(e.target.value)
                                            }
                                            onBlur={(e) => {
                                                const clamped = clampTime(
                                                    e.target.value,
                                                );
                                                const rounded = roundToInterval(
                                                    clamped,
                                                    10,
                                                );
                                                setEndTime(rounded);
                                            }}
                                            step="600"
                                            min={'07:00'}
                                            max={'20:00'}
                                            className="bg-background appearance-none invalid:border-red-500 invalid:ring-red-500 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                    </div>
                                ) : (
                                    <p>{event.endHour}</p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="justify-center space-y-0.5">
                        {/* {isEditing && (
                            <Button 
                                variant={'destructive'}
                                onClick={handleCancel}
                                className='w-full'
                            >
                                Cancel
                            </Button>
                        )} */}
                        <Button
                            variant={'outline'}
                            className="mt-2 w-full"
                            onClick={
                                isEditing
                                    ? handleSave
                                    : () => setIsEditing(true)
                            }
                            disabled={isEditing && !hasUnsavedChanges}
                        >
                            {isEditing ? 'Confirm' : 'Edit'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
