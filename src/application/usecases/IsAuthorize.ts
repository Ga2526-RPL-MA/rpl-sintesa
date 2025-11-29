import UserRole from '@/src/domain/enums/UserRole';
import GetUserRoles from './GetUserRoles';

export default async function IsAuthorize(
    requiredRoles: UserRole[],
): Promise<boolean> {
    try {
        const userRoles = await GetUserRoles();

        return userRoles.some((role) => requiredRoles.includes(role));
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : `Error: IsAuthorize()`,
        );
    }
}
