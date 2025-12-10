import { NextResponse } from 'next/server';
import ScheduleRepositoryImpl from '@/src/infrastructure/repositories/ScheduleRepositoryImpl';
import Schedule from '@/src/domain/entities/Schedule';

const scheduleRepo = new ScheduleRepositoryImpl();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const sch = await scheduleRepo.GetScheduleByID(Number(id));
            return NextResponse.json(sch);
        }

        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sch = await scheduleRepo.AddSchedule(body as Schedule);
        return NextResponse.json(sch, { status: 201 });
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

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            );
        }

        const body = await request.json();
        const sch = await scheduleRepo.UpdateSchedule(
            Number(id),
            body as Schedule,
        );
        return NextResponse.json(sch);
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

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            );
        }

        const sch = await scheduleRepo.DeleteSchedule(Number(id));
        return NextResponse.json(sch);
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
