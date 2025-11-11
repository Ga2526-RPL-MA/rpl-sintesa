'use client';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import ScheduleDialog from './dialogs/open-schedule-generate-dialog';
import { EventClickArg } from '@fullcalendar/core/index.js';
import Schedule from '@/src/domain/entities/Schedule';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import { cn } from '@/lib/utils';

export default function ScheduleCalendar({
    scheduleData,
    className,
}: {
    scheduleData?: ScheduleList | undefined;
    className?: string;
}) {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>();
    const [eventOpen, setEventOpen] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const data: Schedule[] = scheduleData?.schedules || [];

            // Map weekdays to numbers (0 = Sunday, 1 = Monday, ...)
            const getDayNumber = (day: string) =>
                ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'].indexOf(day);

            const weekEvents = data.map((d) => ({
                title: d.course.name,
                daysOfWeek: [getDayNumber(d.weekDay)],
                startTime: d.startHour,
                endTime: d.endHour,
                extendedProps: {
                    room: d.room,
                    courseCode: d.course.code,
                    data: d,
                },
            }));

            setEvents(weekEvents);
            console.log(weekEvents);
        }, 300); // delay in ms

        return () => clearTimeout(timeout); // cleanup if scheduleData changes quickly
    }, [scheduleData]);

    const renderEventContent = (info: any) => {
        const { event } = info;
        const room = event.extendedProps.room?.name;
        return (
            <div className="space-y-1">
                <div className="p-0.5">
                    <div className="truncate font-semibold">{event.title}</div>
                    <div className="truncate text-xs">
                        {event.extendedProps.courseCode}
                    </div>
                </div>
                {room && (
                    <div className="truncate text-xs opacity-70">{room}</div>
                )}
            </div>
        );
    };

    const handleEventClick = (info: EventClickArg) => {
        const scheduleData = info.event.extendedProps.data as Schedule;
        setSelectedEvent(scheduleData);
        setEventOpen(true);
    };
    return (
        <div className={cn(className, 'overflow-y-auto bg-transparent')}>
            <FullCalendar
                viewClassNames={'w-full overflow-x-hidden'}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                editable={false}
                selectable={false}
                headerToolbar={false}
                slotMinTime="07:00:00"
                slotMaxTime="17:30:00"
                hiddenDays={[0, 6]}
                expandRows={true}
                eventContent={renderEventContent}
                events={events}
                eventClick={handleEventClick}
                eventColor="var(--primary)"
                eventBorderColor="var(--primary)!"
                displayEventTime={true}
                height="100%"
                dayHeaderFormat={{ weekday: 'long' }}
                titleFormat={() => ''}
                nowIndicator={false}
                eventOverlap={(a, b) => {
                    // tell FC these events "overlap" only if start or end differ
                    return (
                        a.start?.getTime() !== b?.start?.getTime() ||
                        a.end?.getTime() !== b?.end?.getTime()
                    );
                }}
                eventClassNames={(arg) => {
                    return 'brightness-90! hover:brightness-100! transition-transform p-1 cursor-pointer';
                }}
            />
            <ScheduleDialog
                open={eventOpen}
                onOpenChange={setEventOpen}
                event={selectedEvent}
            />
        </div>
    );
}
