import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import SiteHeader from '@/components/site-header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="bg-linear-to-t from-teal-900 to-green-500">
                <SidebarProvider>
                    <AppSidebar className="bg-transparent" />
                    <main className="h-screen w-screen p-2 pl-0">
                        <div className="bg-sidebar h-full w-full rounded-xl p-5 shadow-xl">
                            <SiteHeader />
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
}
