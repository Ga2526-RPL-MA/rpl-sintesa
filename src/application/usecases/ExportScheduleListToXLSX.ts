import * as ExcelJS from 'exceljs';
import ExportScheduleListToXLSXDTO from '../dto/ExportScheduleListToXLSXDTO';

export default async function ExportScheduleListToXLSX(dto: ExportScheduleListToXLSXDTO, outputPath: string): Promise<string>{
    try {
        let formattedHourList = [];
        for(let i = 0; i < dto.hourList.length-1; i+=2){
            formattedHourList.push(`${dto.hourList[i]}-${dto.hourList[i+1]}`);
        }
        let hourColumnValues = ['Jam'];
        for(let i = 0; i < dto.weekDayList.length; i++){
            hourColumnValues.push(...formattedHourList.map(hour => hour));
            if (i < dto.weekDayList.length - 1) {
                hourColumnValues.push('');
            }
        }

        const workbook = new ExcelJS.Workbook();

        workbook.title = `Schedule List ${dto.scheduleList.semester} ${dto.scheduleList.year}`
        workbook.creator = 'Shintesa-Team';
        workbook.lastModifiedBy = 'Shintesa-Team';
        workbook.created = new Date();

        const worksheet = workbook.addWorksheet(`${dto.scheduleList.semester} ${dto.scheduleList.year.replace('/','-')}`);
        (await worksheet).views = [{
            state: 'frozen',
            ySplit:1,
        }];
        // Column Header
        const colHeader = worksheet.getRow(1);
        colHeader.font = {
            bold: true,
            color: {
                argb: `ffffffff`
            },
        }
        colHeader.fill = {
            type: 'pattern',
            pattern: 'solid',
            bgColor: {
                argb: `00000000`
            },
        }
        colHeader.alignment = {
            horizontal: 'center',
            vertical: 'middle',
            wrapText: true
        }
        // Header
        worksheet.columns = [
            { header: 'Hari', key: 'hari' },
            { header: 'Jam', key: 'jam' },
            ...dto.roomList.map((room) => {
                return {
                    header: room.name,
                    key: `room=${room.id}`,
                }})
        ]

        // Hari
        for(let i = 0; i < dto.weekDayList.length; i++){
            let startCell = `A${2+i+formattedHourList.length*i}`;
            let endCell = `A${2+i+formattedHourList.length*(i+1)-1}`;
            worksheet.mergeCells(`${startCell}:${endCell}`);

            let cell = worksheet.getCell(`${startCell}`);
            cell.value = dto.weekDayList[i];
            if(cell.value === ''){
                // turn the whole row to black
            }
            cell.font = {
                bold: true,
            }
            cell.alignment = {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
            }
        }
        // Jam
        const hourCol = worksheet.getColumn('jam');
        hourCol.values = hourColumnValues
        hourCol.width = 13;
        hourCol.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true
        }
        // Ruangan
        for(let i = 0; i < dto.roomList.length; i++){
            let col = worksheet.getColumn(`room=${dto.roomList[i].id}`);
            col.width = 30;
            col.alignment = {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
            }
        }
        // Schedule
        dto.scheduleList.schedules.map((schedule) => {
            for(let i = 0; i < dto.weekDayList.length; i++){
                if(dto.weekDayList[i] === schedule.weekDay){
                    for(let j = 0; j < formattedHourList.length; j++){
                        if(formattedHourList[j].includes(schedule.startHour)){
                            for(let k = 0; k < dto.roomList.length; k++){
                                if(dto.roomList[k].name === schedule.room.name){
                                    let row = 2+i+j+formattedHourList.length*i;
                                    let col = 3+k;

                                    let cell = worksheet.getCell(row, col);
                                    cell.value = schedule.course.name;
                                    
                                    cell = worksheet.getCell(row+1, col);
                                    cell.value = `${schedule.course.sks} SKS / ${schedule.lecturer.name}`;
                                }
                            }
                        }
                    }
                }
            }
        })

        const fileName = `${Date.now()}.xlsx`;
        const filePath = outputPath+fileName;

        await workbook.xlsx.writeFile(filePath);

        return filePath;
    } catch(error) {
        throw new Error(error instanceof Error? error.message : `Error: ExportCSVToXLSX()`);
    }
}

// TODO: return a file that automatically downloaded