import { createClient } from '@/lib/supabase/server';

export default async function GetCurrentUserID(): Promise<string> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        return data.user.id;
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : `Error: GetCurrentUserID()`,
        );
    }
}
