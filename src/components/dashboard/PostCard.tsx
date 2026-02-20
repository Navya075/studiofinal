"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Clock, ArrowRight, CheckCircle2, User, Loader2, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

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

export function PostCard({ post, isJoined = false, onJoin }: PostCardProps) {
  const [status, setStatus] = useState<JoinStatus>(isJoined ? 'accepted' : 'idle');

  const handleJoin = () => {
    setStatus('waiting');
    // Simulation
    setTimeout(() => {
      setStatus('accepted');
      if (onJoin) onJoin();
      toast({
        title: "Joined Project!",
        description: `You are now a member of ${post.title}.`,
      });
    }, 1200);
  };

  const renderActionButton = () => {
    switch (status) {
      case 'idle':
        return (
          <Button 
            onClick={handleJoin} 
            className="w-full h-11 rounded-xl gap-2 font-bold bg-foreground text-background"
          >
            Join Project
          </Button>
        );
      case 'waiting':
        return (
          <Button 
            disabled 
            variant="outline" 
            className="w-full h-11 rounded-xl gap-2 font-bold border-orange-200 bg-orange-50 text-orange-600"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Joining...
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
            className="w-full h-11 rounded-xl gap-2 font-bold border-red-200 bg-red-50 text-red-600"
          >
            <XCircle className="w-4 h-4" />
            Full
          </Button>
        );
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-soft hover:shadow-lg transition-all duration-300 w-full">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-bold font-headline flex items-center gap-2">
                {post.title}
                {post.isVerified && <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" />}
              </h3>
              <Badge variant="secondary" className="rounded-full text-[10px] font-bold uppercase tracking-widest bg-muted/50">
                {post.status}
              </Badge>
              <Badge variant="outline" className="rounded-full border-red-200 text-red-500 bg-red-50 flex items-center gap-1 text-[10px] font-bold">
                <Clock className="w-3 h-3" />
                {post.timeLeft}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {post.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-[10px] font-medium py-0.5 border-muted/30">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{post.owner}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{post.members}/{post.maxMembers} members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Due {post.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-48 flex flex-col items-center lg:items-end justify-center gap-4 shrink-0 lg:border-l lg:pl-6">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Team Progress
            </div>
            <div className="flex items-center gap-1">
              {[...Array(post.maxMembers)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full ${
                    i < post.members || (i === post.members && status === 'accepted' && post.owner !== 'You') ? 'bg-primary' : 'bg-muted'
                    }`} 
                />
              ))}
            </div>
            
            {renderActionButton()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
