
"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Briefcase, Award, ExternalLink, Mail, Github, Linkedin, Globe, GraduationCap, Trophy, CheckCircle2 } from 'lucide-react';

const MOCK_USER = {
  fullName: "John Doe",
  email: "john.doe@university.edu",
  university: "Stanford University",
  major: "Computer Science",
  degree: "B.S.",
  graduationYear: "2026",
  bio: "Passionate about building scalable web applications and exploring the future of blockchain and AI.",
  points: 2450,
  skills: ["React", "Next.js", "TypeScript", "Python", "Tailwind CSS"],
  interests: ["Hackathons", "AI/ML", "Open Source", "Startups"]
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

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Identity & Contact */}
          <div className="space-y-6">
            <Card className="border-none shadow-soft overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary to-tech" />
              <CardContent className="relative pt-0 px-6 pb-8">
                <Avatar className="w-24 h-24 border-4 border-background absolute -top-12 shadow-lg">
                  <AvatarFallback className="bg-primary text-white text-xl font-bold">
                    {userData.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="pt-16 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold font-headline">{userData.fullName}</h1>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium mt-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{userData.major}, Class of {userData.graduationYear}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "{userData.bio || 'No bio provided yet.'}"
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div className="text-center">
                      <div className="text-xl font-bold text-tech">{userData.points || 0}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Collab Points</div>
                    </div>
                    <div className="text-center border-l">
                      <div className="text-xl font-bold text-creative">3</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Projects</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>{userData.university}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-foreground text-background rounded-xl h-11 mt-4" asChild>
                    <Link href="/settings">Edit Profile Settings</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft p-6 space-y-4">
              <h3 className="font-bold font-headline text-sm uppercase tracking-widest text-muted-foreground">Connect</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-muted/30">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-muted/30">
                  <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-muted/30">
                  <Globe className="w-4 h-4 text-green-600" /> Portfolio
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Domains & Portfolio */}
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <Award className="w-5 h-5 text-tech" /> Domain Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {userData.skills?.map((skill: string, i: number) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-4 py-2 text-sm rounded-xl border-2 border-primary/30 text-primary font-bold hover:bg-primary/5 transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <Star className="w-5 h-5 text-creative" /> Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {userData.interests?.map((interest: string, i: number) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm rounded-xl bg-muted/50 font-medium"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-hackathon" /> Active Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "AI Study Companion", role: "Frontend Developer", status: "In Progress" },
                  { title: "Campus Vote Blockchain", role: "Contributor", status: "Active" }
                ].map((project, idx) => (
                  <Card key={idx} className="border-none shadow-soft group hover:shadow-md transition-all">
                    <CardContent className="p-5 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.role}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">{project.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
