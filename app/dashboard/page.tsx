import { createClient } from '@/lib/supabase/server';
async function Dashboard() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    return <div className="h-max w-max bg-blue-500">dwdddw</div>;
}

export default Dashboard;
