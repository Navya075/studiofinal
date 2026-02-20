"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export function PostCreationDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Hackathon');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>(['React', 'Next.js']);
  const [teamSize, setTeamSize] = useState(3);
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = () => {
    if (!title || !summary || !description) {
      toast({ 
        variant: "destructive",
        title: "Missing Fields", 
        description: "Please fill in all the project details." 
      });
      return;
    }

    setIsSubmitting(true);
    // Simulating mock success without backend
    setTimeout(() => {
      toast({ title: "Success", description: "Your project post is now live!" });
      setOpen(false);
      setIsSubmitting(false);
      setTitle('');
      setSummary('');
      setDescription('');
    }, 800);
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
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. AI Study Assistant" />
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select value={type} onValueChange={setType}>
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
              <Label>Short Summary</Label>
              <Input value={summary} onChange={e => setSummary(e.target.value)} placeholder="A one-sentence pitch..." />
            </div>
            <div className="space-y-2">
              <Label>Detailed Description</Label>
              <Textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder="What are we building? Describe your goals." 
                className="h-32 resize-none" 
              />
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
            <Input placeholder="Type a skill and press Enter" onKeyDown={e => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                setSkills([...skills, e.currentTarget.value]);
                e.currentTarget.value = '';
              }
            }} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Team Size Needed</Label>
              <Input type="number" value={teamSize} onChange={e => setTeamSize(parseInt(e.target.value))} min={1} />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 2 weeks" />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <ShieldAlert className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Confidentiality Notice:</strong> Sensitive details will only be disclosed to accepted members.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handlePost} disabled={isSubmitting} className="bg-foreground text-background hover:bg-foreground/90 px-8">
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}