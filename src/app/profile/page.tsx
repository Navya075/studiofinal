"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Briefcase, 
  Award, 
  Mail, 
  GraduationCap,
  ExternalLink,
  MapPin,
  Calendar,
  Trophy,
  Cpu,
  Copy,
  Check,
  Link as LinkIcon,
  Camera,
  ImageIcon,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MOCK_USER = {
  fullName: "John Doe",
  email: "john.doe@university.edu",
  university: "Stanford University",
  major: "Computer Science",
  degree: "B.S.",
  graduationYear: "2026",
  bio: "Passionate about building scalable web applications and exploring the future of blockchain and AI. Always looking for innovative hackathon teams.",
  points: 2450,
  rating: 4.8,
  skills: ["React", "Next.js", "TypeScript", "Python", "Tailwind CSS", "Node.js", "Firebase", "Solidity"],
  interests: ["Hackathons", "AI/ML", "Open Source", "Startups", "FinTech", "Cybersecurity"],
  username: "johndoe_dev"
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Image states
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cc_current_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData({ ...MOCK_USER, ...parsed });
        setProfileImage(`https://picsum.photos/seed/${parsed.fullName}/200/200`);
      } catch (e) {
        setUserData(MOCK_USER);
        setProfileImage(`https://picsum.photos/seed/johndoe/200/200`);
      }
    } else {
      setUserData(MOCK_USER);
      setProfileImage(`https://picsum.photos/seed/johndoe/200/200`);
    }
    setIsLoading(false);
  }, []);

  const handleCopyLink = () => {
    const profileUrl = `campusconnect.app/u/${userData?.username || 'user'}`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Profile URL has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'avatar') {
        setProfileImage(imageUrl);
        toast({ title: "Avatar Updated", description: "Your profile picture has been changed." });
      } else {
        setBannerImage(imageUrl);
        toast({ title: "Banner Updated", description: "Your profile banner has been changed." });
      }
    }
  };

  const handleRemoveImage = (type: 'avatar' | 'banner') => {
    if (type === 'avatar') {
      setProfileImage(null);
      toast({ title: "Avatar Removed", description: "Your profile picture has been reset." });
    } else {
      setBannerImage(null);
      toast({ title: "Banner Removed", description: "Your profile banner has been reset." });
    }
  };

  if (isLoading || !userData) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground font-headline font-bold text-xl">Loading Profile...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      {/* Profile Header / Banner */}
      <div 
        className="relative h-48 md:h-72 bg-gradient-to-r from-primary via-primary/80 to-primary/60 group transition-all"
        style={bannerImage ? { backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Banner Edit Buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex gap-2">
          <input 
            type="file" 
            ref={bannerInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => handleImageChange(e, 'banner')} 
          />
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full bg-white/90 backdrop-blur-sm gap-2 font-bold shadow-lg"
            onClick={() => bannerInputRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" /> Change Banner
          </Button>
          {bannerImage && (
            <Button 
              variant="destructive" 
              size="sm" 
              className="rounded-full gap-2 font-bold shadow-lg"
              onClick={() => handleRemoveImage('banner')}
            >
              <X className="w-4 h-4" /> Remove
            </Button>
          )}
        </div>

        <div className="max-w-6xl mx-auto px-4 relative h-full">
          {/* Centered Avatar with Edit Overlay */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 group/avatar">
            <div className="relative">
              <Avatar className="w-40 h-40 md:w-48 md:h-48 border-8 border-background shadow-2xl overflow-hidden bg-background">
                <AvatarImage src={profileImage || ''} className="object-cover" />
                <AvatarFallback className="bg-primary text-white text-4xl font-bold">
                  {userData.fullName.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Avatar Edit Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Camera className="w-6 h-6" />
                  </Button>
                  {profileImage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full"
                      onClick={() => handleRemoveImage('avatar')}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={avatarInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleImageChange(e, 'avatar')} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pt-32 pb-12">
        <div className="flex flex-col items-center space-y-12">
          
          {/* Centered Identity Section */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl w-full">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">{userData.fullName}</h1>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <GraduationCap className="w-6 h-6" />
                  <span>{userData.major} Student</span>
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full border border-yellow-500/20 font-bold text-sm">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span>{userData.rating || '4.5'} Rating</span>
                </div>
              </div>
            </div>

            {/* Aesthetic Profile Link Display */}
            <div className="flex items-center justify-center gap-2 bg-muted/50 px-6 py-3 rounded-full border border-primary/10 transition-all hover:bg-muted/70 group">
              <LinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-semibold text-muted-foreground">campusconnect.app/u/{userData.username || 'johndoe'}</span>
              <button 
                onClick={handleCopyLink}
                className="ml-2 p-1.5 hover:bg-background rounded-md transition-colors text-muted-foreground hover:text-primary"
                title="Copy profile link"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Contact Details Grid */}
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{userData.university}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Class of {userData.graduationYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{userData.email}</span>
              </div>
            </div>

            {/* Centered Bio */}
            <div className="relative w-full">
              <p className="text-lg leading-relaxed text-muted-foreground bg-white/40 backdrop-blur-sm p-10 rounded-[3rem] italic border border-primary/5 shadow-soft max-w-2xl mx-auto">
                "{userData.bio || 'Building the future of campus collaboration.'}"
              </p>
            </div>

            {/* Action Buttons & Aesthetic Links */}
            <div className="flex flex-col items-center gap-8 pt-4">
              <Button className="rounded-2xl h-14 px-12 text-lg font-bold bg-primary text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all" asChild>
                <Link href="/settings">Update Profile Details</Link>
              </Button>
              <div className="flex items-center gap-10">
                <Button variant="link" className="text-muted-foreground hover:text-primary font-bold text-base gap-2 p-0 h-auto uppercase tracking-widest decoration-2" asChild>
                  <Link href="https://github.com" target="_blank">
                    GitHub <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary font-bold text-base gap-2 p-0 h-auto uppercase tracking-widest decoration-2" asChild>
                  <Link href="https://linkedin.com" target="_blank">
                    LinkedIn <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Performance & Skills Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
            
            {/* Left Column - Achievement Cards */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="border-none shadow-soft overflow-hidden bg-white/80 backdrop-blur-sm rounded-[2.5rem]" asChild>
                <div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" /> Milestone Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-primary/5 shadow-sm hover:border-primary/40 transition-all">
                      <div className="space-y-1">
                        <div className="text-3xl font-black text-primary">{userData.points || 0}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Collab Points</div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold rounded-xl text-[10px]">TOP 5%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-primary/5 shadow-sm hover:border-primary/40 transition-all">
                      <div className="space-y-1">
                        <div className="text-3xl font-black text-primary">3</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Projects</div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1 font-bold rounded-xl text-[10px]">ACTIVE</Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Passion Areas Cards */}
              <Card className="border-none shadow-soft bg-white/80 backdrop-blur-sm rounded-[2.5rem]" asChild>
                <div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" /> Vision & Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2.5">
                      {userData.interests?.map((interest: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-white border-2 border-primary/5 text-xs py-2 px-4 rounded-2xl font-bold shadow-sm hover:border-primary/20 transition-all">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Right Column - Domain Skills */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Skills Grid */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-primary/10 pb-6">
                  <h2 className="text-3xl font-bold font-headline flex items-center gap-4">
                    <Award className="w-8 h-8 text-primary" /> Domain Expertise
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {userData.skills?.length > 0 ? (
                    userData.skills.map((skill: string, i: number) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="px-8 py-4 text-base rounded-[1.5rem] border-2 border-primary/5 text-foreground font-bold hover:border-primary/30 hover:bg-primary/[0.03] transition-all cursor-default shadow-sm bg-white"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Add your domain badges from settings.</p>
                  )}
                </div>
              </section>

              {/* Aesthetic Portfolio Grid */}
              <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-primary/10 pb-6">
                  <h2 className="text-3xl font-bold font-headline flex items-center gap-4">
                    <Briefcase className="w-8 h-8 text-primary" /> Active Roadmap
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "AI Study Companion", role: "Lead Architect", status: "80% Complete", color: "bg-primary", members: 3 },
                    { title: "Campus Vote Protocol", role: "Smart Contract dev", status: "Active", color: "bg-primary/60", members: 2 }
                  ].map((project, idx) => (
                    <Card key={idx} className="border-none shadow-soft group hover:shadow-xl transition-all bg-white overflow-hidden rounded-[3rem] border border-transparent hover:border-primary/10" asChild>
                      <div>
                        <div className={`h-3 w-full ${project.color}`} />
                        <CardContent className="p-8">
                          <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                              <h4 className="font-bold text-2xl group-hover:text-primary transition-colors">{project.title}</h4>
                              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.25em]">{project.role}</p>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-xl text-[9px] font-black px-3 py-1 uppercase tracking-widest">
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mb-8">
                            <div className="flex -space-x-3">
                              {[1, 2, 3].map(i => (
                                <Avatar key={i} className="w-10 h-10 border-4 border-white shadow-sm">
                                  <AvatarImage src={`https://picsum.photos/seed/team${i}${idx}/50/50`} />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{project.members} Team Members</span>
                          </div>
                          <Button variant="secondary" className="w-full justify-between text-xs font-black uppercase tracking-widest rounded-2xl h-14 border-2 border-transparent hover:border-primary/20 bg-muted/30 group/btn" asChild>
                            <Link href="/dashboard">
                              Enter Room <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </Link>
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  
                  {/* Styled Add Project Card */}
                  <Card className="border-4 border-dashed border-primary/10 bg-transparent shadow-none flex flex-col items-center justify-center p-10 text-center space-y-6 hover:border-primary/40 hover:bg-primary/[0.02] transition-all cursor-pointer rounded-[3rem] group min-h-[300px]" asChild>
                    <Link href="/dashboard">
                      <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500 shadow-inner">
                        <Cpu className="w-10 h-10 text-primary/40 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold text-foreground">Initiate Project</h4>
                        <p className="text-sm text-muted-foreground font-semibold">Ready to lead your next big idea?</p>
                      </div>
                    </Link>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}