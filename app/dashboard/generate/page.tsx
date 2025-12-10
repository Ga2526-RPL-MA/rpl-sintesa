'use client';
import GenerateScheduleTable from '@/components/generate/generate-schedule-tab';

function Page() {
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
