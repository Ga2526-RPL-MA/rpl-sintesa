import GenerateSchedule from '@/src/application/usecases/generateSchedule';
import ScheduleListRepositoryImpl from '@/src/infrastructure/repositories/ScheduleListRepositoryImpl';
import {
    hoursEnum,
    semesterEnum,
    weekDaysEnum,
} from '@/src/shared/helper/enumHelper';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const scheduleList = await GenerateSchedule({
            coursesList: [
                'Mathematics',
                'Physics',
                'Chemistry',
                'Biology',
                'History',
                'Geography',
                'English',
                'Art',
            ],
            weekDaysList: weekDaysEnum,
            hoursList: hoursEnum,
            roomsList: ['Room A', 'Room B', 'Room C'],
            lecturersList: ['Dr. Smith', 'Prof. Johnson', 'Dr. Lee'],
            semester: semesterEnum[0],
            year: '2023/2024',
            userId: 'ef2ca123-1a08-4a06-b4bd-c44322703e5c',
        });

        await new ScheduleListRepositoryImpl().saveSchedules(scheduleList);

        return NextResponse.json(
            {
                message: 'Schedule generated and saved successfully',
                scheduleList,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to generate schedule', error },
            { status: 500 },
        );
    }
}
