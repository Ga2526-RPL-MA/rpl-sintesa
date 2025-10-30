import AuthBackground from '@/components/auth-bg';
import RegisterForm from '@/components/register-form';
function RegisterPage() {
    return (
        <div>
            <AuthBackground>
                <div className="flex min-h-svh items-center justify-center">
                    <div className="w-full max-w-sm p-5 sm:p-0">
                        <RegisterForm />
                    </div>
                </div>
            </AuthBackground>
        </div>
    );
}

export default RegisterPage;
