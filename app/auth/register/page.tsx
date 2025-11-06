import AuthBackground from '@/components/auth-bg';
import { ThemeSwitcher } from '@/components/premade/theme-switcher';
import RegisterForm from '@/components/register-form';
function RegisterPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center">
            <AuthBackground />
            <div className="absolute top-4 right-4 z-20">
                <ThemeSwitcher />
            </div>
            <div className="relative z-10 w-full max-w-sm p-5">
                <RegisterForm cardClass="bg-card/85 [&_input]:border-foreground/10 [&_label]:text-green-900 dark:[&_label]:text-accent-foreground dark:text-accent-foreground" />
            </div>
        </div>
    );
}

export default RegisterPage;
