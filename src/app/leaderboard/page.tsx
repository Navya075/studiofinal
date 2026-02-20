"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Star, ArrowUp, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LEADERBOARD_DATA = [
  { id: '1', name: 'Rahul Verma', university: 'Stanford University', points: 2450, reviews: 42, role: 'Fullstack Developer', rank: 1, avatar: 'https://picsum.photos/seed/rahul/100/100' },
  { id: '2', name: 'Sara Chen', university: 'MIT', points: 2120, reviews: 38, role: 'Backend Specialist', rank: 2, avatar: 'https://picsum.photos/seed/sara/100/100' },
  { id: '3', name: 'Mike Johnson', university: 'UC Berkeley', points: 1980, reviews: 35, role: 'UI/UX Lead', rank: 3, avatar: 'https://picsum.photos/seed/mike/100/100' },
  { id: '4', name: 'John Doe', university: 'Harvard University', points: 850, reviews: 12, role: 'Frontend Dev', rank: 4, avatar: 'https://picsum.photos/seed/user/100/100' },
  { id: '5', name: 'Alex Rivers', university: 'CMU', points: 720, reviews: 15, role: 'Product Manager', rank: 5, avatar: 'https://picsum.photos/seed/alex/100/100' },
  { id: '6', name: 'Elena Gilbert', university: 'Stanford University', points: 650, reviews: 10, role: 'AI Researcher', rank: 6, avatar: 'https://picsum.photos/seed/elena/100/100' },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
              <Trophy className="w-4 h-4" /> Top Ranking
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Campus Innovators</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Recognizing students who build the future of our campus through teamwork.</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Rank 2 */}
            <div className="order-2 md:order-1 flex flex-col items-center space-y-4">
              <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-slate-300 shadow-xl group-hover:scale-105 transition-transform">
                  <AvatarImage src={LEADERBOARD_DATA[1].avatar} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                  <Medal className="w-5 h-5 text-slate-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">{LEADERBOARD_DATA[1].name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{LEADERBOARD_DATA[1].university}</p>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-bold">{LEADERBOARD_DATA[1].points} pts</Badge>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="order-1 md:order-2 flex flex-col items-center space-y-6 pb-12 md:pb-24">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <Avatar className="w-32 h-32 border-4 border-primary shadow-2xl relative z-10 group-hover:scale-105 transition-transform">
                  <AvatarImage src={LEADERBOARD_DATA[0].avatar} />
                  <AvatarFallback>RV</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-xl z-20">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-center relative z-10">
                <h3 className="font-bold text-2xl">{LEADERBOARD_DATA[0].name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{LEADERBOARD_DATA[0].university}</p>
                <Badge className="bg-primary text-white font-bold px-6 py-1 text-lg shadow-lg shadow-primary/20">{LEADERBOARD_DATA[0].points} pts</Badge>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="order-3 flex flex-col items-center space-y-4">
              <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-amber-600 shadow-xl group-hover:scale-105 transition-transform">
                  <AvatarImage src={LEADERBOARD_DATA[2].avatar} />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                  <Medal className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">{LEADERBOARD_DATA[2].name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{LEADERBOARD_DATA[2].university}</p>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 font-bold">{LEADERBOARD_DATA[2].points} pts</Badge>
              </div>
            </div>
          </div>

          {/* List Table */}
          <Card className="border-none shadow-soft overflow-hidden">
            <div className="p-6 bg-white border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-bold font-headline flex items-center gap-2 text-xl">
                <Star className="w-5 h-5 text-hackathon" /> Honorable Mentions
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search user..." className="pl-10 h-9 rounded-xl" />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl"><Filter className="w-4 h-4" /></Button>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="divide-y">
                {LEADERBOARD_DATA.slice(3).map((user) => (
                  <div key={user.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="text-lg font-bold text-muted-foreground w-6">#{user.rank}</div>
                      <Avatar className="w-12 h-12 border shadow-sm">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">{user.name}</h4>
                        <p className="text-xs text-muted-foreground">{user.university} • {user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 text-right">
                       <div className="hidden md:block">
                         <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reviews</div>
                         <div className="font-medium">{user.reviews} Projects</div>
                       </div>
                       <div>
                         <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Score</div>
                         <div className="flex items-center gap-2 font-bold text-lg">
                           {user.points} <ArrowUp className="w-4 h-4 text-green-500" />
                         </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}