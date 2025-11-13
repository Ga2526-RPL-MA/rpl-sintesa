import ExportScheduleListToXLSXDTO from "@/src/application/dto/ExportScheduleListToXLSXDTO";
import ExportType from "@/src/application/enums/ExportType";
import ExportScheduleListToCSV from "@/src/application/usecases/ExportScheduleListToCSV";
import ExportScheduleListToXLSX from "@/src/application/usecases/ExportScheduleListToXLSX";
import GetRooms from "@/src/application/usecases/GetRooms";
import GetScheduleListByID from "@/src/application/usecases/GetScheduleListByID";
import RoomRepositoryImpl from "@/src/infrastructure/repositories/RoomRepositoryImpl";
import ScheduleListRepositoryImpl from "@/src/infrastructure/repositories/ScheduleListRepositoryImpl";
import { hoursEnum, weekDaysEnum } from "@/src/shared/helper/enumHelper";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const type = searchParams.get('type');

        if(!id || !type){
            throw new Error('Invalid params');
        }

        const scheduleList = await GetScheduleListByID(Number(id), new ScheduleListRepositoryImpl);
        switch(type){
            case ExportType.CSV:
                const resultCSV = await ExportScheduleListToCSV(scheduleList);
                return new NextResponse(resultCSV.csvContent, {
                    headers: {
                        'Content-Type': 'text/csv',
                        'Content-Disposition': `attachment; filename="${resultCSV.fileName}"`,
                    }
                });

            case ExportType.XLSX:
                const resultXLSX = await ExportScheduleListToXLSX({
                    scheduleList: scheduleList,
                    weekDayList: weekDaysEnum,
                    hourList: hoursEnum,
                    roomList: await GetRooms(new RoomRepositoryImpl)
                } as ExportScheduleListToXLSXDTO);
                return new NextResponse(resultXLSX.buffer, {
                    headers: {
                        'Content-Type':
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'Content-Disposition': `attachment; filename="${resultXLSX.fileName}"`,
                    }
                });

            default: throw new Error(`Export to type ${type} is not supported.`)
        }
    } catch(error) {
        return NextResponse.json({ error: error instanceof Error? error.message : 'Unknown error occured.' }, { status: 500 });
    }
}