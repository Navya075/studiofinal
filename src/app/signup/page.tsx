
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
  Activity,
  Music,
  Camera,
  Layers,
  Grid,
  Check,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const INTEREST_CATEGORIES = [
  { id: 'hackathons', label: 'Hackathons', icon: <Rocket className="w-5 h-5" />, image: 'https://picsum.photos/seed/hack/400/300' },
  { id: 'ai-ml', label: 'AI / ML', icon: <Brain className="w-5 h-5" />, image: 'https://picsum.photos/seed/ai/400/400' },
  { id: 'web-dev', label: 'Web Development', icon: <Code className="w-5 h-5" />, image: 'https://picsum.photos/seed/web/400/500' },
  { id: 'app-dev', label: 'App Development', icon: <Smartphone className="w-5 h-5" />, image: 'https://picsum.photos/seed/app/400/350' },
  { id: 'ui-ux', label: 'UI/UX Design', icon: <Palette className="w-5 h-5" />, image: 'https://picsum.photos/seed/design/400/450' },
  { id: 'startups', label: 'Startups', icon: <Zap className="w-5 h-5" />, image: 'https://picsum.photos/seed/startup/400/300' },
  { id: 'robotics', label: 'Robotics', icon: <Layers className="w-5 h-5" />, image: 'https://picsum.photos/seed/robot/400/400' },
];

const TECH_SKILLS = [
  'React', 'Next.js', 'Node.js', 'Python', 'Solidity', 'AWS', 'Docker', 
  'TensorFlow', 'Flutter', 'TypeScript'
];

const NON_TECH_SKILLS = [
  'Photography', 'Dance', 'Music', 'Public Speaking', 'Graphic Design', 'Project Management', 
  'UI/UX', 'User Research'
];

const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address").endsWith(".edu", "Please use your university (.edu) email"),
  university: z.string().min(2, "University name is required"),
  major: z.string().min(2, "Major is required"),
  degree: z.string().min(2, "Degree is required"),
  graduationYear: z.string().regex(/^\d{4}$/, "Must be a 4-digit year"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(200, "Bio must be under 200 characters"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      university: '',
      major: '',
      degree: '',
      graduationYear: '',
      bio: '',
      skills: [],
      interests: []
    }
  });

  const skills = watch('skills');
  const interests = watch('interests');

  const handleNext = async () => {
    let fieldsToValidate: (keyof OnboardingValues)[] = [];
    if (step === 1) fieldsToValidate = ['skills'];
    if (step === 2) fieldsToValidate = ['fullName', 'email', 'password', 'university', 'major', 'degree', 'graduationYear', 'bio'];
    if (step === 3) fieldsToValidate = ['interests'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(step + 1);
    } else {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
      });
    }
  };

  const handleBack = () => setStep(step - 1);

  const toggleSkill = (skill: string) => {
    const current = [...skills];
    const index = current.indexOf(skill);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(skill);
    }
    setValue('skills', current, { shouldValidate: true });
  };

  const toggleInterest = (id: string) => {
    const current = [...interests];
    const index = current.indexOf(id);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(id);
    }
    setValue('interests', current, { shouldValidate: true });
  };

  const onFinalSubmit = async (data: OnboardingValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Local Database Emulation
      const existingUsers = JSON.parse(localStorage.getItem('cc_users') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === data.email);
      
      if (userExists) {
        setIsSubmitting(false);
        toast({
          variant: "destructive",
          title: "Account Error",
          description: "An account with this email already exists.",
        });
        return;
      }

      const newUser = { ...data, id: Date.now().toString(), points: 100 };
      existingUsers.push(newUser);
      localStorage.setItem('cc_users', JSON.stringify(existingUsers));
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));

      setIsSubmitting(false);
      toast({
        title: "Account Created!",
        description: `Welcome, ${data.fullName}! Your collaborative journey starts now.`,
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
              {errors.skills && <p className="text-xs text-destructive mt-2 font-medium">{errors.skills.message}</p>}
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
                <Palette className="w-5 h-5 text-creative" /> Creative & Sports
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
                <Input {...register('fullName')} placeholder="John Doe" className={errors.fullName ? "border-destructive" : ""} />
                {errors.fullName && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>College Email</Label>
                <Input {...register('email')} placeholder="john@university.edu" type="email" className={errors.email ? "border-destructive" : ""} />
                {errors.email && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input {...register('password')} type="password" placeholder="••••••••" className={errors.password ? "border-destructive" : ""} />
                {errors.password && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password.message}</p>}
              </div>
            </div>
            <div className="p-5 bg-muted/20 rounded-2xl border space-y-5">
              <div className="flex items-center gap-2 font-bold text-sm">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Education Background</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input placeholder="University" {...register('university')} />
                </div>
                <div className="space-y-1">
                  <Input placeholder="Major" {...register('major')} />
                </div>
                <div className="space-y-1">
                  <Input placeholder="Degree" {...register('degree')} />
                </div>
                <div className="space-y-1">
                  <Input placeholder="Graduation Year" {...register('graduationYear')} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea {...register('bio')} placeholder="What drives you?" className="resize-none h-28" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold font-headline">Passion Board</h3>
              <p className="text-sm text-muted-foreground">Select your interests.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INTEREST_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => toggleInterest(cat.id)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border-2",
                    interests.includes(cat.id) ? "border-primary shadow-xl scale-[0.98]" : "border-transparent"
                  )}
                >
                  <img src={cat.image} alt={cat.label} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center text-white font-bold text-xs">
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
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Logo className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter">CampusConnect</span>
          </Link>
          <Progress value={(step / 4) * 100} className="h-2 max-w-md mx-auto rounded-full" />
        </div>

        <Card className="border-none shadow-soft overflow-hidden">
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
              <Button onClick={handleSubmit(onFinalSubmit)} disabled={isSubmitting} className="ml-auto bg-primary text-white">
                {isSubmitting ? 'Finalizing...' : 'Launch Dashboard'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
