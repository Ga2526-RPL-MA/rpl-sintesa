'use client';
import ScheduleCalendar from '@/components/schedule-calendar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import { useState } from 'react';
import axios from 'axios';
import Semester from '@/src/domain/enums/Semester';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/dialogs/confirm-generation-dialog';
import { Spinner } from '@/components/ui/spinner';

function Page() {
    const [showDialog, setShowDialog] = useState(false);
    const [scheduleListData, setScheduleListData] = useState<
        ScheduleList | undefined
    >(undefined);
    const [semester, setSemester] = useState<Semester | undefined>(undefined);
    const [year, setYear] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
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
        var yearList = [];
        let now = new Date(Date.now()).getFullYear();
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
            setIsLoading(false);
            toast.success('Schedule generated successfully');
        } catch (err) {
            console.error('Error generating schedule:', err);
            toast.error('Failed to generate schedule');
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 grid-rows-[minmax(4rem,auto)_1fr_auto] items-center space-y-5 self-center">
                <div className="mx-auto space-x-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-35">
                                {semester ? semester : 'Select Semester'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Select Semesters
                            </DropdownMenuLabel>
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
                            <Button className="w-35">
                                {year ? year : 'Select Year'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select Year</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {getYears().map((year) => (
                                <DropdownMenuItem onClick={() => setYear(year)}>
                                    {year}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <div className="h-[65vh] overflow-hidden md:h-full">
                        <div className="h-full w-full overflow-auto">
                            <div className="min-w-[900px]">
                                <ScheduleCalendar
                                    scheduleData={scheduleListData}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Button
                        disabled={!semester && isLoading}
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
                    onConfirm={generateSchedule}
                    title="Confirm Schedule Generation"
                />
            </div>
        </>
    );
}

export default Page;
