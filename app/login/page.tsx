import AuthBackground from "@/components/auth-bg"
import LoginForm from "@/components/login-form"
import Image from "next/image"
function LoginPage() {
  return (
    <div>
        <AuthBackground>
            <div className='flex min-h-svh items-center justify-center'>
                <div className="w-full max-w-sm sm:p-0 p-5">
                    <LoginForm />
                </div>
            </div>
        </AuthBackground>
    </div>
  )
}

export default LoginPage