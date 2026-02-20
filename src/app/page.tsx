import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Rocket, Users, Code, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-collab');

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 px-4 py-1">
              🚀 Elevating Campus Synergy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1]">
              Connect Skills. <br />
              Build Ideas. <br />
              <span className="text-primary">Collaborate Better.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              CampusConnect bridges the gap between ambitious students. Find teammates, launch projects, and grow your portfolio within your university ecosystem.
            </p>
            
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                <span className="text-foreground font-bold">500+</span> students already collaborating
              </p>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right duration-700">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full z-0" />
            <div className="relative z-10 glass p-2 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={heroImg?.imageUrl || ''} 
                alt={heroImg?.description || ''} 
                width={1200}
                height={800}
                className="rounded-xl object-cover"
                priority
                data-ai-hint="campus collaboration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="features" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold">The Campus Collaboration Gap</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Brilliant minds are scattered across campus. CampusConnect brings them together through a unified ecosystem designed for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Skill Matching",
                desc: "Find teammates with the exact technical or creative skills your project needs using our AI-driven badge system."
              },
              {
                icon: <Code className="w-8 h-8 text-creative" />,
                title: "Unified Team Rooms",
                desc: "A central hub for chat, file sharing, and video calls. Stop juggling between Discord, WhatsApp and Slack."
              },
              {
                icon: <Rocket className="w-8 h-8 text-hackathon" />,
                title: "Project Discovery",
                desc: "Browse hackathons, research opportunities, and startups. Filter by your personal skill set to find the perfect fit."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-background hover:shadow-lg transition-all border border-transparent hover:border-primary/20 group">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Built for Students, <br /><span className="text-primary">By Visionaries.</span></h2>
            <p className="text-muted-foreground text-lg">
              We've combined the best of professional networks, community tools, and version control collaboration to create a seamless experience.
            </p>
            <ul className="space-y-4">
              {[
                "AI-Suggested Skill Badges",
                "Private Team Collaboration Rooms",
                "Verified University Profiles",
                "Peer Feedback & Rating System"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4 pt-12">
               <div className="glass p-6 rounded-2xl text-center">
                 <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
                 <div className="text-2xl font-bold">50+</div>
                 <div className="text-sm text-muted-foreground">Colleges</div>
               </div>
               <div className="glass p-6 rounded-2xl text-center bg-white/40">
                 <Sparkles className="w-10 h-10 text-creative mx-auto mb-4" />
                 <div className="text-2xl font-bold">1.2k</div>
                 <div className="text-sm text-muted-foreground">Projects Launched</div>
               </div>
             </div>
             <div className="space-y-4">
               <div className="glass p-6 rounded-2xl text-center bg-white/40">
                 <Users className="w-10 h-10 text-mgmt mx-auto mb-4" />
                 <div className="text-2xl font-bold">5k+</div>
                 <div className="text-sm text-muted-foreground">Collaborators</div>
               </div>
               <div className="glass p-6 rounded-2xl text-center">
                 <Rocket className="w-10 h-10 text-hackathon mx-auto mb-4" />
                 <div className="text-2xl font-bold">200+</div>
                 <div className="text-sm text-muted-foreground">Hackathons</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-lg tracking-tighter">CampusConnect</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Community Guidelines</Link>
            <Link href="#">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CampusConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}