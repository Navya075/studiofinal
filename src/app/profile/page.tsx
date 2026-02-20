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
  X,
  MessageSquare,
  Quote,
  Plus
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

const MOCK_FEEDBACK = [
  {
    id: 'f1',
    reviewer: 'Sara Chen',
    role: 'Backend Lead',
    comment: 'Incredibly reliable teammate. John solved a critical state management bug in our React app just hours before the hackathon deadline. A pleasure to work with!',
    rating: 5,
    date: 'Oct 2024',
    avatar: 'https://picsum.photos/seed/sara/100/100'
  },
  {
    id: 'f2',
    reviewer: 'Alex Rivers',
    role: 'Product Manager',
    comment: 'Great communicator. He bridges the gap between technical complexity and business requirements perfectly. Highly recommended for any fast-paced startup project.',
    rating: 4,
    date: 'Sep 2024',
    avatar: 'https://picsum.photos/seed/alex/100/100'
  },
  {
    id: 'f3',
    reviewer: 'Mike Johnson',
    role: 'Designer',
    comment: 'Very patient with UI revisions. John has a great eye for detail and respects the design system. Looking forward to our next collaboration.',
    rating: 5,
    date: 'Aug 2024',
    avatar: 'https://picsum.photos/seed/mike/100/100'
  }
];

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Image states
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const defaultBanner = PlaceHolderImages.find(img => img.id === 'default-banner')?.imageUrl;

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

  const activeBanner = bannerImage || defaultBanner;

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      {/* Profile Header / Banner */}
      <div 
        className="relative h-48 md:h-80 bg-muted group transition-all"
        style={{ backgroundImage: `url(${activeBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        
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
            className="rounded-full bg-white/90 backdrop-blur-sm gap-2 font-bold shadow-lg h-10 px-4"
            onClick={() => bannerInputRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" /> Change Banner
          </Button>
          {bannerImage && (
            <Button 
              variant="destructive" 
              size="sm" 
              className="rounded-full gap-2 font-bold shadow-lg h-10 px-4"
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
              <Avatar className="w-40 h-40 md:w-56 md:h-56 border-[10px] border-background shadow-2xl overflow-hidden bg-background">
                <AvatarImage src={profileImage || ''} className="object-cover" />
                <AvatarFallback className="bg-primary text-white text-5xl font-bold">
                  {userData.fullName.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Avatar Edit Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full cursor-pointer">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Camera className="w-8 h-8" />
                  </Button>
                  {profileImage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                      onClick={() => handleRemoveImage('avatar')}
                    >
                      <X className="w-8 h-8" />
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

      <main className="max-w-6xl mx-auto px-4 pt-36 pb-12">
        <div className="flex flex-col items-center space-y-16">
          
          {/* Centered Identity Section */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl w-full">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight text-foreground">{userData.fullName}</h1>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                  <GraduationCap className="w-7 h-7" />
                  <span>{userData.major} Student</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-5 py-2 rounded-full border border-yellow-500/20 font-black text-sm shadow-sm">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span>{userData.rating || '4.5'} AVG RATING</span>
                </div>
              </div>
            </div>

            {/* Aesthetic Profile Link Display */}
            <div className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full border border-primary/10 transition-all hover:bg-white/80 group shadow-soft">
              <LinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold text-muted-foreground tracking-tight">campusconnect.app/u/{userData.username || 'johndoe'}</span>
              <button 
                onClick={handleCopyLink}
                className="ml-3 p-2 hover:bg-primary/10 rounded-xl transition-all text-muted-foreground hover:text-primary"
                title="Copy profile link"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Contact Details Grid */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm text-muted-foreground font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{userData.university}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Class of {userData.graduationYear}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-primary" />
                <span>{userData.email}</span>
              </div>
            </div>

            {/* Centered Bio */}
            <div className="relative w-full">
              <p className="text-xl leading-relaxed text-muted-foreground bg-white/30 backdrop-blur-md p-12 rounded-[4rem] italic border border-primary/10 shadow-soft max-w-3xl mx-auto relative z-10">
                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-primary/10 -z-10" />
                "{userData.bio || 'Building the future of campus collaboration.'}"
              </p>
            </div>

            {/* Action Buttons & Aesthetic Links */}
            <div className="flex flex-col items-center gap-10 pt-6">
              <Button className="rounded-[2rem] h-16 px-16 text-xl font-black bg-primary text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1.5 transition-all" asChild>
                <Link href="/settings">Update Profile Details</Link>
              </Button>
              <div className="flex items-center gap-14">
                <Button variant="link" className="text-muted-foreground hover:text-primary font-black text-lg gap-2.5 p-0 h-auto uppercase tracking-[0.2em] decoration-4" asChild>
                  <Link href="https://github.com" target="_blank">
                    GitHub <ExternalLink className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary font-black text-lg gap-2.5 p-0 h-auto uppercase tracking-[0.2em] decoration-4" asChild>
                  <Link href="https://linkedin.com" target="_blank">
                    LinkedIn <ExternalLink className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
            
            {/* Left Column - Stats & Vision */}
            <div className="lg:col-span-4 space-y-10">
              <Card className="border-none shadow-soft overflow-hidden bg-white/70 backdrop-blur-sm rounded-[3rem] p-4" asChild>
                <div>
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500" /> Milestone Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-8 bg-white rounded-[2.5rem] border border-primary/5 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all group">
                      <div className="space-y-2">
                        <div className="text-4xl font-black text-primary group-hover:scale-110 transition-transform origin-left">{userData.points || 0}</div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Collab Points</div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 font-black rounded-2xl text-[10px] uppercase">TOP 5%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-8 bg-white rounded-[2.5rem] border border-primary/5 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all group">
                      <div className="space-y-2">
                        <div className="text-4xl font-black text-primary group-hover:scale-110 transition-transform origin-left">3</div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Live Projects</div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2 font-black rounded-2xl text-[10px] uppercase">ACTIVE</Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Passion Areas Cards */}
              <Card className="border-none shadow-soft bg-white/70 backdrop-blur-sm rounded-[3rem] p-4" asChild>
                <div>
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                      <Star className="w-5 h-5 text-primary" /> Vision & Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {userData.interests?.map((interest: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-white border-2 border-primary/5 text-xs py-3 px-6 rounded-2xl font-black shadow-sm hover:border-primary/20 hover:bg-primary/5 transition-all cursor-default">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Right Column - Domain Skills & Roadmap & Feedback */}
            <div className="lg:col-span-8 space-y-20">
              
              {/* Skills Grid */}
              <section className="space-y-10">
                <div className="flex items-center justify-between border-b-4 border-primary/5 pb-8">
                  <h2 className="text-4xl font-black font-headline flex items-center gap-6">
                    <Award className="w-10 h-10 text-primary" /> Domain Expertise
                  </h2>
                </div>
                <div className="flex flex-wrap gap-5">
                  {userData.skills?.length > 0 ? (
                    userData.skills.map((skill: string, i: number) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="px-10 py-5 text-lg rounded-[2rem] border-4 border-primary/5 text-foreground font-black hover:border-primary/30 hover:bg-primary/[0.04] transition-all cursor-default shadow-sm bg-white"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-lg text-muted-foreground italic font-medium">Add your domain badges from settings to stand out.</p>
                  )}
                </div>
              </section>

              {/* Teammate Feedback Section */}
              <section className="space-y-10">
                <div className="flex items-center justify-between border-b-4 border-primary/5 pb-8">
                  <h2 className="text-4xl font-black font-headline flex items-center gap-6">
                    <MessageSquare className="w-10 h-10 text-primary" /> Peer Feedback
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  {MOCK_FEEDBACK.map((review) => (
                    <Card key={review.id} className="border-none shadow-soft bg-white rounded-[3rem] overflow-hidden group hover:shadow-xl transition-all">
                      <CardContent className="p-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="shrink-0 space-y-4 flex flex-col items-center text-center w-full md:w-auto">
                          <Avatar className="w-20 h-20 border-4 border-primary/5 shadow-md">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="font-black text-sm">{review.reviewer}</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{review.role}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted/30'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 space-y-4 relative">
                          <Quote className="absolute -top-4 -left-4 w-10 h-10 text-primary/5 -z-0" />
                          <p className="text-lg text-muted-foreground leading-relaxed italic relative z-10">
                            "{review.comment}"
                          </p>
                          <div className="flex justify-end">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{review.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Aesthetic Roadmap Grid */}
              <section className="space-y-10">
                <div className="flex items-center justify-between border-b-4 border-primary/5 pb-8">
                  <h2 className="text-4xl font-black font-headline flex items-center gap-6">
                    <Briefcase className="w-10 h-10 text-primary" /> Active Roadmap
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { title: "AI Study Companion", role: "Lead Architect", status: "80% Complete", color: "bg-primary", members: 3 },
                    { title: "Campus Vote Protocol", role: "Smart Contract dev", status: "Active", color: "bg-primary/60", members: 2 }
                  ].map((project, idx) => (
                    <Card key={idx} className="border-none shadow-soft group hover:shadow-2xl transition-all bg-white overflow-hidden rounded-[3.5rem] border border-transparent hover:border-primary/10" asChild>
                      <div>
                        <div className={`h-4 w-full ${project.color}`} />
                        <CardContent className="p-10">
                          <div className="flex justify-between items-start mb-8">
                            <div className="space-y-2">
                              <h4 className="font-black text-3xl group-hover:text-primary transition-colors">{project.title}</h4>
                              <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.3em]">{project.role}</p>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-2xl text-[10px] font-black px-4 py-2 uppercase tracking-widest shadow-sm">
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-5 mb-10">
                            <div className="flex -space-x-4">
                              {[1, 2, 3].map(i => (
                                <Avatar key={i} className="w-12 h-12 border-4 border-white shadow-md">
                                  <AvatarImage src={`https://picsum.photos/seed/team${i}${idx}/50/50`} />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">{project.members} Team Members</span>
                          </div>
                          <Button variant="secondary" className="w-full justify-between text-[11px] font-black uppercase tracking-widest rounded-2xl h-16 border-4 border-transparent hover:border-primary/20 bg-muted/30 group/btn transition-all shadow-sm" asChild>
                            <Link href="/dashboard">
                              Enter Project Room <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  
                  {/* Styled Add Project Card */}
                  <Card className="border-[6px] border-dashed border-primary/5 bg-transparent shadow-none flex flex-col items-center justify-center p-12 text-center space-y-8 hover:border-primary/30 hover:bg-primary/[0.03] transition-all cursor-pointer rounded-[4rem] group min-h-[400px]" asChild>
                    <Link href="/dashboard">
                      <div className="w-24 h-24 rounded-[2.5rem] bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-700 shadow-inner">
                        <Cpu className="w-12 h-12 text-primary/30 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-3xl font-black text-foreground">Initiate Project</h4>
                        <p className="text-base text-muted-foreground font-bold tracking-tight">Ready to lead your next disruptive idea?</p>
                      </div>
                      <div className="p-4 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl shadow-primary/30">
                        <Plus className="w-6 h-6" />
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
