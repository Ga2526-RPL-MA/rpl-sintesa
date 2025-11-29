import { ThemeProvider } from 'next-themes';
import AuthBackground from '@/components/auth-bg';
import { Toaster } from 'sonner';
import { ThemeSwitcher } from '@/components/premade/theme-switcher';
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AuthBackground />
                <div className="absolute top-4 right-4 z-20">
                    <ThemeSwitcher />
                </div>
                {children}
            </ThemeProvider>
            <Toaster position="top-center" richColors />
        </div>
    );
}
