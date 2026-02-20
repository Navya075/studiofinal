"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, Settings, Trophy, Check, MessageSquare, Info, AlertTriangle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';

interface NavbarProps {
  isDashboard?: boolean;
}

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Request Accepted', message: 'You have been added to Blockchain Campus Vote!', type: 'success', timestamp: new Date().toISOString(), read: false },
  { id: '2', title: 'New Team Message', message: 'Sara Chen: "Hey, can you check the latest design tokens?"', type: 'message', timestamp: new Date().toISOString(), read: false },
  { id: '3', title: 'Point Milestone', message: 'You just earned 50 points for completing your profile!', type: 'alert', timestamp: new Date().toISOString(), read: true },
];

export function Navbar({ isDashboard = false }: NavbarProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  if (!isDashboard) {
    return (
      <nav className="fixed top-0 w-full z-50 glass border-b border-primary/20 h-16 flex items-center px-6 md:px-12 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Logo className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter">CampusConnect</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
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
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Logo className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tighter hidden md:block text-foreground">CampusConnect</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-1 mr-2">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary">850 PTS</span>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted rounded-full">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mt-2 shadow-xl border-muted/20" align="end">
            <div className="p-4 border-b bg-muted/5 flex items-center justify-between">
              <h3 className="font-bold text-sm font-headline">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-[10px] h-7 font-bold text-primary hover:text-primary hover:bg-primary/5 px-2">
                  Mark all as read
                </Button>
              )}
            </div>
            <ScrollArea className="h-[350px]">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-4 flex gap-3 transition-colors ${!n.read ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
                      <div className="mt-0.5 shrink-0">
                        {getIcon(n.type)}
                      </div>
                      <div className="space-y-1 overflow-hidden">
                        <p className={`text-xs leading-snug ${!n.read ? 'font-bold' : 'text-foreground'}`}>
                          {n.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {n.message}
                        </p>
                        <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!n.read && (
                        <div className="mt-1 shrink-0">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                  <Bell className="w-8 h-8 text-muted-foreground/20" />
                  <p className="text-xs text-muted-foreground font-medium">No new notifications</p>
                </div>
              )}
            </ScrollArea>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" className="w-full text-[10px] font-bold h-8 uppercase tracking-widest text-muted-foreground hover:text-primary">
                View All Activity
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 rounded-full flex items-center gap-2 pl-1 pr-1 hover:bg-muted">
              <Avatar className="w-8 h-8 border shadow-sm">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-bold text-foreground pr-2">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 shadow-xl border-muted/20">
            <DropdownMenuLabel className="font-headline">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" /> View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/leaderboard" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Top Ranking
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
              <Link href="/" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}