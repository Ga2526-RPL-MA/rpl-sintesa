import AuthBackground from '@/components/auth-bg';
import LoginForm from '@/components/login-form';
function LoginPage() {
    return (
        <div>
            <AuthBackground>
                <div className="flex min-h-svh items-center justify-center">
                    <div className="w-full max-w-sm p-5 sm:p-0">
                        <LoginForm />
                    </div>
                </div>
            </AuthBackground>
        </div>
    );
}

export default LoginPage;
