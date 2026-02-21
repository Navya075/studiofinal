
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Chrome, Star } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Logo } from '@/components/Logo';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ variant: "destructive", title: "Missing Credentials", description: "Please enter both email and password." });
      return;
    }

    if (!email.includes('@')) {
      toast({ variant: "destructive", title: "Invalid Format", description: "Please enter a valid college email." });
      return;
    }

    setIsLoading(true);
    const { auth } = initializeFirebase();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Welcome back!", description: "Successfully logged in to your collaboration hub." });
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      let message = "Invalid email or password. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        message = "No account found with this email. Please sign up first.";
      } else if (error.code === 'auth/wrong-password') {
        message = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-credential') {
        message = "Incorrect credentials. Please check your email and password.";
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <Star className="absolute top-[10%] left-[10%] w-8 h-8 text-primary/10 animate-pulse" />
      <Star className="absolute bottom-[10%] right-[10%] w-12 h-12 text-primary/10" />

      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform">
              <Logo className="text-white w-7 h-7" />
            </div>
            <span className="font-headline font-bold text-3xl tracking-tighter">CampusConnect</span>
          </Link>
          <h1 className="text-2xl font-bold font-headline">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue to your collaboration hub</p>
        </div>

        <Card className="border-none shadow-soft overflow-hidden rounded-[2.5rem] bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Login</CardTitle>
            <CardDescription>Enter your college email and password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">College Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="student@university.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl" 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline font-bold">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl" 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-black bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-2xl mt-4"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-6 bg-muted/5">
            <p className="text-sm text-muted-foreground font-medium">
              Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
