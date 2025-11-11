'use client';
import ScheduleCalendar from '@/components/schedule-calendar';
import { Button } from '@/components/ui/button';
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuItem

} from '@/components/ui/dropdown-menu';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import React, { useState } from 'react';
import axios from 'axios';
import Semester from '@/src/domain/enums/Semester';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/dialogs/confirm-generation-dialog';

function Page() {
    const [showDialog, setShowDialog] = React.useState(false);
    const [scheduleListData, setScheduleListData] = React.useState<ScheduleList | undefined>(undefined);
    const [semester, setSemester] = React.useState<Semester | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false)

    async function handleGenerateClick() {
        if (!semester) {
            toast.error('Please select a semester first');
            return;
        }

        if (scheduleListData) {
            setShowDialog(true);
            return;
        }

        await generateSchedule();
    }

    async function generateSchedule() {
        try {
            setIsLoading(true)
            const response = await axios.post<ScheduleList>(
                '/api/schedules',
                { semester: semester },
                { withCredentials: true }
            );
            setIsLoading(false)
            setScheduleListData(response.data);
            toast.success('Schedule generated successfully');
        } catch (err) {
            console.error('Error generating schedule:', err);
            toast.error('Failed to generate schedule');
        }
    }

    return (
        <>
            <div className="space-y-5">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        {semester ? semester : 'Select Semester'}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select Semesters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSemester(Semester.GASAL)}>GASAL</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSemester(Semester.GENAP)}>GENAP</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                <div>
                    <ScheduleCalendar 
                    scheduleData={scheduleListData}
                    className='h-[70vh] w-full' 
                    />
                </div>
                <div className="flex items-center justify-center">
                    <Button disabled={!semester} onClick={handleGenerateClick}>
                        Generate
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
