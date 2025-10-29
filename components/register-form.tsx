'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Field, FieldGroup, FieldLabel, FieldDescription } from './ui/field'
import { useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'
import SintesaLogo from './logo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function matchingPasswords():boolean{
        return password === confirmPassword
    }

    function isRegisterInputValidated():boolean{
        if (!name){
            toast.error("Full name is required")
            return false
        }

        if (!email){
            toast.error("Email is required")
            return false
        }

        if (!email.includes("@")){
            toast.error("Please enter a valid email")
            return false
        }

        if (!password){
            toast.error("Password cannot be empty")
            return false
        }

        if (!matchingPasswords()){
            return false
        }
        

        return true
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!isRegisterInputValidated()){
            return
        }
        const supabase = createClient()
        setIsLoading(true)
        
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password
            })
            if (error) throw error
            //TODO: Insert user 'profile' upon register
            // const user = data.user
            // if (user){
            //     const { error: profileError } = await supabase
            //     .from('profile')
            //     .insert({
            //         id: user.id, 
            //         full_name: name, 
            //         user_role: 'STUDENT'
            //     });
            //     if (profileError) throw profileError
            // } 
            // Above doesnt work because it hits RLS => not yet confirmed email
            router.push('/login');
            toast.success('Check your email for confirmation and then you can log in!', {duration: 80000})
            setPassword('')
            setEmail('')
            setConfirmPassword('')
            setName('')
        } catch (error){
            toast.error(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
        
    }

    return (
    <div>
        <Card className='p-2'>
            <CardHeader>
                <div className='w-full h-fit flex justify-center items-center mb-5 gap-2'>
                    <SintesaLogo className='hidden sm:block'/>
                </div>
                <CardTitle className='text-xl'>Sign Up to Sintesa</CardTitle>
                <CardDescription>Enter your name, email, and password below to register</CardDescription>
            </CardHeader>
            <CardContent>
                <form noValidate onSubmit={handleRegister}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                            />
                        </Field>
                        <Field>
                            <div className="flex items-center">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            </div>
                            <Input 
                            id="password" 
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required 
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                            <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            onBlur={() => {
                                if (!matchingPasswords()){
                                    setError("Passwords do not match!")
                                } else{
                                    setError("")
                                }
                            }}
                            required
                            />
                            <div className='h-4 text-sm text-red-500'>
                                {error}
                            </div>
                        </Field>
                        <Field>
                            <Button type="submit" disabled={isLoading}>
                                { isLoading ? (
                                    <div className='flex items-center gap-4'>
                                        <Spinner />
                                        Signing up...
                                    </div>
                                ): (
                                    'Sign in'
                                )}
                            </Button>
                            <FieldDescription className="text-center">
                            Already have an account? <a href="/login">Sign In</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default RegisterForm