"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Clock, ArrowRight, CheckCircle2, User, Loader2, XCircle, Briefcase, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    status: string;
    timeLeft: string;
    summary: string;
    tags: string[];
    owner: string;
    members: number;
    maxMembers: number;
    dueDate: string;
    category: string;
    isVerified?: boolean;
  };
  isJoined?: boolean;
  onJoin?: () => void;
}

type JoinStatus = 'idle' | 'waiting' | 'accepted' | 'rejected';

const AVAILABLE_ROLES = [
  { id: 'dev', label: 'Software Engineer', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'design', label: 'UI/UX Designer', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'pm', label: 'Product Manager', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'research', label: 'Researcher', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'marketing', label: 'Marketing Lead', icon: <Briefcase className="w-4 h-4" /> },
];

export function PostCard({ post, isJoined = false, onJoin }: PostCardProps) {
  const [status, setStatus] = useState<JoinStatus>(isJoined ? 'accepted' : 'idle');
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('dev');

  const handleOpenJoin = () => {
    if (status === 'idle') {
      setIsRoleDialogOpen(true);
    }
  };

  const handleConfirmJoin = () => {
    setIsRoleDialogOpen(false);
    setStatus('waiting');
    
    const roleLabel = AVAILABLE_ROLES.find(r => r.id === selectedRole)?.label || 'Member';
    
    // Simulation
    setTimeout(() => {
      setStatus('accepted');
      if (onJoin) onJoin();
      toast({
        title: "Joined Team!",
        description: `You've joined ${post.title} as a ${roleLabel}.`,
      });
    }, 1200);
  };

  const renderActionButton = () => {
    switch (status) {
      case 'idle':
        return (
          <Button 
            onClick={handleOpenJoin} 
            className="w-full h-11 rounded-xl gap-2 font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            Join Project
          </Button>
        );
      case 'waiting':
        return (
          <Button 
            disabled 
            variant="outline" 
            className="w-full h-11 rounded-xl gap-2 font-bold border-primary/20 bg-primary/5 text-primary"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Requesting...
          </Button>
        );
      case 'accepted':
        return (
          <Button 
            variant="outline"
            className="w-full h-11 rounded-xl gap-2 font-bold border-primary text-primary hover:bg-primary/5"
            asChild
          >
            <Link href={`/team/${post.id}`}>
              Team Room <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        );
      case 'rejected':
        return (
          <Button 
            disabled 
            variant="outline" 
            className="w-full h-11 rounded-xl gap-2 font-bold border-destructive/20 bg-destructive/5 text-destructive"
          >
            <XCircle className="w-4 h-4" />
            Full
          </Button>
        );
    }
  };

  return (
    <>
      <Card className="overflow-hidden border-none shadow-soft hover:shadow-lg transition-all duration-300 w-full bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-2xl font-bold font-headline flex items-center gap-2 text-foreground">
                  {post.title}
                  {post.isVerified && <CheckCircle2 className="w-5 h-5 text-primary fill-primary/10" />}
                </h3>
                <Badge variant="secondary" className="rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border-primary/10">
                  {post.status}
                </Badge>
                <Badge variant="outline" className="rounded-full border-primary/20 text-primary bg-white flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  {post.timeLeft}
                </Badge>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] font-black uppercase tracking-[0.1em] py-1 px-3 border-primary/10 bg-white/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>{post.owner} <span className="text-[9px] text-primary/60 ml-1">(Lead)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{post.members}/{post.maxMembers} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Due {post.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="lg:w-56 flex flex-col items-center lg:items-end justify-center gap-6 shrink-0 lg:border-l lg:pl-8 border-primary/5">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                Formation Progress
              </div>
              <div className="flex items-center gap-1.5 bg-muted/20 p-2 rounded-full">
                {[...Array(post.maxMembers)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3.5 h-3.5 rounded-full shadow-sm transition-all duration-500 ${
                      i < post.members || (i === post.members && status === 'accepted' && post.owner !== 'You') ? 'bg-primary scale-110' : 'bg-white'
                      }`} 
                  />
                ))}
              </div>
              
              {renderActionButton()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[3rem] p-10">
          <DialogHeader className="space-y-4 text-center">
            <DialogTitle className="text-3xl font-black font-headline text-primary">Select Your Role</DialogTitle>
            <DialogDescription className="text-muted-foreground font-bold">
              The project is led by <span className="text-primary">{post.owner}</span>. Choose how you want to contribute to the mission.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <RadioGroup defaultValue="dev" onValueChange={setSelectedRole} className="space-y-3">
              {AVAILABLE_ROLES.map((role) => (
                <div key={role.id} className="relative">
                  <RadioGroupItem value={role.id} id={role.id} className="peer sr-only" />
                  <Label
                    htmlFor={role.id}
                    className="flex items-center justify-between p-5 rounded-[1.5rem] border-4 border-transparent bg-muted/30 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                        {role.icon}
                      </div>
                      <span className="font-black text-sm uppercase tracking-widest">{role.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 peer-data-[state=checked]:opacity-100 transition-all" />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleConfirmJoin} 
              className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
            >
              Confirm Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
