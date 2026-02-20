"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Shield, Mail, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-headline mb-8">Account Settings</h1>
        
        <div className="grid gap-8">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Profile Information
              </CardTitle>
              <CardDescription>Update your public profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input defaultValue="johndoe_dev" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>University</Label>
                <Input defaultValue="Stanford University" readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Input defaultValue="Building scalable web applications and exploring blockchain." />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-hackathon" /> Notifications
              </CardTitle>
              <CardDescription>Manage how you receive updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Team Messages</Label>
                  <p className="text-xs text-muted-foreground">Receive alerts for new messages in team rooms.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Project Requests</Label>
                  <p className="text-xs text-muted-foreground">Get notified when students want to join your projects.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Point Milestones</Label>
                  <p className="text-xs text-muted-foreground">Alerts when you earn points or badges.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-creative" /> Privacy & Security
              </CardTitle>
              <CardDescription>Control your data and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-xs text-muted-foreground">Allow anyone on campus to view your skills and history.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Deactivate Account</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="ghost">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary text-white rounded-xl px-8 shadow-lg shadow-primary/20">Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}