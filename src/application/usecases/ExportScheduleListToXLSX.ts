import * as ExcelJS from 'exceljs';
import ExportScheduleListToXLSXDTO from '../dto/ExportScheduleListToXLSXDTO';
import ArgbColors from '../enums/ArgbColors';

export default async function ExportScheduleListToXLSX(
    dto: ExportScheduleListToXLSXDTO,
): Promise<{ buffer: ExcelJS.Buffer; fileName: string }> {
    try {
        const formattedHourList = [];
        for (let i = 0; i < dto.hourList.length - 1; i += 2) {
            formattedHourList.push(`${dto.hourList[i]}-${dto.hourList[i + 1]}`);
        }
        const hourColumnValues = ['Jam'];
        for (let i = 0; i < dto.weekDayList.length; i++) {
            hourColumnValues.push(...formattedHourList);
            if (i < dto.weekDayList.length - 1) {
                hourColumnValues.push('');
            }
        }

        const workbook = new ExcelJS.Workbook();

        workbook.title = `Schedule List ${dto.scheduleList.semester} ${dto.scheduleList.year}`;
        workbook.creator = 'Shintesa-Team';
        workbook.lastModifiedBy = 'Shintesa-Team';
        workbook.created = new Date();

        const worksheet = workbook.addWorksheet(
            `${dto.scheduleList.semester} ${dto.scheduleList.year}`,
        );
        (await worksheet).views = [
            {
                state: 'frozen',
                xSplit: 2,
                ySplit: 1,
            },
        ];

        // First Row Header
        const firstRowHeader = worksheet.getRow(1);
        firstRowHeader.height = 30;
        firstRowHeader.font = {
            bold: true,
            color: {
                argb: ArgbColors.White,
            },
            size: 12,
        };
        fillSolid(firstRowHeader, ArgbColors.Black);
        alignWrapCenter(firstRowHeader);

        // Header Value
        worksheet.columns = [
            { header: 'Hari', key: 'hari' },
            { header: 'Jam', key: 'jam' },
            ...dto.roomList.map((room) => {
                return {
                    header: room.name,
                    key: `room=${room.id}`,
                };
            }),
        ];

        // Week Days
        for (let i = 0; i < dto.weekDayList.length; i++) {
            const startRow = 2 + i + formattedHourList.length * i;
            const endRow = 2 + i + formattedHourList.length * (i + 1) - 1;
            worksheet.mergeCells(`A${startRow}:A${endRow}`);

            const cell = worksheet.getCell(`A${startRow}`);
            cell.value = dto.weekDayList[i];
            cell.font = {
                bold: true,
            };
            alignWrapCenter(cell);

            const dividerRow = worksheet.getRow(endRow + 1);
            fillSolid(dividerRow, ArgbColors.Black);
        }

        // Hours
        const hourRows = worksheet.getColumn('jam');
        hourRows.values = hourColumnValues;
        hourRows.width = 15;
        alignWrapCenter(hourRows);

        // Rooms
        dto.roomList.forEach((room) => {
            const col = worksheet.getColumn(`room=${room.id}`);
            col.width = 30;
            alignWrapCenter(col);
        });

        // Schedules
        dto.scheduleList.schedules.forEach((schedule) => {
            const weekDayIndex = dto.weekDayList.findIndex(
                (day) => day === schedule.weekDay,
            );
            if (weekDayIndex === -1)
                throw new Error(`Week day for ${schedule.id} not found.`);

            const hourIndex = dto.hourList.findIndex((hour) =>
                hour.includes(schedule.startHour),
            );
            if (hourIndex === -1)
                throw new Error(`Start hour for ${schedule.id} not found.`);

            const roomIndex = dto.roomList.findIndex(
                (room) => room.name === schedule.room.name,
            );
            if (roomIndex === -1)
                throw new Error(
                    `Room name for ScheduleID: ${schedule.id} not found.`,
                );

            const row =
                2 +
                weekDayIndex +
                hourIndex +
                formattedHourList.length * weekDayIndex;
            const col = 3 + roomIndex;

            fillScheduleCell(
                worksheet,
                row,
                col,
                schedule.course.name,
                schedule.course.sks,
                schedule.lecturer.name,
            );
        });

        return {
            buffer: await workbook.xlsx.writeBuffer(),
            fileName: `${Date.now()}.xlsx`,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : `Error: ExportScheduleListToXLSX()`,
        );
    }
}

function fillScheduleCell(
    worksheet: ExcelJS.Worksheet,
    row: number,
    col: number,
    courseName: string,
    courseSks: number,
    lecturerName: string,
): void {
    // (Course name)
    let cell = worksheet.getCell(row, col);
    cell.value = courseName;
    fillSolid(cell, ArgbColors.BabyBlue);
    setBorder(cell, {
        top: { style: 'medium' },
        left: { style: 'medium' },
        bottom: { style: 'thin' },
        right: { style: 'medium' },
    });

    // (SKS / Lecturer)
    cell = worksheet.getCell(row + 1, col);
    cell.value = `${courseSks} SKS / ${lecturerName}`;
    fillSolid(cell, ArgbColors.BabyBlue);
    setBorder(cell, {
        left: { style: 'medium' },
        bottom: { style: 'medium' },
        right: { style: 'medium' },
    });
    // TODO: sesuaikan warna cell matkul dengan semesternya
}

function fillSolid(
    target: ExcelJS.Cell | ExcelJS.Row | ExcelJS.Column,
    colorArgb: string,
): void {
    target.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
            argb: colorArgb,
        },
    };
}

function setBorder(
    target: ExcelJS.Cell | ExcelJS.Row | ExcelJS.Column,
    sides: Partial<ExcelJS.Borders> = {},
): void {
    target.border = sides;
}

function alignWrapCenter(
    target: ExcelJS.Cell | ExcelJS.Row | ExcelJS.Column,
): void {
    target.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
    };
}
