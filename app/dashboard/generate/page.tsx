'use client';
import ScheduleCalendar from '@/components/schedule/schedule-calendar';
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
import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import { Spinner } from '@/components/ui/spinner';
import GenerateScheduleTable from '@/components/generate/generate-schedule-tab';
import { year } from 'drizzle-orm/mysql-core';

function Page() {
    const [semester, setSemester] = useState<Semester | undefined>();
    const [year, setYear] = useState<string | undefined>('');

    function getYears() {
        const yearList = [];
        const now = new Date(Date.now()).getFullYear();
        for (let i = 0; i <= 3; i++) {
            yearList.push((now + i).toString());
        }
        return yearList;
    }

    return (
        <div className="flex h-full flex-col">
            <div className="mb-4 space-y-1">
                <h1 className="flex text-2xl font-bold">Generate Schedule</h1>
                <p className="text-muted-foreground">
                    Pick the following{' '}
                    <span className="font-bold">semester</span> and{' '}
                    <span className="font-bold">year</span> to generate a
                    schedule, <br />
                    you can also rename, export, and save the schedule to be
                    stored in the history page.
                </p>
            </div>
            <div className="min-h-0 flex-1">
                <GenerateScheduleTable />
            </div>
        </div>
    );
}

export default Page;
