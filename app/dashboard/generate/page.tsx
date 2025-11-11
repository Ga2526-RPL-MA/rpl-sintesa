'use client'
import ScheduleCalendar from '@/components/schedule-calendar';
import { Button } from '@/components/ui/button';

function handleGenerateClick() {
    // Logic to generate a new schedule
    console.log('Generate New Schedule clicked');
}

function Page() {
    return(
    <>
    <div className="mt-5 space-y-5">
        <div>
            <ScheduleCalendar />
        </div>
        <div className='flex justify-center items-center'>
            <Button onClick={handleGenerateClick}>
                Generate New Schedule
            </Button>
        </div>
    </div>
    </>
  );
}

export default Page;
