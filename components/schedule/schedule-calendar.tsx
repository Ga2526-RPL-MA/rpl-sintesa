'use client';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react';
import ScheduleDialog from '../dialogs/schedule-detail-dialog';
import { EventChangeArg, EventClickArg } from '@fullcalendar/core/index.js';
import Schedule from '@/src/domain/entities/Schedule';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import { cn } from '@/lib/utils';
import WeekDay from '@/src/domain/enums/WeekDay';
import { IndexToWeekDay, WeekDaysIndexRecord } from '@/src/shared/helper/enumHelper';
import { toast } from 'sonner';
import Hour from '@/src/domain/enums/Hour';

export default function ScheduleCalendar({
    scheduleData,
    className,
    updatedSchedule
}: {
    scheduleData?: ScheduleList | undefined;
    className?: string;
    updatedSchedule: (updated: Schedule) => void
}) {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>();
    const [eventOpen, setEventOpen] = useState(false);
    const [localScheduleList, setLocalScheduleList] = useState<ScheduleList | undefined>()

    
    useEffect(() => {
        setLocalScheduleList(scheduleData)
    },[scheduleData])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const data: Schedule[] = scheduleData?.schedules || [];
            console.log(scheduleData)
            const weekEvents = data.map((d) => ({
                title: d.course.name,
                daysOfWeek: [WeekDaysIndexRecord[d.weekDay]],
                startTime: d.startHour,
                endTime: d.endHour,
                extendedProps: {
                    room: d.room,
                    lecturer: d.lecturer,
                    courseCode: d.course.code,
                    data: d,
                },
            }));

            setEvents(weekEvents);
            console.log(weekEvents);
        }, 300); // delay in ms

        return () => clearTimeout(timeout); // cleanup if scheduleData changes quickly
    }, [scheduleData]);

    function handleLocalViewUpdate(updated: Schedule) {

        console.log(updated)

        //UI Optimistic update 
        setEvents((prev) =>
            prev.map((e) => {
            const data = e.extendedProps.data as Schedule;
            if (data.id === updated.id) {
                return {
                    ...e,
                    title: updated.course.name,
                    daysOfWeek: [WeekDaysIndexRecord[updated.weekDay]],
                    startTime: updated.startHour,
                    endTime: updated.endHour,
                    extendedProps: {
                        ...e.extendedProps,
                        room: updated.room,
                        lecturer: updated.lecturer,
                        data: updated,
                    },
                };
            }
            return e;
            })
        );

        // update local schedule list for conflict checks
        setLocalScheduleList((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                schedules: prev.schedules.map((s) =>
                    s.id === updated.id ? updated : s
                ),
            };
        });
        updatedSchedule(updated)
        console.log(localScheduleList)
    }
    const renderEventContent = (info: EventChangeArg) => {
        const { event } = info;
        const room = event.extendedProps.room?.name;
        return (
            <div className="space-y-1 overflow-hidden">
                <div className="p-0.5">
                    <div className='text-[0.6rem] truncate'>
                        {event.start?.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                        })} - {event.end?.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                        })}
                    </div>
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

    const handleEventChanged = (info: EventChangeArg) => {
        const changedEvent = info.event._def.extendedProps.data as Schedule;

        const start = info.event.start;
        const end = info.event.end;

        if (!start || !end) return; // safety guard

        const newDay = start.getDay();

        const newStartTime = start.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const newEndTime = end.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const updated: Schedule = {
            ...changedEvent,
            startHour: newStartTime as Hour,
            endHour: newEndTime as Hour,
            weekDay: IndexToWeekDay[newDay], 
        };

        info.event.setExtendedProp('data', updated);

        info.event.setStart(start);
        info.event.setEnd(end);

        setLocalScheduleList((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                schedules: prev.schedules.map((s) =>
                    s.id === updated.id ? updated : s
                ),
            };
        });

        updatedSchedule(updated)
        console.log(updated);
    }

    return (
        <div className={cn(className, 'bg-transparent')}>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                editable={true}
                eventDurationEditable={true}
                headerToolbar={false}
                slotMinTime="07:00:00"
                slotMaxTime="20:30:00"
                hiddenDays={[0, 6]}
                expandRows={true}
                viewHeight="100%"
                height="auto"
                eventDrop={handleEventChanged}
                eventResize={handleEventChanged}
                eventContent={renderEventContent}
                events={events}
                eventClick={handleEventClick}
                eventColor="var(--primary)"
                eventBorderColor="var(--primary)!"
                displayEventTime={true}
                stickyHeaderDates={false}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                handleWindowResize={true}
                eventAllow={(dropInfo) => {
                    const startTime = dropInfo.start.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    const endTime = dropInfo.end.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    
                    if (startTime < '07:00' || startTime > '20:00'){
                        return false
                    }
                    if (endTime < '07:00' || endTime > '20:00'){
                        return false
                    }
                    if (dropInfo.start.getDay() !== dropInfo.end.getDay()){
                        return false
                    }
                    return true
                }}
                dayHeaderFormat={{ weekday: 'long' }}
                titleFormat={() => ''}
                eventOverlap={(a, b) => {
                    // Allow overlap only if rooms are different (or if either event has no room)
                    const roomA = a.extendedProps.room?.name || a.extendedProps.room;
                    const roomB = b?.extendedProps.room?.name || b?.extendedProps.room;
                    
                    const lecturerA = a.extendedProps.lecturer?.name || a.extendedProps.lecturer
                    const lecturerB = b?.extendedProps.lecturer?.name || b?.extendedProps.lecturer
                    // Return true to allow overlap, false to prevent it
                    if (roomA == roomB) toast.error('Overlapping schedule with the same room!');
                    if (lecturerA == lecturerB) toast.error('Overlapping schedule with the same lecturer!')

                    return roomA !== roomB && lecturerA !== lecturerB
                }}
                eventClassNames={(arg) => {
                    return 'brightness-90! hover:brightness-100! transition-transform p-1 cursor-pointer';
                }}
            />
            <ScheduleDialog
                open={eventOpen}
                onOpenChange={setEventOpen}
                event={selectedEvent}
                onDialogUpdate={handleLocalViewUpdate}
                scheduleList={localScheduleList}
            />
        </div>
    );
}
