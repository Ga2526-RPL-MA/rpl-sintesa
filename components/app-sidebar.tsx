'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
    IconLayoutDashboard,
    IconLayoutDashboardFilled,
    IconCalendarWeek,
    IconCalendarWeekFilled,
    IconClock,
    IconClockFilled,
    IconLogout,
    IconUsersGroup,
} from '@tabler/icons-react';
import Logo from './logo';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import {
    IconBooks,
    IconBooksFilled,
    IconDoors,
    IconDoorsFilled,
    IconUsersGroupFilled,
} from './custom-icons';

const menuItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: IconLayoutDashboard,
        iconFilled: IconLayoutDashboardFilled,
    },
    {
        title: 'Generate Schedule',
        url: '/dashboard/generate',
        icon: IconCalendarWeek,
        iconFilled: IconCalendarWeekFilled,
    },
    {
        title: 'Schedule History',
        url: '/dashboard/history',
        icon: IconClock,
        iconFilled: IconClockFilled,
    },
    // {
    //     title: 'View All Schedules',
    //     url: '/#',
    //     icon: IconClock,
    //     iconFilled: IconClockFilled,
    // },
    {
        title: 'Lecturers',
        url: '/dashboard/admin/lecturers',
        icon: IconUsersGroup,
        iconFilled: IconUsersGroupFilled,
    },
    {
        title: 'Rooms',
        url: '/dashboard/admin/rooms',
        icon: IconDoors,
        iconFilled: IconDoorsFilled,
    },
    {
        title: 'Courses',
        url: '/dashboard/admin/courses',
        icon: IconBooks,
        iconFilled: IconBooksFilled,
    },
];

function isAdmin() {
    //Determine if user's an admin
    return true;
}

function AppSidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                return;
            }
            toast.success('Succesfully logged out!');
            router.push('/auth/login');
        } catch (error) {
            console.error('An unexpected error occurred during logout:', error);
        }
    }

    return (
        <Sidebar
            variant={'floating'}
            className={cn(className)}
            sidebarInner={cn('dark:bg-sidebar/95', 'bg-sidebar/90')}
        >
            <SidebarContent>
                <SidebarGroup>
                    <Logo className="mt-5 mb-8 justify-center self-center" />
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isSelected = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={isSelected ? true : false}
                                            onClick={() =>
                                                router.push(`${item.url}`)
                                            }
                                            className={cn(
                                                'flex items-center gap-3 rounded-md transition-colors',
                                                'hover:bg-primary/5 dark:active:bg-primary/10! active:bg-primary/10! hover:text-foreground/90',
                                                isSelected
                                                    ? cn(
                                                          'dark:bg-primary! shadow-sm dark:text-white!',
                                                          'bg-primary! text-white! shadow-sm',
                                                      )
                                                    : 'text-foreground',
                                            )}
                                        >
                                            {isSelected ? (
                                                <item.iconFilled />
                                            ) : (
                                                <item.icon />
                                            )}
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                            <SidebarSeparator className="my-2 flex self-center" />
                            <SidebarMenuButton
                                onClick={handleLogout}
                                className={cn(
                                    'flex items-center gap-3 rounded-md transition-colors',
                                    'text-foreground hover:bg-primary/5 dark:active:bg-primary/10! active:bg-primary/10! hover:text-foreground/90',
                                )}
                            >
                                <IconLogout />
                                Logout
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default AppSidebar;
