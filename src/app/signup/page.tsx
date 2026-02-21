
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
  Scale,
  Check,
  Star,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const INTEREST_CATEGORIES = [
  { id: 'hackathons', label: 'Hackathons', icon: <Rocket className="w-5 h-5" />, seed: 'coding' },
  { id: 'ai-ml', label: 'AI / ML', icon: <Brain className="w-5 h-5" />, seed: 'robotics' },
  { id: 'web-dev', label: 'Web Development', icon: <Code className="w-5 h-5" />, seed: 'web' },
  { id: 'app-dev', label: 'App Development', icon: <Smartphone className="w-5 h-5" />, seed: 'mobile' },
  { id: 'ui-ux', label: 'UI/UX Design', icon: <Palette className="w-5 h-5" />, seed: 'design' },
  { id: 'startups', label: 'Startups', icon: <Zap className="w-5 h-5" />, seed: 'startup' },
  { id: 'robotics', label: 'Robotics', icon: <Cpu className="w-5 h-5" />, seed: 'machine' },
  { id: 'blockchain', label: 'Blockchain', icon: <Database className="w-5 h-5" />, seed: 'crypto' },
  { id: 'data-science', label: 'Data Science', icon: <BarChart3 className="w-5 h-5" />, seed: 'analytics' },
  { id: 'open-source', label: 'Open Source', icon: <Globe className="w-5 h-5" />, seed: 'earth' },
  { id: 'social-impact', label: 'Social Impact', icon: <Heart className="w-5 h-5" />, seed: 'community' },
  { id: 'fintech', label: 'FinTech', icon: <Briefcase className="w-5 h-5" />, seed: 'finance' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, seed: 'secure' },
  { id: 'sustainability', label: 'Sustainability', icon: <Leaf className="w-5 h-5" />, seed: 'nature' },
  { id: 'bio-tech', label: 'BioTech', icon: <Microscope className="w-5 h-5" />, seed: 'science' },
  { id: 'marketing', label: 'Marketing', icon: <Megaphone className="w-5 h-5" />, seed: 'loud' },
  { id: 'creative-arts', label: 'Creative Arts', icon: <Music className="w-5 h-5" />, seed: 'music' },
  { id: 'film-video', label: 'Film & Video', icon: <Video className="w-5 h-5" />, seed: 'camera' },
  { id: 'legal-tech', label: 'Legal Tech', icon: <Scale className="w-5 h-5" />, seed: 'law' },
  { id: 'innovation', label: 'Innovation', icon: <Lightbulb className="w-5 h-5" />, seed: 'bulb' },
];

const TECH_SKILLS = [
  'React', 'Next.js', 'Node.js', 'Python', 'Solidity', 'AWS', 'Docker', 
  'TensorFlow', 'Flutter', 'TypeScript', 'SQL', 'MongoDB', 'Go', 
  'Rust', 'Kubernetes', 'Firebase', 'GraphQL', 'Django', 'C++', 'Java'
];

const NON_TECH_SKILLS = [
  'Photography', 'Graphic Design', 'Project Management', 'UI/UX', 
  'User Research', 'Marketing', 'Business Strategy', 'Content Writing'
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('Stanford University');

  const handleNext = () => {
    if (step === 2) {
      if (!fullName || fullName.trim().length < 2) {
        toast({ variant: "destructive", title: "Invalid Name", description: "Please enter your full name (min 2 characters)." });
        return;
      }
      if (!email || !email.includes('@')) {
        toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid college email address." });
        return;
      }
      if (!password || password.length < 6) {
        toast({ variant: "destructive", title: "Weak Password", description: "Password must be at least 6 characters." });
        return;
      }
    }
    setStep(step + 1);
  };
  
  const handleBack = () => setStep(step - 1);

  const toggleSkill = (skill: string) => {
    setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const toggleInterest = (id: string) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const onFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const { auth, db } = initializeFirebase();

    try {
      // 1. Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Prepare the profile data (Matching exactly with input name)
      const profileData = {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        university,
        skills,
        interests,
        points: 100,
        rating: 5.0,
        isEducator: false,
        username: email.split('@')[0],
        bio: `New collaborator joining from ${university}. Ready to build!`,
        graduationYear: "2026"
      };

      // 3. Save to Firestore
      await setDoc(doc(db, 'users', user.uid), profileData);

      toast({
        title: "Genesis Complete!",
        description: `Welcome to CampusConnect, ${profileData.fullName}!`,
      });
      
      // 4. Redirect to the collaboration home page
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Signup error:", error);
      let message = error.message || "An error occurred during account creation.";
      
      if (error.code === 'auth/operation-not-allowed') {
        message = "Email/Password sign-in is not enabled. Please go to the Firebase Console and enable 'Email/Password' under the Authentication > Sign-in method tab.";
      } else if (error.code === 'auth/email-already-in-use') {
        message = "An account with this email already exists. Try logging in instead.";
      } else if (error.code === 'auth/weak-password') {
        message = "The password is too weak. Please choose a stronger one.";
      }

      toast({
        variant: "destructive",
        title: "Registration Error",
        description: message,
      });
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6 relative">
              <Star className="absolute -top-4 -left-4 w-6 h-6 text-primary/20 animate-pulse" />
              <Star className="absolute top-0 -right-4 w-4 h-4 text-primary/40 animate-bounce" />
              <h3 className="text-3xl font-bold font-headline">Select Your Domains</h3>
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
                      "px-5 py-2.5 cursor-pointer transition-all border-primary/20 rounded-xl font-bold",
                      skills.includes(skill) ? "bg-primary text-white scale-105 shadow-lg shadow-primary/20" : "hover:bg-primary/5 hover:border-primary/40"
                    )}
                  >
                    {skill} {skills.includes(skill) ? <X className="w-3.5 h-3.5 ml-1.5" /> : <Plus className="w-3.5 h-3.5 ml-1.5" />}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <Label className="text-lg font-bold flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary/70" /> Creative & Professional
              </Label>
              <div className="flex flex-wrap gap-2">
                {NON_TECH_SKILLS.map(skill => (
                  <Badge 
                    key={skill} 
                    variant={skills.includes(skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-5 py-2.5 cursor-pointer transition-all border-primary/20 rounded-xl font-bold",
                      skills.includes(skill) ? "bg-primary text-white scale-105 shadow-lg shadow-primary/20" : "hover:bg-primary/5 hover:border-primary/40"
                    )}
                  >
                    {skill} {skills.includes(skill) ? <X className="w-3.5 h-3.5 ml-1.5" /> : <Plus className="w-3.5 h-3.5 ml-1.5" />}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold font-headline">Profile Identity</h3>
              <p className="text-sm text-muted-foreground">How should the community address you?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="font-bold">Full Name</Label>
                <Input 
                  placeholder="John Doe" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  className="h-12 rounded-2xl" 
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">College Email</Label>
                <Input 
                  placeholder="john@university.edu" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="h-12 rounded-2xl" 
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Create Password</Label>
                <Input 
                  placeholder="Min 6 characters" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="h-12 rounded-2xl" 
                />
              </div>
            </div>
            <div className="p-8 bg-muted/20 rounded-[2rem] border-2 border-primary/5 space-y-6">
              <div className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-primary">
                <GraduationCap className="w-5 h-5" />
                <span>Academic Verification</span>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">University</Label>
                <Input 
                  placeholder="University Name" 
                  value={university} 
                  onChange={(e) => setUniversity(e.target.value)} 
                  className="h-11 rounded-xl" 
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold font-headline">Passion Board</h3>
              <p className="text-sm text-muted-foreground">Choose the fields you want to disrupt.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {INTEREST_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => toggleInterest(cat.id)}
                  className={cn(
                    "relative rounded-[2rem] overflow-hidden cursor-pointer group transition-all duration-500 border-4 aspect-square shadow-soft hover:-translate-y-1",
                    interests.includes(cat.id) ? "border-primary scale-[0.98] shadow-xl shadow-primary/10" : "border-transparent"
                  )}
                >
                  <img src={`https://picsum.photos/seed/${cat.seed}/400/400`} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white font-bold text-xs gap-3 backdrop-blur-[1px] group-hover:bg-black/40 transition-colors">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="leading-tight">{cat.label}</span>
                  </div>
                  {interests.includes(cat.id) && (
                    <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in duration-500 text-center py-10 flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
              <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner relative z-10">
                <Trophy className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-headline">Genesis Complete</h3>
              <p className="text-muted-foreground text-lg">You've earned 100 Collab Points for joining the ecosystem.</p>
            </div>
            <div className="flex gap-2 pt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star 
                  key={i} 
                  className={cn("w-6 h-6", i <= 4 ? "text-yellow-500 fill-yellow-500" : "text-muted/30")} 
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Star className="absolute top-[10%] left-[5%] w-12 h-12 text-primary/5 rotate-12" />
        <Star className="absolute top-[80%] right-[10%] w-20 h-20 text-primary/5 -rotate-12" />
        <div className="absolute top-[40%] right-[-5%] w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl space-y-10 relative z-10">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
              <Logo className="text-white w-7 h-7" />
            </div>
            <span className="font-headline font-bold text-3xl tracking-tighter">CampusConnect</span>
          </Link>
          <div className="max-w-md mx-auto space-y-2">
            <Progress value={(step / 4) * 100} className="h-2.5 rounded-full bg-primary/10" />
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">
              <span>Origin</span>
              <span>Identity</span>
              <span>Vision</span>
              <span>Launch</span>
            </div>
          </div>
        </div>

        <Card className="border-none shadow-soft overflow-hidden bg-white rounded-[3rem]">
          <CardHeader className="bg-white border-b px-10 py-10">
            <CardTitle className="text-4xl font-black font-headline text-primary">Onboarding Flow</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[500px] p-10">
            {renderStep()}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-10 bg-muted/10">
            {step > 1 ? (
              <Button variant="ghost" onClick={handleBack} disabled={isSubmitting} className="h-12 px-8 rounded-2xl font-bold">Back</Button>
            ) : <div />}
            {step < 4 ? (
              <Button onClick={handleNext} className="ml-auto h-12 px-10 rounded-2xl font-bold bg-primary text-white shadow-lg shadow-primary/20">Continue</Button>
            ) : (
              <Button 
                onClick={onFinalSubmit} 
                disabled={isSubmitting} 
                className="ml-auto h-14 px-12 rounded-2xl font-bold bg-primary text-white shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Launch Dashboard'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
