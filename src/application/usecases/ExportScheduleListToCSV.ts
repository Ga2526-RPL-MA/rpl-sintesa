import ScheduleList from '@/src/domain/entities/ScheduleList';
import { json2csv } from 'json-2-csv';
import { flatten } from 'flat';
import * as fs from 'fs';
import toPublicScheduleList from '../mappers/toPublicScheduleList';

export default async function ExportScheduleListToCSV(scheduleList: ScheduleList, outputPath: string): Promise<{csvContent: string, filePath: string}>{
    try {
        const publicScheduleList = toPublicScheduleList(scheduleList)
        const flattenObj = publicScheduleList.schedules.map((schedule) => {
            return flatten({
                semester: publicScheduleList.semester,
                year: publicScheduleList.year,
                ...schedule
            })
        });
        
        const csvContent = json2csv(flattenObj as Object[]);
        
        const fileName = `${Date.now()}.csv`;
        const filePath = outputPath+fileName;

        fs.writeFileSync(filePath, csvContent);

        return { csvContent, filePath };
    } catch(error) {
        throw new Error(error instanceof Error? error.message : `Error: ExportScheduleListToCSV()`);
    }
}

// TODO: return a file that automatically downloaded