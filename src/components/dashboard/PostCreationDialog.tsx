"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, ShieldAlert, Loader2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface PostCreationDialogProps {
  onCreate?: (project: any) => void;
}

export function PostCreationDialog({ onCreate }: PostCreationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>(['React', 'Next.js']);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      type: formData.get('type') as string,
      summary: formData.get('summary') as string,
      description: formData.get('description') as string,
      teamSize: Number(formData.get('teamSize')),
      duration: formData.get('duration') as string,
      skills: skills
    };

    setIsSubmitting(true);
    setTimeout(() => {
      if (onCreate) {
        onCreate({
          ...data,
          tags: data.skills,
          maxMembers: data.teamSize,
          dueDate: data.duration,
          status: 'Active',
          isVerified: false,
        });
      }
      toast({ title: "Mission Initiated", description: "Your project is now visible to the campus network!" });
      setOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-xl shadow-primary/20 h-14 gap-3 font-black uppercase tracking-widest transition-all hover:-translate-y-1">
          <Plus className="w-6 h-6" />
          <span>Launch Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-4xl font-black font-headline text-primary mb-2">Initiate Collaboration</DialogTitle>
          <DialogDescription className="text-muted-foreground font-bold italic">
            You are the Team Leader. Define the vision and assemble your elite squad.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onFormSubmit} className="space-y-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Project Identity</Label>
              <Input name="title" placeholder="e.g. AI Study Assistant" required className="h-14 rounded-2xl bg-muted/20 border-transparent focus:border-primary/20 transition-all text-lg font-bold" />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Project Domain</Label>
              <Select name="type" defaultValue="Hackathon">
                <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-transparent text-lg font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="Hackathon">Hackathon</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                  <SelectItem value="General Collaboration">General Collaboration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Elevator Pitch</Label>
              <Input name="summary" placeholder="A one-sentence pitch to attract talent..." required className="h-14 rounded-2xl bg-muted/20 border-transparent text-lg" />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Mission Roadmap</Label>
              <Textarea name="description" placeholder="Describe the goals and impact of your project." className="min-h-[150px] rounded-3xl bg-muted/20 border-transparent p-6 text-lg resize-none" required />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Required Domain Badges
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map(skill => (
                <Badge key={skill} className="bg-primary/10 text-primary border-primary/20 px-4 py-2 gap-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                  {skill} <X className="w-3.5 h-3.5 cursor-pointer hover:text-destructive transition-colors" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                </Badge>
              ))}
            </div>
            <Input 
              placeholder="Type a skill and press Enter" 
              className="h-14 rounded-2xl bg-muted/10 border-dashed border-2 border-primary/20 focus:border-primary"
              onKeyDown={e => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  e.preventDefault();
                  if (!skills.includes(e.currentTarget.value)) {
                    setSkills([...skills, e.currentTarget.value]);
                  }
                  e.currentTarget.value = '';
                }
              }} 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Squad Capacity</Label>
              <Input name="teamSize" type="number" defaultValue={3} min={1} max={10} required className="h-14 rounded-2xl bg-muted/20 border-transparent text-lg font-bold" />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Target Milestone</Label>
              <Input name="duration" placeholder="e.g. Nov 30" required className="h-14 rounded-2xl bg-muted/20 border-transparent text-lg font-bold" />
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/5">
            <ShieldAlert className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground font-bold leading-relaxed">
              <strong className="text-primary uppercase tracking-widest block mb-1">Confidentiality Protocol</strong>
              Sensitive roadmap details will only be disclosed to members you approve. As Team Leader, you have final authority on squad selection.
            </p>
          </div>

          <DialogFooter className="gap-4">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)} className="h-14 rounded-2xl font-black uppercase tracking-widest">Discard</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-white hover:bg-primary/90 px-12 h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 flex-1 sm:flex-none">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Launch Mission'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
