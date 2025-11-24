import ApiLogout from '@/src/application/usecases/ApiLogout';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        await ApiLogout();
        return NextResponse.json({ message: 'Logout successful' });
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
