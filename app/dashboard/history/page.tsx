import React from 'react';
import ScheduleHistoryList from '@/components/schedule-history-list';
function Page() {
    return (
        <div className="space-y-10">
            <div className="text-center text-xl">Generated Schedules</div>
            <ScheduleHistoryList />
        </div>
    );
}

export default Page;
