import AddScheduleList from '@/src/application/usecases/AddScheduleList';
import GenerateScheduleList from '@/src/application/usecases/GenerateScheduleList';
import GetCourses from '@/src/application/usecases/GetCourses';
import GetCurrentUserID from '@/src/application/usecases/GetCurrentUserID';
import GetHours from '@/src/application/usecases/GetHours';
import GetLecturers from '@/src/application/usecases/GetLecturers';
import GetRooms from '@/src/application/usecases/GetRooms';
import GetScheduleListByID from '@/src/application/usecases/GetScheduleListByID';
import GetScheduleListsByUserID from '@/src/application/usecases/GetScheduleListsByUserID';
import GetWeekDays from '@/src/application/usecases/GetWeekDays';
import CourseRepositoryImpl from '@/src/infrastructure/repositories/CourseRepositoryImpl';
import LecturerRepositoryImpl from '@/src/infrastructure/repositories/LecturerRepositoryImpl';
import RoomRepositoryImpl from '@/src/infrastructure/repositories/RoomRepositoryImpl';
import ScheduleListRepositoryImpl from '@/src/infrastructure/repositories/ScheduleListRepositoryImpl';
import { UpdateScheduleInput } from '@/src/domain/repositories/ScheduleListRepository';
import Schedule from '@/src/domain/entities/Schedule';
import { NextResponse } from 'next/server';

const scheduleListRepo = new ScheduleListRepositoryImpl();

export interface UpdateSchedulesRequest {
    scheduleListId: number;
    updates: {
        scheduleId: number;
        schedule: Schedule;
    }[];
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const scheduleList = await GetScheduleListByID(
                Number(id),
                new ScheduleListRepositoryImpl(),
            );

            return NextResponse.json(scheduleList);
        }

        const scheduleList = await GetScheduleListsByUserID(
            await GetCurrentUserID(),
            new ScheduleListRepositoryImpl(),
        );

        return NextResponse.json(scheduleList);
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    err instanceof Error
                        ? err.message
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
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    err instanceof Error
                        ? err.message
                        : 'Unknown error occured',
            },
            { status: 500 },
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = (await request.json()) as UpdateSchedulesRequest;

        if (!body.scheduleListId) {
            return NextResponse.json(
                { error: 'scheduleListId is required' },
                { status: 400 },
            );
        }

        if (!body.updates || body.updates.length === 0) {
            return NextResponse.json(
                { error: 'At least one schedule update is required' },
                { status: 400 },
            );
        }

        const schedulesToUpdate: UpdateScheduleInput[] = body.updates.map(
            (update) => ({
                scheduleId: update.scheduleId,
                schedule: update.schedule,
            }),
        );

        const updatedScheduleList =
            await scheduleListRepo.UpdateSchedulesInList(
                body.scheduleListId,
                schedulesToUpdate,
            );

        return NextResponse.json(updatedScheduleList);
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred',
            },
            { status: 500 },
        );
    }
}
