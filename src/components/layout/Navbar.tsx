"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, Trophy } from 'lucide-react';
import { Logo } from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, initializeFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface NavbarProps {
  isDashboard?: boolean;
}

export function Navbar({ isDashboard = false }: NavbarProps) {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const { db } = initializeFirebase();
      getDoc(doc(db, 'users', user.uid)).then((snap) => {
        if (snap.exists()) {
          setProfileData(snap.data());
        }
      });
    }
  }, [user]);

  const handleLogout = async () => {
    const { auth } = initializeFirebase();
    await auth.signOut();
    router.push('/');
  };

  if (!isDashboard || !user) {
    return (
      <nav className="fixed top-0 w-full z-50 glass border-b border-primary/20 h-16 flex items-center px-6 md:px-12 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Logo className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter">CampusConnect</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 font-bold" asChild>
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b h-16 flex items-center px-4 md:px-8 justify-between">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Logo className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tighter hidden md:block">CampusConnect</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase">{profileData?.points || 0} PTS</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 rounded-full flex items-center gap-2 hover:bg-muted">
              <Avatar className="w-8 h-8 border shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {profileData?.fullName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-bold text-foreground pr-2">{profileData?.fullName || 'User'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 shadow-xl border-muted/20">
            <DropdownMenuLabel className="font-headline">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile" className="flex items-center gap-2"><User className="w-4 h-4" /> View Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/leaderboard" className="flex items-center gap-2"><Trophy className="w-4 h-4" /> Top Ranking</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/settings" className="flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 cursor-pointer">
              <LogOut className="w-4 h-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
