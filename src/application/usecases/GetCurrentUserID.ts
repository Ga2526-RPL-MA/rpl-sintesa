import { createClient } from '@/lib/supabase/server';
import UserRepository from '@/src/domain/repositories/UserRepository';

export default async function GetCurrentUserID(
    userRepository: UserRepository,
): Promise<string> {
    try {
        return await userRepository.GetUserId(await createClient());
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : `Error: GetCurrentUserID()`,
        );
    }
}
