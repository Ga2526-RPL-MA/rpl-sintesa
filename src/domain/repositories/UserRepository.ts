import { SupabaseClient } from '@supabase/supabase-js';
import UserRole from '../enums/UserRole';

export default interface UserRepository {
    GetUserId(supabase: SupabaseClient): Promise<string>;
    GetUserRoles(id: string, supabase: SupabaseClient): Promise<UserRole[]>;
}
