"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(50, "Title too long"),
  type: z.enum(['Hackathon', 'Research', 'Startup', 'Competition', 'General Collaboration']),
  summary: z.string().min(10, "Brief pitch must be at least 10 characters").max(100, "Pitch too long"),
  description: z.string().min(20, "Detailed description must be at least 20 characters"),
  teamSize: z.number().min(1, "At least 1 member needed").max(10, "Max team size is 10"),
  duration: z.string().min(1, "Required"),
  skills: z.array(z.string()).min(1, "Add at least one required skill badge")
});

type ProjectValues = z.infer<typeof projectSchema>;

interface PostCreationDialogProps {
  onCreate?: (project: any) => void;
}

export function PostCreationDialog({ onCreate }: PostCreationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      type: 'Hackathon',
      skills: ['React', 'Next.js'],
      teamSize: 3
    }
  });

  const skills = watch('skills');
  const type = watch('type');

  const onFormSubmit = (data: ProjectValues) => {
    setIsSubmitting(true);
    // Simulation
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
      reset();
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
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input 
                {...register('title')} 
                placeholder="e.g. AI Study Assistant" 
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select value={type} onValueChange={(val: any) => setValue('type', val)}>
                <SelectTrigger className={errors.type ? "border-destructive" : ""}>
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
              <Input 
                {...register('summary')} 
                placeholder="A one-sentence pitch..." 
                className={errors.summary ? "border-destructive" : ""}
              />
              {errors.summary && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.summary.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Detailed Description</Label>
              <Textarea 
                {...register('description')}
                placeholder="What are we building? Describe your goals." 
                className={cn("h-32 resize-none", errors.description ? "border-destructive" : "")} 
              />
              {errors.description && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description.message}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Required Skills (Badges)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map(skill => (
                <Badge key={skill} className="bg-tech/10 text-tech border-tech/20 px-3 py-1 gap-1">
                  {skill} <X className="w-3 h-3 cursor-pointer" onClick={() => setValue('skills', skills.filter(s => s !== skill))} />
                </Badge>
              ))}
            </div>
            <Input 
              placeholder="Type a skill and press Enter" 
              className={errors.skills ? "border-destructive" : ""}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  e.preventDefault();
                  if (!skills.includes(e.currentTarget.value)) {
                    setValue('skills', [...skills, e.currentTarget.value]);
                  }
                  e.currentTarget.value = '';
                }
              }} 
            />
            {errors.skills && <p className="text-[10px] text-destructive font-medium">{errors.skills.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Team Size Needed</Label>
              <Input 
                type="number" 
                {...register('teamSize', { valueAsNumber: true })}
                className={errors.teamSize ? "border-destructive" : ""}
                min={1} 
                max={10}
              />
              {errors.teamSize && <p className="text-[10px] text-destructive font-medium">{errors.teamSize.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Duration / Due Date</Label>
              <Input 
                {...register('duration')} 
                placeholder="e.g. Nov 30" 
                className={errors.duration ? "border-destructive" : ""}
              />
              {errors.duration && <p className="text-[10px] text-destructive font-medium">{errors.duration.message}</p>}
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
