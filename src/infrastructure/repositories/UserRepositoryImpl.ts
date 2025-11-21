import UserRole from '@/src/domain/enums/UserRole';
import UserRepository from '@/src/domain/repositories/UserRepository';
import { SupabaseClient } from '@supabase/supabase-js';

export default class UserRepositoryImpl implements UserRepository {
    async GetUserId(supabase: SupabaseClient): Promise<string> {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        return data.user.id;
    }
    async GetUserRoles(
        id: string,
        supabase: SupabaseClient,
    ): Promise<UserRole[]> {
        const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', id);
        if (error) throw error;
        if (!roles)
            throw new Error('Roles is not defined for user with id: ' + id);

        return roles.map((r) => r.role);
    }
}
