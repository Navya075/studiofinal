"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ExternalLink, Lock, Globe, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isAfter, isBefore, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface LearnCardProps {
  session: {
    id: string;
    title: string;
    instructor: string;
    topic: string;
    description: string;
    scheduledAt: string;
    attendees: number;
    meetLink: string;
  };
}

export function LearnCard({ session }: LearnCardProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [timeToStart, setTimeToStart] = useState('');

  const scheduledTime = parseISO(session.scheduledAt);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      setIsReleased(isAfter(now, scheduledTime));
      
      if (isBefore(now, scheduledTime)) {
        const diff = scheduledTime.getTime() - now.getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(mins / 60) ;
        if (hours > 0) {
          setTimeToStart(`Link releases in ${hours}h ${mins % 60}m`);
        } else {
          setTimeToStart(`Link releases in ${mins}m`);
        }
      } else {
        setTimeToStart('Session is Live!');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 10000);
    return () => clearInterval(interval);
  }, [scheduledTime]);

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistered(true);
      setIsRegistering(false);
      toast({
        title: "Registered Successfully",
        description: `You are now on the list for ${session.title}.`,
      });
    }, 1000);
  };

  const handleEnter = () => {
    if (!isReleased) {
      toast({
        variant: "destructive",
        title: "Protocol: Access Restricted",
        description: `Link will be released on ${format(scheduledTime, 'MMM dd @ hh:mm a')}.`,
      });
      return;
    }
    window.open(`https://${session.meetLink}`, '_blank');
  };

  return (
    <Card className="overflow-hidden border-none shadow-soft hover:shadow-lg transition-all duration-300 w-full bg-white/70 backdrop-blur-sm group">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-2xl font-bold font-headline text-foreground group-hover:text-primary transition-colors">
                {session.title}
              </h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/10 font-black text-[10px] uppercase tracking-widest">
                {session.topic}
              </Badge>
              {isReleased && (
                <Badge className="bg-green-500 text-white animate-pulse font-black text-[10px] uppercase tracking-widest">
                  LIVE NOW
                </Badge>
              )}
              {isRegistered && (
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 font-black text-[10px] uppercase tracking-widest gap-1">
                  <CheckCircle2 className="w-3 h-3" /> REGISTERED
                </Badge>
              )}
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {session.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <span>Instructor: <span className="text-primary">{session.instructor}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{format(scheduledTime, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{format(scheduledTime, 'hh:mm a')}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-64 flex flex-col items-center lg:items-end justify-center gap-4 shrink-0 lg:border-l lg:pl-8 border-primary/5">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">
              {isRegistered ? "Expertise Protocol" : "Join the Session"}
            </div>
            
            {!isRegistered ? (
              <Button 
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all font-black uppercase tracking-widest gap-2"
              >
                {isRegistering ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register Now"}
              </Button>
            ) : (
              <div className="w-full space-y-3">
                <Button 
                  onClick={handleEnter}
                  variant={isReleased ? "default" : "outline"}
                  className={cn(
                    "w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-2 transition-all",
                    isReleased 
                      ? "bg-primary text-white shadow-xl shadow-primary/20 hover:-translate-y-1" 
                      : "border-2 border-dashed border-primary/20 text-primary bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  {isReleased ? <ExternalLink className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  Enter Session
                </Button>
                {!isReleased && (
                  <p className="text-[10px] font-bold text-primary text-center italic flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> {timeToStart}
                  </p>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-2">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {session.attendees + (isRegistered ? 1 : 0)} Students Enrolled
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
