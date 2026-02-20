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
          {/* Centered Avatar */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
            <Avatar className="w-32 h-32 md:w-44 md:h-44 border-8 border-background shadow-2xl">
              <AvatarImage src={`https://picsum.photos/seed/${userData.fullName}/200/200`} />
              <AvatarFallback className="bg-primary text-white text-3xl font-bold">
                {userData.fullName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - User Identity & Contact (Centered Header) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-bold font-headline tracking-tight">{userData.fullName}</h1>
                <p className="text-primary font-bold text-lg flex items-center justify-center lg:justify-start gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {userData.major} Student
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start gap-2.5 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <span>{userData.university}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary/60" />
                  <span>Class of {userData.graduationYear}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary/60" />
                  <span>{userData.email}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-6 rounded-3xl italic border border-muted/50 max-w-sm">
                "{userData.bio || 'Building the future of campus collaboration.'}"
              </p>

              <div className="flex gap-2 w-full max-w-xs">
                <Button className="flex-1 rounded-xl h-12 font-bold bg-primary text-white shadow-lg shadow-primary/20" asChild>
                  <Link href="/settings">Edit Profile</Link>
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2 border-muted/30 hover:bg-muted/10">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2 border-muted/30 hover:bg-muted/10">
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
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border shadow-sm group hover:border-primary/30 transition-all">
                  <div className="space-y-0.5">
                    <div className="text-xl font-black text-primary">{userData.points || 0}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Collab Points</div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold">Top 5%</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border shadow-sm group hover:border-creative/30 transition-all">
                  <div className="space-y-0.5">
                    <div className="text-xl font-black text-creative">3</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Projects Joined</div>
                  </div>
                  <Badge className="bg-creative/10 text-creative border-creative/20 px-3 py-1 font-bold">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills & Projects */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Skills Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" /> Domain Expertise
                </h2>
                <Button variant="link" className="text-primary text-xs font-bold uppercase tracking-widest p-0 h-auto">Update Skills</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {userData.skills?.length > 0 ? (
                  userData.skills.map((skill: string, i: number) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="px-5 py-3 text-sm rounded-2xl border-2 border-primary/10 text-foreground font-semibold hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default shadow-sm bg-white"
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
              <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                <Star className="w-6 h-6 text-creative" /> Vision Areas
              </h2>
              <div className="flex flex-wrap gap-4">
                {userData.interests?.length > 0 ? (
                  userData.interests.map((interest: string, i: number) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 px-6 py-4 bg-white rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-default group hover:border-creative/20"
                    >
                      <div className="w-3 h-3 rounded-full bg-creative/40 group-hover:bg-creative transition-colors" />
                      <span className="text-sm font-bold">{interest}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Define your collaboration interests.</p>
                )}
              </div>
            </section>

            {/* Active Projects Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-hackathon" /> Project Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "AI Study Companion", role: "Frontend Developer", status: "In Progress", color: "bg-creative", members: 3 },
                  { title: "Campus Vote Blockchain", role: "Backend Contributor", status: "Active", color: "bg-primary", members: 2 }
                ].map((project, idx) => (
                  <Card key={idx} className="border-none shadow-soft group hover:shadow-xl transition-all bg-white overflow-hidden rounded-3xl">
                    <div className={`h-2 w-full ${project.color}`} />
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                          <h4 className="font-bold text-xl group-hover:text-primary transition-colors">{project.title}</h4>
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{project.role}</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 rounded-xl text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{project.members} Collaborators</span>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full justify-between text-xs font-bold text-muted-foreground hover:text-primary rounded-xl h-11 border-2 border-transparent hover:border-primary/10 group/btn" asChild>
                        <Link href="/dashboard">
                          Open Team Room <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Empty State / Add Project */}
                <Card className="border-4 border-dashed border-muted/50 bg-transparent shadow-none flex flex-col items-center justify-center p-8 text-center space-y-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer rounded-3xl group">
                  <div className="w-14 h-14 rounded-2xl bg-muted/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Cpu className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">New Adventure?</h4>
                    <p className="text-xs text-muted-foreground font-medium">Start a new project or join a team</p>
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
