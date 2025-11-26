import UserRole from '@/src/domain/enums/UserRole';
import UserRepository from '@/src/domain/repositories/UserRepository';
import { createClient } from '@/lib/supabase/server';

export default async function IsAuthorize(
    userRepository: UserRepository,
    requiredRoles: UserRole[],
): Promise<boolean> {
    try {
        const supabase = await createClient();
        const userRoles = await userRepository.GetUserRoles(
            await userRepository.GetUserId(supabase),
            supabase,
        );

        return userRoles.some((role) => requiredRoles.includes(role));
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : `Error: IsAuthorize()`,
        );
    }
}
