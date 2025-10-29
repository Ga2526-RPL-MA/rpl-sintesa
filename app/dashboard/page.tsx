import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
async function Dashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user);

  return (
    <div className='flex h-screen justify-center items-center'>
        Welcome {user?.email}
    </div>
  )
}

export default Dashboard