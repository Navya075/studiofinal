"use client";

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { TeamSidebar } from '@/components/team/TeamSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, Plus, Paperclip, Smile, Mic, MicOff, Video, VideoOff, 
  PhoneOff, ScreenShare, Calendar as CalendarIcon, MoreVertical, 
  Search, File, Download, ExternalLink, Clock, CheckCircle2, 
  Star, Trophy, Award, RefreshCw, Globe, Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { MOCK_PROJECTS } from '@/app/dashboard/page';

const TEAM_MEMBERS = [
  { id: '1', name: 'John Doe', role: 'Team Lead / Frontend', skills: ['React', 'NextJS'], image: 'https://picsum.photos/seed/user/100/100' },
  { id: '2', name: 'Sara Chen', role: 'Backend Engineer', skills: ['Node', 'Solidity'], image: 'https://picsum.photos/seed/sara/100/100' },
  { id: '3', name: 'Mike Johnson', role: 'UI/UX Designer', skills: ['Figma', 'Prototyping'], image: 'https://picsum.photos/seed/mike/100/100' },
  { id: '4', name: 'Alex Rivers', role: 'Product Manager', skills: ['Strategy', 'Pitching'], image: 'https://picsum.photos/seed/alex/100/100' },
];

const INITIAL_TASKS = [
  { id: 't1', title: 'MVP Frontend Draft', date: 'Oct 24, 2024', status: 'In Progress', color: 'bg-blue-500', source: 'Internal' },
  { id: 't2', title: 'API Integration', date: 'Oct 26, 2024', status: 'To Do', color: 'bg-purple-500', source: 'Internal' },
  { id: 't3', title: 'Final Pitch Deck', date: 'Nov 02, 2024', status: 'Pending', color: 'bg-orange-500', source: 'Internal' },
];

const GOOGLE_CAL_EVENTS = [
  { id: 'g1', title: 'Sync with Mentors', date: 'Oct 25, 2024', status: 'Google Cal', color: 'bg-green-500', source: 'Google' },
  { id: 'g2', title: 'Campus Tech Meetup', date: 'Oct 28, 2024', status: 'Google Cal', color: 'bg-green-500', source: 'Google' },
];

export default function TeamRoomPage() {
  const params = useParams();
  const projectId = params?.id as string;
  
  const project = useMemo(() => {
    return MOCK_PROJECTS.find(p => p.id === projectId) || MOCK_PROJECTS[0];
  }, [projectId]);

  const [activeTab, setActiveTab] = useState('chat');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  
  // Google Calendar States
  const [isCalendarSynced, setIsCalendarSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleSyncGoogleCalendar = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsCalendarSynced(true);
      setIsSyncing(false);
      setTasks(prev => [...prev, ...GOOGLE_CAL_EVENTS]);
      toast({
        title: "Google Calendar Synced",
        description: "Your external events have been imported successfully.",
      });
    }, 1500);
  };

  const handleCompleteProject = () => {
    setShowRatingDialog(true);
    toast({
      title: "Project Completed! 🎉",
      description: "Time to celebrate and review your awesome teammates.",
    });
  };

  const submitRatings = () => {
    setShowRatingDialog(false);
    toast({
      title: "Ratings Submitted",
      description: "Your feedback helps the community grow. You've earned 50 collaboration points!",
    });
  };

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-6">
        <Card className="max-w-md w-full border-none shadow-soft text-center p-8 space-y-4">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold font-headline">Project Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">The project room you are looking for doesn't exist or you don't have access to it.</p>
          <Button variant="outline" className="w-full rounded-xl" asChild>
            <a href="/dashboard">Back to Feed</a>
          </Button>
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'chat':
        return (
          <div className="flex flex-col h-full animate-in fade-in duration-300">
            <header className="h-16 border-b flex items-center px-6 justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold font-headline truncate max-w-[200px]">{project.title}</h2>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleCompleteProject} variant="outline" className="border-tech text-tech hover:bg-tech/5 rounded-full px-4 h-9 text-xs font-bold gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Mark as Completed
                </Button>
                <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            </header>
            
            <ScrollArea className="flex-1 p-6 bg-muted/5">
              <div className="space-y-8 max-w-4xl mx-auto">
                {[
                  { user: 'Alex', text: 'Hey guys, did we finish the latest task for ' + project.title + '?', time: '10:05 AM', isSelf: false },
                  { user: 'Sara', text: 'Almost done. I am just finalizing the backend endpoints.', time: '10:07 AM', isSelf: false },
                  { user: 'John', text: 'I am working on the integration now. I will need those specs by tonight!', time: '10:15 AM', isSelf: true },
                ].map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-10 h-10 shrink-0 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/user${idx}/100/100`} />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`space-y-1 max-w-[75%] ${msg.isSelf ? 'items-end text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold">{msg.user}</span>
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isSelf ? 'bg-primary text-white rounded-tr-none' : 'bg-white rounded-tl-none border'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 bg-white border-t shrink-0">
              <div className="max-w-4xl mx-auto flex items-end gap-2 bg-muted/30 rounded-2xl p-2 border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-xl hover:bg-white"><Plus className="w-5 h-5" /></Button>
                <Input className="border-none bg-transparent shadow-none ring-0 focus-visible:ring-0 min-h-[40px]" placeholder="Type your message..." />
                <div className="flex items-center px-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white"><Paperclip className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white"><Smile className="w-5 h-5" /></Button>
                  <Button className="h-10 w-10 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 ml-2"><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'files':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
             <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold font-headline">Shared Workspace</h2>
                  <p className="text-muted-foreground">Assets for {project.title}.</p>
                </div>
                <Button className="bg-primary text-white rounded-xl gap-2 h-11 px-6 shadow-lg shadow-primary/10">
                  <Plus className="w-4 h-4" /> Upload File
                </Button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  { name: 'Documentation.pdf', size: '2.1 MB', type: 'PDF', owner: 'Mike', date: '2 days ago' },
                  { name: 'Wireframes.png', size: '1.2 MB', type: 'IMG', owner: 'Sara', date: 'Oct 20' },
                ].map((file, i) => (
                  <Card key={i} className="group hover:shadow-lg transition-all border-none shadow-soft overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-32 bg-muted/20 flex items-center justify-center relative">
                         <File className="w-10 h-10 text-muted-foreground/40" />
                         <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-sm"><Download className="w-4 h-4" /></Button>
                         </div>
                      </div>
                      <div className="p-4 space-y-2">
                         <h4 className="font-bold text-sm truncate">{file.name}</h4>
                         <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            <span>{file.size} • {file.type}</span>
                            <span>By {file.owner}</span>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
             </div>
          </div>
        );
      case 'video':
        return (
          <div className="h-full bg-slate-950 flex flex-col items-center justify-center p-8 text-white animate-in zoom-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full flex-1 mb-8">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/5 aspect-video group">
                   <img 
                    src={`https://picsum.photos/seed/caller${i}/800/600`} 
                    alt="caller" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                   />
                 </div>
               ))}
            </div>

            <div className="glass rounded-3xl p-5 flex items-center gap-6 shadow-2xl border-white/10 bg-slate-900/80">
              <Button onClick={() => setIsMuted(!isMuted)} className={`w-14 h-14 rounded-2xl hover:bg-white/10 text-white ${isMuted ? 'bg-destructive/80' : ''}`}>
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              <Button onClick={() => setIsVideoOff(!isVideoOff)} className={`w-14 h-14 rounded-2xl hover:bg-white/10 text-white ${isVideoOff ? 'bg-destructive/80' : ''}`}>
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </Button>
              <div className="w-px h-10 bg-white/10" />
              <Button variant="destructive" className="w-16 h-16 rounded-2xl shadow-xl shadow-destructive/20" onClick={() => setActiveTab('chat')}>
                <PhoneOff className="w-8 h-8" />
              </Button>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold font-headline">Roadmap</h2>
                  <p className="text-muted-foreground">Timeline for {project.title}.</p>
                </div>
                <Button onClick={handleSyncGoogleCalendar} variant={isCalendarSynced ? "secondary" : "default"} disabled={isSyncing} className="rounded-xl gap-2 h-11 px-6">
                  {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                  {isCalendarSynced ? 'Synced with Google' : 'Connect Calendar'}
                </Button>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <Card className="lg:col-span-2 p-6 border-none shadow-soft">
                  <Calendar mode="single" className="w-full h-full p-0" />
               </Card>
             </div>
          </div>
        );
      case 'members':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
             <h2 className="text-3xl font-bold font-headline">Team Collective</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TEAM_MEMBERS.map((member, i) => (
                  <Card key={i} className="p-6 border-none shadow-soft text-center group hover:shadow-lg transition-all">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-md group-hover:border-primary/20 transition-all">
                      <AvatarImage src={member.image} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold font-headline">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{member.role}</p>
                    <Button variant="outline" size="sm" className="w-full rounded-xl hover:bg-primary/5 border-2">View Profile</Button>
                  </Card>
                ))}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeamSidebar activeTab={activeTab} setActiveTab={setActiveTab} teamName={project.title} />
      <div className="flex-1 overflow-hidden relative bg-white/60 backdrop-blur-sm">
        {renderContent()}
      </div>

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-headline flex items-center gap-2">
              <Award className="text-tech" /> Teammate Feedback & Rewards
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh] pr-4 py-4">
            <div className="space-y-6">
              {TEAM_MEMBERS.filter(m => m.id !== '1').map((member) => (
                <div key={member.id} className="p-4 rounded-2xl bg-muted/20 border space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10"><AvatarImage src={member.image} /></Avatar>
                    <div><h4 className="font-bold text-sm">{member.name}</h4></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Collaboration Rating</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          onClick={() => setRatings(prev => ({ ...prev, [member.id]: star }))}
                          className={`w-5 h-5 cursor-pointer transition-all ${star <= (ratings[member.id] || 0) ? 'text-hackathon fill-hackathon' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowRatingDialog(false)}>Skip</Button>
            <Button onClick={submitRatings} className="bg-tech text-white rounded-xl px-8 shadow-lg shadow-tech/20">Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
