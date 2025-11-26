import ApiLogin from '@/src/application/usecases/ApiLogin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const accessToken = await ApiLogin(body.email, body.password);

        return NextResponse.json({
            message: 'Login successful',
            accessToken,
        });
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
