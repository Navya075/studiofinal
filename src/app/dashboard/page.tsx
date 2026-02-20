"use client";

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/dashboard/PostCard';
import { PostCreationDialog } from '@/components/dashboard/PostCreationDialog';
import { 
  LayoutGrid, 
  Code, 
  Sparkles,
  PenTool,
  Filter,
  Users,
  CheckCircle2,
  RotateCcw,
  Search,
  X,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export const MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'Blockchain Campus Vote',
    status: 'Active',
    timeLeft: '2 days left',
    summary: 'A decentralized voting system for student government elections using Solidity and React.',
    tags: ['Solidity', 'React', 'Ethers.js'],
    owner: 'Alex Rivers',
    members: 2,
    maxMembers: 4,
    dueDate: 'Nov 12',
    category: 'Technical',
    isVerified: true,
  },
  {
    id: 'p2',
    title: 'Sustainability Hub App',
    status: 'Active',
    timeLeft: '5 days left',
    summary: 'Building a mobile app to track campus recycling and reward green initiatives.',
    tags: ['Flutter', 'Firebase', 'UI/UX'],
    owner: 'Sara Chen',
    members: 3,
    maxMembers: 5,
    dueDate: 'Nov 20',
    category: 'General',
    isVerified: false,
  },
  {
    id: 'p3',
    title: 'AI Study Companion',
    status: 'Active',
    timeLeft: '1 week left',
    summary: 'LLM-powered tool to summarize lecture notes and generate custom practice quizzes.',
    tags: ['Python', 'OpenAI', 'Next.js'],
    owner: 'You',
    members: 1,
    maxMembers: 3,
    dueDate: 'Dec 05',
    category: 'Technical',
    isVerified: true,
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('All Feed');
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterUnverified, setFilterUnverified] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedIds, setJoinedIds] = useState<string[]>(['p3']); // Mocking the user is already in p3
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  const handleJoinProject = (id: string) => {
    setJoinedIds(prev => [...prev, id]);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Tab Filtering
      if (activeTab === 'Teams') {
        if (!joinedIds.includes(project.id)) return false;
      } else if (activeTab === 'Technical' && project.category !== 'Technical') {
        return false;
      } else if (activeTab === 'Non-Technical' && project.category === 'Technical') {
        return false;
      }

      // Search Filtering
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Dropdown Filters
      if (filterVerified && !filterUnverified && !project.isVerified) return false;
      if (filterUnverified && !filterVerified && project.isVerified) return false;

      return true;
    });
  }, [projects, activeTab, filterVerified, filterUnverified, searchQuery, joinedIds]);

  const resetFilters = () => {
    setFilterVerified(false);
    setFilterUnverified(false);
    setActiveTab('All Feed');
    setSearchQuery('');
  };

  const handleCreateProject = (newProject: any) => {
    const project = {
      ...newProject,
      id: `p${Date.now()}`,
      owner: 'You',
      members: 1,
      timeLeft: 'Just launched',
      category: newProject.type === 'Hackathon' ? 'Technical' : 'General',
    };
    setProjects([project, ...projects]);
    setJoinedIds(prev => [...prev, project.id]);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
              Collaboration Feed
            </h1>
            <p className="text-muted-foreground text-lg">Find your next project or build a winning team.</p>
          </div>
          <PostCreationDialog onCreate={handleCreateProject} />
        </div>

        {/* Search Bar Row - Below Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 w-full">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              type="text"
              placeholder="Search projects, skills, or tags..."
              className="pl-12 h-12 bg-white border-muted/30 rounded-full shadow-soft focus-visible:ring-primary/20 w-full text-base transition-all hover:border-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-muted/30 shadow-sm hover:border-primary transition-all bg-white">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>Filter Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={filterVerified} 
                  onCheckedChange={setFilterVerified} 
                  className="gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Verified Only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filterUnverified} 
                  onCheckedChange={setFilterUnverified} 
                  className="gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-muted-foreground" /> Unverified Only
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-4 mb-10 no-scrollbar">
          {TABS.map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full h-11 px-5 text-sm font-semibold transition-all gap-2 shrink-0",
                activeTab === tab.id 
                  ? "bg-primary/10 text-primary hover:bg-primary/20" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab.icon} {tab.label}
            </Button>
          ))}
          {(filterVerified || filterUnverified || searchQuery) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-9 gap-1.5 text-muted-foreground hover:text-primary ml-auto hidden sm:flex">
              <RotateCcw className="w-3.5 h-3.5" /> Reset All
            </Button>
          )}
        </div>

        {/* Content Feed */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <PostCard 
                key={project.id} 
                post={project} 
                isJoined={joinedIds.includes(project.id)}
                onJoin={() => handleJoinProject(project.id)}
              />
            ))
          ) : (
            <div className="text-center py-24 bg-muted/5 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center space-y-4">
              <div className="p-5 bg-muted/10 rounded-full">
                <Search className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold">
                  {activeTab === 'Teams' ? "You haven't joined any teams yet" : "No results matching your criteria"}
                </p>
                <p className="text-muted-foreground">
                  {activeTab === 'Teams' ? "Explore the feed to find projects to collaborate on." : "Try adjusting your search or filters."}
                </p>
                <Button variant="link" onClick={resetFilters} className="text-primary mt-2">Clear All Filters</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const TABS = [
  { id: 'All Feed', label: 'All Feed', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'Technical', label: 'Technical', icon: <Code className="w-4 h-4" /> },
  { id: 'Non-Technical', label: 'Non-Technical', icon: <PenTool className="w-4 h-4" /> },
  { id: 'My Badges', label: 'My Badges', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'Teams', label: 'Teams', icon: <Users className="w-4 h-4" /> },
];
