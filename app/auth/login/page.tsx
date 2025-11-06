import LoginForm from '@/components/login-form';

function LoginPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center">
            <div className="relative z-10 w-full max-w-sm p-5">
                <LoginForm cardClass="bg-card/85 [&_input]:border-foreground/10 [&_label]:text-green-900 dark:[&_label]:text-accent-foreground dark:text-accent-foreground" />
            </div>
        </div>
    );
}

export default LoginPage;
