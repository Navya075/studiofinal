"use client";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Layers, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email("Invalid college email").endsWith(".edu", "Must be a .edu email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginValues) => {
    setIsLoading(true);
    // Simulation
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Layers className="text-foreground w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter">CampusConnect</span>
          </Link>
          <h1 className="text-2xl font-bold font-headline">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue to your collaboration hub</p>
        </div>

        <Card className="border-none shadow-soft">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your college email and password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="student@university.edu" 
                  {...register('email')}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-tech hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password')}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-xs text-destructive font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password.message}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-foreground text-background hover:bg-foreground/90 mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link href="/signup" className="text-tech font-semibold hover:underline">Sign Up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
