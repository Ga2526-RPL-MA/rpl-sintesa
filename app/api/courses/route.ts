import { NextResponse } from 'next/server';
import CourseRepositoryImpl from '@/src/infrastructure/repositories/CourseRepositoryImpl';
import Course from '@/src/domain/entities/Course';

const courseRepo = new CourseRepositoryImpl();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const course = await courseRepo.GetCourseByID(Number(id));
            return NextResponse.json(course);
        }

        const courses = await courseRepo.GetCourses();
        return NextResponse.json(courses);
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
        const course = await courseRepo.AddCourse(body as Course);
        return NextResponse.json(course, { status: 201 });
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
        const course = await courseRepo.UpdateCourse(
            Number(id),
            body as Course,
        );
        return NextResponse.json(course);
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

        const course = await courseRepo.DeleteCourse(Number(id));
        return NextResponse.json(course);
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
