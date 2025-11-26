import { createClient } from '@/lib/supabase/server';

export default async function ApiLogout(): Promise<void> {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : `Error: ApiLogout()`,
        );
    }
}
