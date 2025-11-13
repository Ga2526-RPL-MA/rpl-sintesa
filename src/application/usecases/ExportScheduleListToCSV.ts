import ScheduleList from '@/src/domain/entities/ScheduleList';
import { json2csv } from 'json-2-csv';
import { flatten } from 'flat';
import toPublicScheduleList from '../mappers/toPublicScheduleList';

export default async function ExportScheduleListToCSV(scheduleList: ScheduleList): Promise<{csvContent: string, fileName: string}>{
    try {
        const publicScheduleList = toPublicScheduleList(scheduleList)
        const flattenObj = publicScheduleList.schedules.map((schedule) => {
            return flatten({
                semester: publicScheduleList.semester,
                year: publicScheduleList.year,
                ...schedule
            })
        });

        return { 
            csvContent: json2csv(flattenObj as Object[]), 
            fileName: `${Date.now()}.csv` 
        };
    } catch(error) {
        throw new Error(error instanceof Error? error.message : `Error: ExportScheduleListToCSV()`);
    }
}