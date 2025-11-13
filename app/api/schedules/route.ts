import AddScheduleList from '@/src/application/usecases/AddScheduleList';
import GenerateScheduleList from '@/src/application/usecases/GenerateScheduleList';
import GetCourses from '@/src/application/usecases/GetCourses';
import GetCurrentUserID from '@/src/application/usecases/GetCurrentUserID';
import GetHours from '@/src/application/usecases/GetHours';
import GetLecturers from '@/src/application/usecases/GetLecturers';
import GetNewestScheduleListByUserID from '@/src/application/usecases/GetNewestScheduleListByUserID';
import GetRooms from '@/src/application/usecases/GetRooms';
import GetScheduleListByID from '@/src/application/usecases/GetScheduleListByID';
import GetScheduleListsByUserID from '@/src/application/usecases/GetScheduleListsByUserID';
import GetWeekDays from '@/src/application/usecases/GetWeekDays';
import CourseRepositoryImpl from '@/src/infrastructure/repositories/CourseRepositoryImpl';
import LecturerRepositoryImpl from '@/src/infrastructure/repositories/LecturerRepositoryImpl';
import RoomRepositoryImpl from '@/src/infrastructure/repositories/RoomRepositoryImpl';
import ScheduleListRepositoryImpl from '@/src/infrastructure/repositories/ScheduleListRepositoryImpl';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const newest = searchParams.get('newest');

        let scheduleList = {};
        if (id) {
            scheduleList = await GetScheduleListByID(
                Number(id),
                new ScheduleListRepositoryImpl(),
            );
        } else if (newest) {
            if (newest !== 'true') throw new Error('Invalid query');

            scheduleList = await GetNewestScheduleListByUserID(
                await GetCurrentUserID(),
                new ScheduleListRepositoryImpl(),
            );
        } else {
            scheduleList = await GetScheduleListsByUserID(
                await GetCurrentUserID(),
                new ScheduleListRepositoryImpl(),
            );
        }

        return NextResponse.json(scheduleList);
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occured',
            },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const addedScheduleList = await AddScheduleList(
            await GenerateScheduleList({
                coursesList: await GetCourses(new CourseRepositoryImpl()),
                lecturersList: await GetLecturers(new LecturerRepositoryImpl()),
                roomsList: await GetRooms(new RoomRepositoryImpl()),
                weekDaysList: await GetWeekDays(),
                hoursList: await GetHours(),
                semester: body.semester,
                year: new Date(Date.now()).getFullYear().toString(),
                userId: await GetCurrentUserID(),
            }),
            new ScheduleListRepositoryImpl(),
        );

        return NextResponse.json(addedScheduleList);
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occured',
            },
            { status: 500 },
        );
    }
}
