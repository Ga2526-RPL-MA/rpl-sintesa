'use client';
import React, { use, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleHistoryCard from './schedule-history-card';
import { HistoryListSkeleton } from '../history-list-skeleton';
import { toast } from 'sonner';
import axios from 'axios';

function ScheduleHistoryList() {
    const [scheduleHistory, setScheduleHistory] = React.useState<
        ScheduleList[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchScheduleHistory() {
        try {
            setIsLoading(true);
            const response = await axios.get<ScheduleList[]>('/api/schedules', {
                withCredentials: true,
            });
            setIsLoading(false);
            toast.success('Fetched history sucessfully');
            return response.data;
        } catch (err) {
            console.error('Error fetching schedule history:', err);
            return [];
        }
    }

    React.useEffect(() => {
        async function loadHistory() {
            const history = await fetchScheduleHistory();
            setScheduleHistory(history);
        }
        loadHistory();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="h-[70vh] p-2">
                    <HistoryListSkeleton />
                </div>
            ) : (
                <div className="h-[70vh] space-y-2 overflow-y-auto p-2">
                    {scheduleHistory.map((scheduleList, index) => (
                        <ScheduleHistoryCard
                            key={index}
                            schedule={scheduleList}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScheduleHistoryList;
