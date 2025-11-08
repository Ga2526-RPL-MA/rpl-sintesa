import LoginForm from '@/components/login-form';

function LoginPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center">
            <div className="relative z-10 w-full max-w-sm p-5">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
