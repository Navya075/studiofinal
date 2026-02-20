import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Briefcase, Award, ExternalLink, Mail, Github, Linkedin, Globe, GraduationCap, Trophy, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
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
                  <AvatarImage src="https://picsum.photos/seed/user/200/200" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="pt-16 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold font-headline">John Doe</h1>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium mt-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>Computer Science, 3rd Year</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-hackathon font-bold">
                        <Star className="w-4 h-4 fill-hackathon" /> 4.9
                      </div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">12 Reviews</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "Building scalable web applications and exploring blockchain. Looking for teams to innovate in the upcoming campus hackathon!"
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div className="text-center">
                      <div className="text-xl font-bold text-tech">850</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Collab Points</div>
                    </div>
                    <div className="text-center border-l">
                      <div className="text-xl font-bold text-creative">15</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Projects</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <Github className="w-4 h-4" />
                      <span>github.com/johndoe</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <Linkedin className="w-4 h-4" />
                      <span>linkedin.com/in/johndoe</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <Mail className="w-4 h-4" />
                      <span>john.doe@university.edu</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <Globe className="w-4 h-4" />
                      <span>johndoe.dev</span>
                    </div>
                  </div>

                  <Button className="w-full bg-foreground text-background rounded-xl h-11 mt-4">Edit Profile Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft p-6">
              <h3 className="font-bold font-headline mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-hackathon" /> Academic Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dean's List</div>
                    <div className="text-sm font-medium">Spring 2023, Fall 2023</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-tech/10 rounded-lg">
                    <Trophy className="w-4 h-4 text-tech" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Hackathon Winner</div>
                    <div className="text-sm font-medium">1st Place - Campus Blockathon</div>
                  </div>
                </div>
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
                {[
                  { name: 'React', level: 'Advanced', color: 'tech' },
                  { name: 'Node.js', level: 'Advanced', color: 'tech' },
                  { name: 'UI/UX Design', level: 'Intermediate', color: 'creative' },
                  { name: 'Project Management', level: 'Intermediate', color: 'mgmt' },
                  { name: 'Public Speaking', level: 'Advanced', color: 'creative' },
                  { name: 'Solidity', level: 'Beginner', color: 'tech' },
                ].map((skill, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className={`px-4 py-2 text-sm rounded-xl border-2 border-${skill.color}/30 text-${skill.color} font-bold hover:bg-${skill.color}/5 transition-colors cursor-default`}
                  >
                    {skill.name} • {skill.level}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-mgmt" /> Collaborative Projects
                </h2>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Campus Voting App', type: 'Club Project', role: 'Fullstack Dev', status: 'Live', verified: true },
                  { title: 'Study Buddy AI', type: 'Startup', role: 'UI/UX Lead', status: 'Beta', verified: false },
                  { title: 'Green Campus Initiative', type: 'Hackathon', role: 'Contributor', status: 'Completed', verified: false },
                  { title: 'DeFi University Hub', type: 'Competition', role: 'Team Lead', status: 'In Progress', verified: false },
                ].map((project, i) => (
                  <Card key={i} className="border-none shadow-soft p-5 group cursor-pointer hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest">{project.type}</Badge>
                        {project.verified && <CheckCircle2 className="w-3 h-3 text-tech" />}
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1" />
                    </div>
                    <h4 className="font-bold mb-1 text-lg group-hover:text-primary transition-colors">{project.title}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-muted-foreground font-medium">Role: {project.role}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${project.status === 'Completed' || project.status === 'Live' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`} />
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">{project.status}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-creative" /> Peer Recommendations
              </h2>
              <div className="space-y-4">
                {[
                  { user: 'Sara Chen', rating: 5, text: 'John is an exceptional React developer. His ability to translate complex design specs into code is impressive.', date: 'Dec 02, 2023' },
                  { user: 'Alex Rivers', rating: 5, text: 'A natural leader. John kept the team focused and motivated during the 48-hour grind.', date: 'Nov 15, 2023' },
                ].map((review, i) => (
                  <Card key={i} className="border-none shadow-soft p-6 flex gap-4 bg-white/50 backdrop-blur-sm">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/reco${i}/100/100`} />
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-base">{review.user}</h4>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{review.date}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-hackathon fill-hackathon' : 'text-muted'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{review.text}"
                      </p>
                    </div>
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
