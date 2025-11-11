'use client';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Field, FieldGroup, FieldLabel, FieldDescription } from './ui/field';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './logo';

function RegisterForm({
    className,
    cardClass,
}: {
    className?: string;
    cardClass?: string;
}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function matchingPasswords(): boolean {
        return password === confirmPassword;
    }

    function isRegisterInputValidated(): boolean {
        if (!name) {
            toast.error('Full name is required');
            return false;
        }

        if (!email) {
            toast.error('Email is required');
            return false;
        }

        if (!email.includes('@')) {
            toast.error('Please enter a valid email');
            return false;
        }

        if (!password) {
            toast.error('Password cannot be empty');
            return false;
        }

        if (!matchingPasswords()) {
            return false;
        }

        return true;
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isRegisterInputValidated()) {
            return;
        }
        const supabase = createClient();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    //Metadata for users
                    data: {
                        full_name: name,
                    },
                },
            });
            if (error) throw error;
            router.push('/login');
            toast.success(
                'Check your email for confirmation and then you can log in!',
                { duration: 80000 },
            );
            setPassword('');
            setEmail('');
            setConfirmPassword('');
            setName('');
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'An error occurred',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn(className)}>
            <Card variant={'theme'}>
                <CardHeader>
                    <div className="mb-5 flex h-fit w-full items-center justify-center gap-2">
                        <Logo />
                    </div>
                    <CardTitle className="dark:text-accent-foreground text-xl text-green-900">
                        Sign Up to Sintesa
                    </CardTitle>
                    <CardDescription>
                        Enter your name, email, and password below to register
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form noValidate onSubmit={handleRegister}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Full Name
                                </FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
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
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirm-password">
                                    Confirm Password
                                </FieldLabel>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                    onBlur={() => {
                                        if (!matchingPasswords()) {
                                            setError('Passwords do not match!');
                                        } else {
                                            setError('');
                                        }
                                    }}
                                    required
                                />
                                <div className="h-4 text-sm text-red-500">
                                    {error}
                                </div>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="flex items-center gap-4">
                                            <Spinner />
                                            Signing up...
                                        </div>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{' '}
                                    <a href="/auth/login">Sign In</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterForm;
