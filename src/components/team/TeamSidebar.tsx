import Link from 'next/link';
import { 
  MessageSquare, 
  FileText, 
  Calendar, 
  Users, 
  Phone, 
  Video, 
  Settings, 
  Home,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  teamName: string;
}

export function TeamSidebar({ activeTab, setActiveTab, teamName }: TeamSidebarProps) {
  const menuItems = [
    { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'files', label: 'Files', icon: <FileText className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'members', label: 'Members', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col shadow-sm">
      <div className="p-4 border-b">
        <Button variant="ghost" size="sm" className="mb-4 gap-2 -ml-2" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4" /> Back to Feed
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tech rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {teamName[0]}
          </div>
          <div>
            <h2 className="font-bold font-headline truncate w-32">{teamName}</h2>
            <Badge variant="secondary" className="text-[10px] bg-mgmt/10 text-mgmt border-mgmt/20">Active Now</Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
              activeTab === item.id 
                ? 'bg-primary/20 text-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="pt-8 px-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Live Tools</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-10 border-2 gap-2 text-xs" onClick={() => setActiveTab('audio')}>
              <Phone className="w-4 h-4 text-tech" /> Audio
            </Button>
            <Button variant="outline" className="h-10 border-2 gap-2 text-xs" onClick={() => setActiveTab('video')}>
              <Video className="w-4 h-4 text-creative" /> Video
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-muted/20">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">John Doe</p>
            <p className="text-[10px] text-muted-foreground">Team Lead</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
