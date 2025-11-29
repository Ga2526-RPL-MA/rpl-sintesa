import { NextResponse } from 'next/server';
import RoomRepositoryImpl from '@/src/infrastructure/repositories/RoomRepositoryImpl';
import Room from '@/src/domain/entities/Room';
import IsAuthorize from '@/src/application/usecases/IsAuthorize';

import UserRole from '@/src/domain/enums/UserRole';

const roomRepo = new RoomRepositoryImpl();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const code = searchParams.get('code');

        if (id) {
            const room = await roomRepo.GetRoomByID(Number(id));
            return NextResponse.json(room);
        }

        if (code) {
            const room = await roomRepo.GetRoomByCode(code);
            return NextResponse.json(room);
        }

        const rooms = await roomRepo.GetRooms();
        return NextResponse.json(rooms);
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
        if (!(await IsAuthorize([UserRole.ADMIN]))) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const room = await roomRepo.AddRoom(body as Room);
        return NextResponse.json(room, { status: 201 });
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
        if (!(await IsAuthorize([UserRole.ADMIN]))) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            );
        }

        const body = await request.json();
        const room = await roomRepo.UpdateRoom(Number(id), body as Room);
        return NextResponse.json(room);
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
        if (!(await IsAuthorize([UserRole.ADMIN]))) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            );
        }

        const room = await roomRepo.DeleteRoom(Number(id));
        return NextResponse.json(room);
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
