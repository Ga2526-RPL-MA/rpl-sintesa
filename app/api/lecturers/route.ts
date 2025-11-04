import { NextResponse } from 'next/server';
import LecturerRepositoryImpl from '@/src/infrastructure/repositories/LecturerRepositoryImpl';
import { Lecturer } from '@/src/domain/entities/Lecturer';

const lecturerRepo = new LecturerRepositoryImpl();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const lecturer = await lecturerRepo.GetLecturerByID(Number(id));
            return NextResponse.json(lecturer);
        }

        const lecturers = await lecturerRepo.GetLecturers();
        return NextResponse.json(lecturers);
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
        const lecturer = await lecturerRepo.AddLecturer(body as Lecturer);
        return NextResponse.json(lecturer, { status: 201 });
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
        const lecturer = await lecturerRepo.UpdateLecturer(
            Number(id),
            body as Lecturer,
        );
        return NextResponse.json(lecturer);
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

        const lecturer = await lecturerRepo.DeleteLecturer(Number(id));
        return NextResponse.json(lecturer);
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
