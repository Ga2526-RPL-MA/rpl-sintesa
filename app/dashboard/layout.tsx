import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import SiteHeader from '@/components/site-header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-linear-to-t from-teal-900 to-green-500">
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <AppSidebar className="bg-transparent" />
                    <main className="flex-1 p-2 md:pl-0 overflow-auto">
                        <div className="dark:bg-sidebar/95 bg-sidebar/90 h-full w-full rounded-xl shadow-xl">
                            <div className='p-5 h-full flex flex-col'>
                                <SiteHeader />
                                <div className="mt-5 flex-1 min-h-0">{children}</div>
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
