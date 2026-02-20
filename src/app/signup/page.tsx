"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Logo } from '@/components/Logo';
import { 
  Plus, 
  Rocket, 
  Brain, 
  Code, 
  Smartphone, 
  Palette, 
  Zap, 
  GraduationCap,
  X,
  Trophy,
  Database,
  Globe,
  Heart,
  Briefcase,
  Shield,
  Cpu,
  Microscope,
  Leaf,
  Megaphone,
  BarChart3,
  Lightbulb,
  Music,
  Video,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const INTEREST_CATEGORIES = [
  { id: 'hackathons', label: 'Hackathons', icon: <Rocket className="w-5 h-5" />, image: 'https://picsum.photos/seed/hack/400/300' },
  { id: 'ai-ml', label: 'AI / ML', icon: <Brain className="w-5 h-5" />, image: 'https://picsum.photos/seed/ai/400/400' },
  { id: 'web-dev', label: 'Web Development', icon: <Code className="w-5 h-5" />, image: 'https://picsum.photos/seed/web/400/500' },
  { id: 'app-dev', label: 'App Development', icon: <Smartphone className="w-5 h-5" />, image: 'https://picsum.photos/seed/app/400/350' },
  { id: 'ui-ux', label: 'UI/UX Design', icon: <Palette className="w-5 h-5" />, image: 'https://picsum.photos/seed/design/400/450' },
  { id: 'startups', icon: <Zap className="w-5 h-5" />, label: 'Startups', image: 'https://picsum.photos/seed/startup/400/300' },
  { id: 'robotics', label: 'Robotics', icon: <Cpu className="w-5 h-5" />, image: 'https://picsum.photos/seed/robot/400/400' },
  { id: 'blockchain', label: 'Blockchain', icon: <Database className="w-5 h-5" />, image: 'https://picsum.photos/seed/block/400/310' },
  { id: 'data-science', label: 'Data Science', icon: <BarChart3 className="w-5 h-5" />, image: 'https://picsum.photos/seed/data/400/320' },
  { id: 'open-source', label: 'Open Source', icon: <Globe className="w-5 h-5" />, image: 'https://picsum.photos/seed/open/400/330' },
  { id: 'social-impact', label: 'Social Impact', icon: <Heart className="w-5 h-5" />, image: 'https://picsum.photos/seed/social/400/340' },
  { id: 'fintech', label: 'FinTech', icon: <Briefcase className="w-5 h-5" />, image: 'https://picsum.photos/seed/fin/400/350' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, image: 'https://picsum.photos/seed/secure/400/360' },
  { id: 'sustainability', label: 'Sustainability', icon: <Leaf className="w-5 h-5" />, image: 'https://picsum.photos/seed/leaf/400/370' },
  { id: 'bio-tech', label: 'BioTech', icon: <Microscope className="w-5 h-5" />, image: 'https://picsum.photos/seed/bio/400/380' },
  { id: 'marketing', label: 'Marketing', icon: <Megaphone className="w-5 h-5" />, image: 'https://picsum.photos/seed/market/400/390' },
  { id: 'creative-arts', label: 'Creative Arts', icon: <Music className="w-5 h-5" />, image: 'https://picsum.photos/seed/art/400/400' },
  { id: 'film-video', label: 'Film & Video', icon: <Video className="w-5 h-5" />, image: 'https://picsum.photos/seed/video/400/410' },
  { id: 'legal-tech', label: 'Legal Tech', icon: <Scale className="w-5 h-5" />, image: 'https://picsum.photos/seed/law/400/420' },
  { id: 'innovation', label: 'Innovation', icon: <Lightbulb className="w-5 h-5" />, image: 'https://picsum.photos/seed/light/400/430' },
];

const TECH_SKILLS = [
  'React', 'Next.js', 'Node.js', 'Python', 'Solidity', 'AWS', 'Docker', 
  'TensorFlow', 'Flutter', 'TypeScript', 'SQL', 'MongoDB', 'Go', 
  'Rust', 'Kubernetes', 'Firebase', 'GraphQL', 'Django', 'C++', 'Java',
  'Three.js', 'C#', 'Azure', 'Swift', 'Kotlin', 'R', 'MATLAB', 'PHP'
];

const NON_TECH_SKILLS = [
  'Photography', 'Graphic Design', 'Project Management', 'UI/UX', 
  'User Research', 'Marketing', 'Business Strategy', 'Content Writing', 
  'Video Editing', 'Event Planning', 'Financial Modeling', 'Legal Tech', 'Sales',
  'Public Speaking', 'Illustration', 'Copywriting', 'SEO', 'Product Ownership'
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleSkill = (skill: string) => {
    setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const toggleInterest = (id: string) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const onFinalSubmit = () => {
    setIsSubmitting(true);
    
    const userData = {
      fullName: 'John Doe',
      email: 'john@university.edu',
      university: 'Stanford University',
      major: 'Computer Science',
      degree: 'Bachelor of Science',
      graduationYear: '2026',
      bio: 'Passionate developer building tools for student collaboration.',
      skills,
      interests,
      points: 100
    };
    
    localStorage.setItem('cc_current_user', JSON.stringify(userData));

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Account Created!",
        description: `Welcome to CampusConnect! Your collaborative journey starts now.`,
      });
      router.push('/dashboard');
    }, 1500);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold font-headline">Select Your Domains</h3>
              <p className="text-sm text-muted-foreground">Choose the badges that best represent your core strengths.</p>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-bold flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" /> Technical Domain
              </Label>
              <div className="flex flex-wrap gap-2">
                {TECH_SKILLS.map(skill => (
                  <Badge 
                    key={skill} 
                    variant={skills.includes(skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-4 py-2 cursor-pointer transition-all border-primary/30 rounded-xl",
                      skills.includes(skill) ? "bg-primary text-white scale-105" : "hover:bg-primary/10"
                    )}
                  >
                    {skill} {skills.includes(skill) ? <X className="w-3 h-3 ml-1" /> : <Plus className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-bold flex items-center gap-2">
                <Palette className="w-5 h-5 text-creative" /> Creative & Professional
              </Label>
              <div className="flex flex-wrap gap-2">
                {NON_TECH_SKILLS.map(skill => (
                  <Badge 
                    key={skill} 
                    variant={skills.includes(skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-4 py-2 cursor-pointer transition-all border-creative/30 rounded-xl",
                      skills.includes(skill) ? "bg-creative text-white scale-105" : "hover:bg-creative/10 text-creative"
                    )}
                  >
                    {skill} {skills.includes(skill) ? <X className="w-3 h-3 ml-1" /> : <Plus className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold font-headline">Profile Identity</h3>
              <p className="text-sm text-muted-foreground">Tell the community who you are.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>College Email</Label>
                <Input placeholder="john@university.edu" type="email" defaultValue="john@university.edu" />
              </div>
            </div>
            <div className="p-5 bg-muted/20 rounded-2xl border space-y-5">
              <div className="flex items-center gap-2 font-bold text-sm">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Education Background</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="University" defaultValue="Stanford University" />
                <Input placeholder="Major" defaultValue="Computer Science" />
                <Input placeholder="Degree" defaultValue="Bachelor of Science" />
                <Input placeholder="Graduation Year" defaultValue="2026" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea placeholder="What drives you?" className="resize-none h-28" defaultValue="Passionate developer building tools for student collaboration." />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold font-headline">Passion Board</h3>
              <p className="text-sm text-muted-foreground">Select your interests and vision areas.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {INTEREST_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => toggleInterest(cat.id)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border-2 aspect-square",
                    interests.includes(cat.id) ? "border-primary shadow-xl scale-[0.98]" : "border-transparent"
                  )}
                >
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 text-center text-white font-bold text-xs gap-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      {cat.icon}
                    </div>
                    {cat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in duration-300 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-headline">Verification Complete</h3>
            <p className="text-muted-foreground">You've earned 100 Collab Points for joining! Ready to launch?</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Logo className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter">CampusConnect</span>
          </Link>
          <Progress value={(step / 4) * 100} className="h-2 max-w-md mx-auto rounded-full" />
        </div>

        <Card className="border-none shadow-soft overflow-hidden bg-white">
          <CardHeader className="bg-white border-b p-8">
            <CardTitle className="text-3xl font-bold font-headline">Onboarding</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[400px] p-8">
            {renderStep()}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-8 bg-muted/5">
            {step > 1 && <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>Back</Button>}
            {step < 4 ? (
              <Button onClick={handleNext} className="ml-auto">Continue</Button>
            ) : (
              <Button onClick={onFinalSubmit} disabled={isSubmitting} className="ml-auto bg-primary text-white">
                {isSubmitting ? 'Finalizing...' : 'Launch Dashboard'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}