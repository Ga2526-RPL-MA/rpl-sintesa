import { createClient } from '@/lib/supabase/server';
import GetCurrentUserID from './GetCurrentUserID';
import UserRole from '@/src/domain/enums/UserRole';

export default async function GetUserRoles(): Promise<UserRole[]> {
    try {
        const supabase = await createClient();
        const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', await GetCurrentUserID());
        if (error) throw error;
        if (!roles) throw new Error('Roles is not defined for current user');

        return roles.map((r) => r.role as UserRole);
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : `Error: GetUserRoles()`,
        );
    }
}
