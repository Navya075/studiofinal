"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, GraduationCap, Loader2, Sparkles, Clock, Globe, ShieldAlert } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SessionCreationDialogProps {
  onCreate?: (session: any) => void;
}

export function SessionCreationDialog({ onCreate }: SessionCreationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEducator, setIsEducator] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cc_current_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsEducator(parsed.isEducator || false);
      } catch (e) {}
    }
  }, [open]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isEducator) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only verified Educators can host sessions. Request verification in your profile settings.",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      topic: formData.get('topic') as string,
      description: formData.get('description') as string,
      scheduledAt: `${formData.get('date')}T${formData.get('time')}:00`,
    };

    setIsSubmitting(true);
    setTimeout(() => {
      if (onCreate) {
        onCreate(data);
      }
      toast({ 
        title: "Expertise Session Scheduled", 
        description: "The community can now register. Link releases at start time." 
      });
      setOpen(false);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-xl shadow-primary/20 h-14 gap-3 font-black uppercase tracking-widest transition-all hover:-translate-y-1">
          <BookOpen className="w-6 h-6" />
          <span>Host a Session</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-[3rem] p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-4xl font-black font-headline text-primary mb-2">Share Your Expertise</DialogTitle>
          <DialogDescription className="text-muted-foreground font-bold italic">
            {isEducator 
              ? "You are authorized as a Verified Educator. Schedule your next masterclass." 
              : "Verified Educator status required to host masterclasses and share expertise."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onFormSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Session Title</Label>
              <Input name="title" placeholder="e.g. Git Essentials" required className="h-14 rounded-2xl bg-muted/20 border-transparent text-lg font-bold" />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Domain Topic</Label>
              <Input name="topic" placeholder="e.g. Version Control" required className="h-14 rounded-2xl bg-muted/20 border-transparent text-lg font-bold" />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Curriculum Brief</Label>
            <Textarea name="description" placeholder="Outline the key learning outcomes for this session." className="min-h-[120px] rounded-3xl bg-muted/20 border-transparent p-6 text-lg resize-none" required />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Event Date</Label>
              <Input name="date" type="date" required className="h-14 rounded-2xl bg-muted/20 border-transparent font-bold" />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Release Time (Meet Link)</Label>
              <Input name="time" type="time" required className="h-14 rounded-2xl bg-muted/20 border-transparent font-bold" />
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/5">
            <ShieldAlert className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground font-bold leading-relaxed">
              <strong className="text-primary uppercase tracking-widest block mb-1">Access Protocol</strong>
              Only registered students can attempt to enter. The unique session link is automatically restricted until the exact release time specified above.
            </p>
          </div>

          <DialogFooter className="gap-4">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)} className="h-14 rounded-2xl font-black uppercase tracking-widest">Discard</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-white hover:bg-primary/90 px-12 h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 flex-1 sm:flex-none">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEducator ? 'Authorize & Post' : 'Request Access')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
