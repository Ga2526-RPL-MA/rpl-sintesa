export const dynamic = 'force-dynamic';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import SiteHeader from '@/components/site-header';
import GetUserRoles from '@/src/application/usecases/GetUserRoles';
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const role = await GetUserRoles();
    return (
        <div className="to-primary bg-linear-to-t from-teal-900">
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <AppSidebar role={role} />
                    <main className="flex-1 overflow-auto p-2 md:pl-0">
                        <div className="bg-sidebar h-full w-full rounded-xl shadow-xl">
                            <div className="flex h-full flex-col p-5">
                                <SiteHeader />
                                <div className="mt-5 min-h-0 flex-1">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
