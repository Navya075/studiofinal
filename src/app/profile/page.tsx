"use client";

import { useState, useEffect } from 'react';
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
  Github, 
  Linkedin, 
  Globe, 
  GraduationCap,
  ExternalLink,
  MapPin,
  Calendar,
  Trophy,
  Cpu
} from 'lucide-react';

const MOCK_USER = {
  fullName: "John Doe",
  email: "john.doe@university.edu",
  university: "Stanford University",
  major: "Computer Science",
  degree: "B.S.",
  graduationYear: "2026",
  bio: "Passionate about building scalable web applications and exploring the future of blockchain and AI. Always looking for innovative hackathon teams.",
  points: 2450,
  skills: ["React", "Next.js", "TypeScript", "Python", "Tailwind CSS", "Node.js", "Firebase", "Solidity"],
  interests: ["Hackathons", "AI/ML", "Open Source", "Startups", "FinTech", "Cybersecurity"]
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to load from localStorage, fallback to MOCK_USER
    const stored = localStorage.getItem('cc_current_user');
    if (stored) {
      try {
        setUserData(JSON.parse(stored));
      } catch (e) {
        setUserData(MOCK_USER);
      }
    } else {
      setUserData(MOCK_USER);
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !userData) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground font-headline font-bold">Loading Profile...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      {/* Profile Header / Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary via-creative to-tech">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-6xl mx-auto px-4 relative h-full">
          <div className="absolute -bottom-16 left-4 md:left-8">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-8 border-background shadow-2xl">
              <AvatarImage src={`https://picsum.photos/seed/${userData.fullName}/200/200`} />
              <AvatarFallback className="bg-primary text-white text-3xl font-bold">
                {userData.fullName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - User Identity & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">{userData.fullName}</h1>
                <p className="text-primary font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  {userData.major} Student
                </p>
              </div>

              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground/60" />
                  <span>{userData.university}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground/60" />
                  <span>Class of {userData.graduationYear}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground/60" />
                  <span>{userData.email}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded-2xl italic border border-muted/50">
                "{userData.bio || 'Building the future of campus collaboration.'}"
              </p>

              <div className="flex gap-2">
                <Button className="flex-1 rounded-xl h-11 font-bold" asChild>
                  <Link href="/settings">Edit Profile</Link>
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-muted/30">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-muted/30">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </Button>
              </div>
            </div>

            <Card className="border-none shadow-soft overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-hackathon" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border shadow-sm">
                  <div className="space-y-0.5">
                    <div className="text-lg font-bold text-primary">{userData.points || 0}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Collab Points</div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Top 5%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border shadow-sm">
                  <div className="space-y-0.5">
                    <div className="text-lg font-bold text-creative">3</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Projects Joined</div>
                  </div>
                  <Badge className="bg-creative/10 text-creative border-creative/20">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills & Projects */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Skills Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" /> Domain Expertise
                </h2>
                <Button variant="link" className="text-primary text-xs font-bold uppercase tracking-widest p-0 h-auto">Update Skills</Button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {userData.skills?.length > 0 ? (
                  userData.skills.map((skill: string, i: number) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="px-4 py-2 text-sm rounded-xl border-2 border-primary/10 text-foreground font-semibold hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default shadow-sm"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Add your technical and creative badges.</p>
                )}
              </div>
            </section>

            {/* Interests Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <Star className="w-5 h-5 text-creative" /> Vision Areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {userData.interests?.length > 0 ? (
                  userData.interests.map((interest: string, i: number) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-default group"
                    >
                      <div className="w-2 h-2 rounded-full bg-creative/40 group-hover:bg-creative transition-colors" />
                      <span className="text-sm font-medium">{interest}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Define your collaboration interests.</p>
                )}
              </div>
            </section>

            {/* Active Projects Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-hackathon" /> Project Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "AI Study Companion", role: "Frontend Developer", status: "In Progress", color: "bg-creative" },
                  { title: "Campus Vote Blockchain", role: "Backend Contributor", status: "Active", color: "bg-primary" }
                ].map((project, idx) => (
                  <Card key={idx} className="border-none shadow-soft group hover:shadow-lg transition-all bg-white overflow-hidden">
                    <div className={`h-1.5 w-full ${project.color}`} />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{project.title}</h4>
                          <p className="text-xs text-muted-foreground font-medium">{project.role}</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 rounded-lg text-[10px] font-bold">
                          {project.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full justify-between text-xs font-bold text-muted-foreground hover:text-primary rounded-lg group/btn" asChild>
                        <Link href="/dashboard">
                          Go to Team Room <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Empty State / Add Project */}
                <Card className="border-2 border-dashed border-muted bg-transparent shadow-none flex flex-col items-center justify-center p-6 text-center space-y-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">New Adventure?</h4>
                    <p className="text-[10px] text-muted-foreground">Start a new project or join a team</p>
                  </div>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
