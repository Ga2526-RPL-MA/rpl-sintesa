'use client';
import React, { useEffect } from 'react';
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

function LoginForm({
    className,
    cardClass,
}: {
    className?: string;
    cardClass?: string;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function isLoginValid(): boolean {
        if (!email) {
            toast.error('Email is required');
            return false;
        }
        if (!email.includes('@')) {
            toast.error('Please enter a valid email');
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            return false;
        }

        return true;
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoginValid()) {
            return;
        }
        setIsLoading(true);

        try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            router.push('/dashboard');
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'An error occurred',
            );
        } finally {
            setIsLoading(false);
            setPassword('');
            setEmail('');
        }
    };

    useEffect(() => {
        const supabase = createClient();
        console.log(supabase.auth.getUser());
    }, []);

    return (
        <div className={cn(className)}>
            <Card variant={'theme'}>
                <CardHeader>
                    <div className="mb-5 flex h-fit w-full items-center justify-center gap-2">
                        <Logo />
                    </div>
                    <CardTitle className="dark:text-accent-foreground text-xl text-green-900">
                        Sign in to Sintesa
                    </CardTitle>
                    <CardDescription>
                        Enter your email and password below to login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form noValidate onSubmit={handleLogin}>
                        <FieldGroup>
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
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
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
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Spinner />
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don't have an account?{' '}
                                    <a href="/auth/register">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;
