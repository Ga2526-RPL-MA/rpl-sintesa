import { useState } from 'react';
import { Card, CardDescription, CardTitle } from './ui/card';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleHistoryDialog from './dialogs/open-schedule-history-dialog';

function ScheduleHistoryCard({ schedule }: { schedule: ScheduleList }) {
    const [open, setOpen] = useState(false);

    async function handleScheduleClick() {
        setOpen(true);
    }
    return (
        <div>
            <Card
                onClick={handleScheduleClick}
                className="active:bg-primary/40 border-primary/30 bg-primary/10 hover:bg-primary/30 grid cursor-pointer grid-cols-1 items-center justify-between border p-4 px-6 lg:flex"
            >
                <CardTitle>Schedule - {schedule.id}</CardTitle>
                <h1>Semester - {schedule.semester}</h1>
                <CardDescription>
                    Generated on:{' '}
                    {new Date(schedule.createdAt).toLocaleDateString(
                        undefined,
                        {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        },
                    )}{' '}
                    at{' '}
                    {new Date(schedule.createdAt).toLocaleTimeString(
                        undefined,
                        {
                            hour: '2-digit',
                            minute: '2-digit',
                        },
                    )}
                </CardDescription>
            </Card>
            <ScheduleHistoryDialog
                open={open}
                onOpenChange={setOpen}
                schedule={schedule}
            />
        </div>
    );
}

export default ScheduleHistoryCard;
