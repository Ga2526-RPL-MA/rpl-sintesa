import GenerateScheduleList from '@/src/application/usecases/GenerateScheduleList';
import GenerateThenAddScheduleList from '@/src/application/usecases/GenerateThenAddScheduleList';
import GetNewestScheduleListByUserID from '@/src/application/usecases/GetNewestScheduleListByUserID';
import GetScheduleListByID from '@/src/application/usecases/GetScheduleListByID';
import GetScheduleListsByUserID from '@/src/application/usecases/GetScheduleListsByUserID';
import CourseRepositoryImpl from '@/src/infrastructure/repositories/CourseRepositoryImpl';
import LecturerRepositoryImpl from '@/src/infrastructure/repositories/LecturerRepositoryImpl';
import RoomRepositoryImpl from '@/src/infrastructure/repositories/RoomRepositoryImpl';
import ScheduleListRepositoryImpl from '@/src/infrastructure/repositories/ScheduleListRepositoryImpl';
import {
    hoursEnum,
    semesterEnum,
    weekDaysEnum,
} from '@/src/shared/helper/enumHelper';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const newest = searchParams.get('newest');

        let scheduleList = {};
        if(id) {
            scheduleList = await GetScheduleListByID(Number(id), new ScheduleListRepositoryImpl());
        } else if(newest) {
            if(newest !== 'true') throw new Error('Invalid query');
            // TODO: use the userId of the currently logged in user as parameter
            scheduleList = await GetNewestScheduleListByUserID('ef2ca123-1a08-4a06-b4bd-c44322703e5c', new ScheduleListRepositoryImpl());
        } else {
            // TODO: use the userId of the currently logged in user as parameter
            scheduleList = await GetScheduleListsByUserID('ef2ca123-1a08-4a06-b4bd-c44322703e5c', new ScheduleListRepositoryImpl());
        }

        return NextResponse.json(scheduleList);
    } catch (err) {
        return NextResponse.json({
            error: err instanceof Error? err.message : "Unknown error occured",
        }, { status: 500 })
    }
}

export async function POST() {
    try {
        const newScheduleList = await GenerateThenAddScheduleList(
            new ScheduleListRepositoryImpl(),
            new CourseRepositoryImpl(),
            new LecturerRepositoryImpl(),
            new RoomRepositoryImpl()
        );
        return NextResponse.json(newScheduleList);
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to generate schedule', error },
            { status: 500 },
        );
    }
}