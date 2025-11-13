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
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;
