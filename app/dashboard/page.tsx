import { createClient } from '@/lib/supabase/server';
async function Dashboard() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    return (
        <div className="flex h-screen items-center justify-center">
            Welcome {user?.email}
        </div>
    );
}

export default Dashboard;
