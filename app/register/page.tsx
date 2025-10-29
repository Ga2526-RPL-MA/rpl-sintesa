import AuthBackground from "@/components/auth-bg"
import RegisterForm from "@/components/register-form"
import Image from "next/image"
function RegisterPage() {
  return (
    <div>
        <AuthBackground>
            <div className='flex min-h-svh items-center justify-center'>
                <div className="w-full max-w-sm sm:p-0 p-5">
                    <RegisterForm />
                </div>
            </div>
        </AuthBackground>
    </div>
  )
}

export default RegisterPage