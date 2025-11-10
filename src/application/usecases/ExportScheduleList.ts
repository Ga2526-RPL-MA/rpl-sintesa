import ScheduleList from '@/src/domain/entities/ScheduleList';
import { json2csv } from 'json-2-csv'
import * as fs from 'fs';
import * as xlsx from 'xlsx'
import ExportType from '../enums/ExportType';

export default async function ExportScheduleListToCSV(scheduleList: ScheduleList, type: ExportType): Promise<any>{
    try {
        if(type === ExportType.CSV) {
            return json2csv([scheduleList]);
        } else if (type === ExportType.XLSX) {
            const csv = json2csv([scheduleList]);
            const arrayOfArrayCsv = csv.split("\n").map((row: string) => {
                return row.split(", ");
            })

            xlsx.set_fs(fs);
            if(!fs.existsSync('output/')){
                fs.mkdirSync('output/');
            }

            const workbook = xlsx.utils.book_new();
            const sheet = xlsx.utils.aoa_to_sheet(arrayOfArrayCsv);
            xlsx.utils.book_append_sheet(workbook, sheet, 'Schedule List');
            xlsx.writeFile(workbook, `output/${Date.now()}.xlsx`);
            return { message: 'Export to XLSX successful'};
        }
        throw new Error(`Export to type ${type} is not supported.`)
    } catch(error) {
        throw new Error(error instanceof Error? error.message : `Error: ExportScheduleListToCSV(${scheduleList})`);
    }
}