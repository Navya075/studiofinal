
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, ShieldAlert, Loader2 } from 'lucide-react';
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
      toast({ title: "Success", description: "Your project post is now live!" });
      setOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-tech hover:bg-tech/90 text-white rounded-full px-6 shadow-lg shadow-tech/20 h-12 gap-2">
          <Plus className="w-5 h-5" />
          <span>Create Project Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline">New Team Formation Post</DialogTitle>
          <DialogDescription>Fill in the details to find your perfect teammates.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onFormSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input name="title" placeholder="e.g. AI Study Assistant" required />
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select name="type" defaultValue="Hackathon">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hackathon">Hackathon</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                  <SelectItem value="General Collaboration">General Collaboration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Short Summary (Pitch)</Label>
              <Input name="summary" placeholder="A one-sentence pitch..." required />
            </div>
            <div className="space-y-2">
              <Label>Detailed Description</Label>
              <Textarea name="description" placeholder="What are we building? Describe your goals." className="h-32 resize-none" required />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Required Skills (Badges)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map(skill => (
                <Badge key={skill} className="bg-tech/10 text-tech border-tech/20 px-3 py-1 gap-1">
                  {skill} <X className="w-3 h-3 cursor-pointer" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                </Badge>
              ))}
            </div>
            <Input 
              placeholder="Type a skill and press Enter" 
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Team Size Needed</Label>
              <Input name="teamSize" type="number" defaultValue={3} min={1} max={10} required />
            </div>
            <div className="space-y-2">
              <Label>Duration / Due Date</Label>
              <Input name="duration" placeholder="e.g. Nov 30" required />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border">
            <ShieldAlert className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Confidentiality Notice:</strong> Sensitive details will only be disclosed to accepted members once they join the team room.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-foreground text-background hover:bg-foreground/90 px-8">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
