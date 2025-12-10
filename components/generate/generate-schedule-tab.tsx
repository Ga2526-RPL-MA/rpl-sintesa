import React, { useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useState } from 'react';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import Semester from '@/src/domain/enums/Semester';
import { toast } from 'sonner';
import axios from 'axios';
import ScheduleCalendar from '../schedule/schedule-calendar';
import { Spinner } from '../ui/spinner';
import ConfirmDialog from '../dialogs/confirm-dialog';
import ExportDropdown from '../export/export-dropdown';
import { customBreakpoint, useIsMobile } from '@/hooks/use-mobile';
import { Download, Save } from 'lucide-react';
import { Input } from '../ui/input';
import Schedule from '@/src/domain/entities/Schedule';

function GenerateScheduleTable({}) {
    const [showDialog, setShowDialog] = useState(false);
    const [scheduleListData, setScheduleListData] = useState<
        ScheduleList | undefined
    >();
    const [semester, setSemester] = useState<Semester | undefined>(undefined);
    const [year, setYear] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [scheduleName, setScheduleName] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [dirtySchedules, setDirtySchedules] = useState<Schedule[]>([]);
    const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
    const [newSchedule, setNewSchedule] = useState<ScheduleList>();
    console.log(dirtySchedules);
    async function handleGenerateClick() {
        if (isLoading) {
            return;
        }
        if (!semester) {
            toast.error('Please select a semester first');
            return;
        }

        if (!year) {
            toast.error('Please select a year first');
            return;
        }

        if (scheduleListData) {
            setShowDialog(true);
            return;
        }

        await generateSchedule();
    }

    function getYears() {
        const yearList = [];
        const now = new Date(Date.now()).getFullYear();
        for (let i = 0; i <= 3; i++) {
            yearList.push((now + i).toString());
        }
        return yearList;
    }

    async function generateSchedule() {
        try {
            setIsLoading(true);
            const response = await axios.post<ScheduleList>(
                '/api/schedules',
                { semester: semester },
                // Implement when api is updated to take year
                // { year: year },
                { withCredentials: true },
            );
            setScheduleListData(response.data);
            // for export to have fallback
            setNewSchedule(scheduleListData);
            setOriginalSchedules(response.data.schedules);
            setIsLoading(false);
            toast.success('Schedule generated successfully');
        } catch (err) {
            console.error('Error generating schedule:', err);
            toast.error('Failed to generate schedule');
        }
    }

    async function handleSave() {
        try {
            setIsSaving(true);
            //Save to db

            // setIsSaving(false);
            setIsSaving(false);
            setDirtySchedules([]);

            // TODO: Set new schedule to be used for
            // setNewSchedule(newScheduleList)
        } catch (err) {}
    }

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

    function handleConfirm() {
        generateSchedule();
        setDirtySchedules([]);
    }

    const isMobile = useIsMobile();
    const cstmBreakpoint1000px = customBreakpoint(1000);
    return (
        <div className="bg-background flex h-full flex-col rounded-2xl p-4">
            <div className="mb-5 grid w-full grid-cols-4 items-end gap-4 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-[1fr_1fr_4fr_1fr_1fr] lg:grid-rows-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} className="truncate">
                            {semester
                                ? semester
                                : cstmBreakpoint1000px
                                  ? 'Semester'
                                  : 'Select Semester'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select Semesters</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setSemester(Semester.GASAL)}
                        >
                            GASAL
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setSemester(Semester.GENAP)}
                        >
                            GENAP
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} className="truncate">
                            {year
                                ? year
                                : cstmBreakpoint1000px
                                  ? 'Year'
                                  : 'Select Year'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select Year</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {getYears().map((year) => (
                            <DropdownMenuItem
                                key={year}
                                onClick={() => setYear(year)}
                            >
                                {year}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* order 4 in lg: */}
                <ExportDropdown scheduleId={newSchedule?.id}>
                    <Button
                        variant={'outline'}
                        disabled={
                            !scheduleListData || dirtySchedules.length > 0
                        }
                        className="order-3 lg:order-4"
                    >
                        {isMobile ? <Download /> : 'Export'}
                    </Button>
                </ExportDropdown>

                {/* order last in lg: */}
                <Button
                    className="order-4 lg:order-5"
                    disabled={
                        !scheduleListData ||
                        isSaving ||
                        dirtySchedules.length == 0
                    }
                    onClick={handleSave}
                >
                    <>
                        {isSaving && <Spinner />}
                        {isMobile ? <Save /> : isSaving ? 'Saving...' : 'Save'}
                    </>
                </Button>

                {/* order 3 in lg: */}
                <div className="order-5 col-span-4 justify-self-center sm:col-span-4 lg:order-3 lg:col-span-1 lg:w-[20vw]">
                    <Input
                        disabled={!scheduleListData}
                        placeholder="optional (Schedule-id)"
                        className="rounded-2xl"
                        value={scheduleName}
                        onChange={(e) => setScheduleName(e.target.value)}
                    />
                </div>
            </div>
            {/* Schedule Container - ADD flex-1 min-h-0 here */}
            <div className="mb-2 flex min-h-0 flex-1 flex-col">
                <div className="overflow-auto rounded-2xl">
                    <div className="h-full min-w-[900px]">
                        <ScheduleCalendar
                            scheduleData={scheduleListData}
                            className="h-full w-full"
                            updatedSchedule={handleUpdate}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button
                    disabled={!semester || isLoading}
                    onClick={handleGenerateClick}
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            Generating...
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>
            </div>
            <ConfirmDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                onConfirm={handleConfirm}
                description={
                    <>
                        Are you sure you want to replace the generated schedule?
                        <br />
                        This action will replace the current schedule with a new
                        one, you can view the replaced schedule in the &quot;
                        <a
                            href="/dashboard/history"
                            className="text-primary hover:underline"
                        >
                            Schedules History
                        </a>
                        &quot; tab.
                    </>
                }
                title="Confirm Schedule Generation"
            />
        </div>
    );
}

export default GenerateScheduleTable;
