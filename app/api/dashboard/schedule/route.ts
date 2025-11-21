import GetCurrentUserID from '@/src/application/usecases/GetCurrentUserID';
import GetNewestScheduleListByUserID from '@/src/application/usecases/GetNewestScheduleListByUserID';
import ScheduleListRepositoryImpl from '@/src/infrastructure/repositories/ScheduleListRepositoryImpl';
import UserRepositoryImpl from '@/src/infrastructure/repositories/UserRepositoryImpl';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const scheduleList = await GetNewestScheduleListByUserID(
            await GetCurrentUserID(new UserRepositoryImpl()),
            new ScheduleListRepositoryImpl(),
        );

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
