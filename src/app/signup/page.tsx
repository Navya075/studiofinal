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
  Activity,
  Music,
  Camera,
  Layers,
  Grid,
  Check,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { doc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { initializeFirebase, useUser } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toast } from '@/hooks/use-toast';

const INTEREST_CATEGORIES = [
  { id: 'hackathons', label: 'Hackathons', icon: <Rocket className="w-5 h-5" />, image: 'https://picsum.photos/seed/hack/400/300' },
  { id: 'ai-ml', label: 'AI / ML', icon: <Brain className="w-5 h-5" />, image: 'https://picsum.photos/seed/ai/400/400' },
  { id: 'web-dev', label: 'Web Development', icon: <Code className="w-5 h-5" />, image: 'https://picsum.photos/seed/web/400/500' },
  { id: 'app-dev', label: 'App Development', icon: <Smartphone className="w-5 h-5" />, image: 'https://picsum.photos/seed/app/400/350' },
  { id: 'ui-ux', label: 'UI/UX Design', icon: <Palette className="w-5 h-5" />, image: 'https://picsum.photos/seed/design/400/450' },
  { id: 'startups', label: 'Startups', icon: <Zap className="w-5 h-5" />, image: 'https://picsum.photos/seed/startup/400/300' },
  { id: 'robotics', label: 'Robotics', icon: <Layers className="w-5 h-5" />, image: 'https://picsum.photos/seed/robot/400/400' },
  { id: 'singing', label: 'Singing', icon: <Music className="w-5 h-5" />, image: 'https://picsum.photos/seed/sing/400/500' },
  { id: 'dance', label: 'Dance', icon: <Activity className="w-5 h-5" />, image: 'https://picsum.photos/seed/dance/400/320' },
  { id: 'photography', label: 'Photography', icon: <Camera className="w-5 h-5" />, image: 'https://picsum.photos/seed/photo/400/380' },
  { id: 'music', label: 'Music', icon: <Music className="w-5 h-5" />, image: 'https://picsum.photos/seed/music/400/300' },
  { id: 'cricket', label: 'Cricket', icon: <Activity className="w-5 h-5" />, image: 'https://picsum.photos/seed/cricket/400/400' },
  { id: 'football', label: 'Football', icon: <Activity className="w-5 h-5" />, image: 'https://picsum.photos/seed/football/400/350' },
  { id: 'chess', label: 'Chess', icon: <Grid className="w-5 h-5" />, image: 'https://picsum.photos/seed/chess/400/450' },
  { id: 'art', label: 'Art', icon: <Palette className="w-5 h-5" />, image: 'https://picsum.photos/seed/art/400/500' },
];

const TECH_SKILLS = [
  'React', 'Next.js', 'Node.js', 'Python', 'Solidity', 'AWS', 'Docker', 
  'TensorFlow', 'Flutter', 'TypeScript', 'PostgreSQL', 'Go', 'Rust', 
  'Kubernetes', 'GraphQL', 'MongoDB', 'Firebase', 'Django', 'C++', 'Unity'
];

const NON_TECH_SKILLS = [
  'Photography', 'Dance', 'Music', 'Cricket', 'Football', 'Chess', 'Art',
  'Public Speaking', 'Graphic Design', 'Copywriting', 'Project Management', 
  'UI/UX', 'SEO', 'Video Editing', 'Sales', 'Content Strategy', 
  'Financial Modeling', 'User Research', 'Product Pitching', 'Community Building'
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    major: '',
    degree: '',
    graduationYear: '',
    bio: '',
    skills: [] as string[],
    interests: [] as string[]
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill) 
        : [...prev.skills, skill]
    }));
  };

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    const { auth, db } = initializeFirebase();

    try {
      let currentUser = user;
      
      // Attempt anonymous sign in if no user exists
      if (!currentUser) {
        try {
          const cred = await signInAnonymously(auth);
          currentUser = cred.user;
        } catch (authError: any) {
          if (authError.code === 'auth/api-key-not-valid') {
            toast({
              variant: "destructive",
              title: "Firebase Config Error",
              description: "The API key in src/firebase/config.ts is invalid. Please update it with your actual key from the Firebase Console.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Authentication Failed",
              description: authError.message || "Could not sign in. Please check your internet connection.",
            });
          }
          setIsSubmitting(false);
          return;
        }
      }

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const profileData = {
          ...formData,
          email: formData.email || currentUser.email || '',
          rating: 5,
          points: 100,
          preferredRole: formData.skills[0] || 'Contributor',
          availability: 'Flexible',
        };

        setDoc(userRef, profileData, { merge: true })
          .then(() => {
            router.push('/dashboard');
          })
          .catch(async (err) => {
            const permissionError = new FirestorePermissionError({
              path: userRef.path,
              operation: 'write',
              requestResourceData: profileData,
            });
            errorEmitter.emit('permission-error', permissionError);
          });
      }
    } catch (error: any) {
      console.error("Error during onboarding finish:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message || "An unexpected error occurred during onboarding.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-4 py-2 cursor-pointer transition-all border-primary/30 rounded-xl",
                      formData.skills.includes(skill) ? "bg-primary text-white scale-105" : "hover:bg-primary/10"
                    )}
                  >
                    {skill} {formData.skills.includes(skill) ? <X className="w-3 h-3 ml-1" /> : <Plus className="w-3 h-3 ml-1" />}
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
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-4 py-2 cursor-pointer transition-all border-creative/30 rounded-xl",
                      formData.skills.includes(skill) ? "bg-creative text-white scale-105" : "hover:bg-creative/10 text-creative"
                    )}
                  >
                    {skill} {formData.skills.includes(skill) ? <X className="w-3 h-3 ml-1" /> : <Plus className="w-3 h-3 ml-1" />}
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
                <Input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>College Email</Label>
                <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@university.edu" type="email" />
              </div>
            </div>
            <div className="p-5 bg-muted/20 rounded-2xl border space-y-5">
              <div className="flex items-center gap-2 font-bold text-sm">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Education Background</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="University" value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})} />
                <Input placeholder="Major" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} />
                <Input placeholder="Degree" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} />
                <Input placeholder="Graduation Year" value={formData.graduationYear} onChange={e => setFormData({...formData, graduationYear: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="What drives you?" className="resize-none h-28 rounded-xl" />
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
              {INTEREST_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => toggleInterest(cat.id)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border-2",
                    formData.interests.includes(cat.id) ? "border-primary shadow-xl scale-[0.98]" : "border-transparent"
                  )}
                >
                  <img src={cat.image} alt={cat.label} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center">
                    <span className="font-bold text-white text-xs">{cat.label}</span>
                  </div>
                  {formData.interests.includes(cat.id) && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Verification</h3>
              <p className="text-muted-foreground">Ready to launch your collaborative journey?</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
               <p className="text-sm text-center font-bold">You've earned 100 Collab Points!</p>
            </div>
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
            {step > 1 && <Button variant="outline" onClick={handleBack}>Back</Button>}
            {step < 4 ? (
              <Button onClick={handleNext} className="ml-auto">Continue</Button>
            ) : (
              <Button onClick={handleFinish} disabled={isSubmitting} className="ml-auto bg-primary text-white">
                {isSubmitting ? 'Finalizing...' : 'Launch Dashboard'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
