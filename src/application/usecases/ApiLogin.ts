import { createClient } from '@/lib/supabase/server';

export default async function ApiLogin(
    email: string,
    password: string,
): Promise<string> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        if (!data) throw new Error('User is null');

        return data.session.access_token;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : `Error: ApiLogin()`,
        );
    }
}
