"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const settingsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  bio: z.string().max(160, "Bio too long"),
  notifications: z.object({
    messages: z.boolean(),
    requests: z.boolean(),
    points: z.boolean()
  }),
  isPublic: z.boolean()
});

type SettingsValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: "John Doe",
      username: "johndoe_dev",
      bio: "Building scalable web applications and exploring blockchain.",
      notifications: {
        messages: true,
        requests: true,
        points: false
      },
      isPublic: true
    }
  });

  const watchNotifications = watch('notifications');
  const watchPublic = watch('isPublic');

  const onSave = (data: SettingsValues) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar isDashboard />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-headline mb-8">Account Settings</h1>
        
        <form onSubmit={handleSubmit(onSave)} className="grid gap-8">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Profile Information
              </CardTitle>
              <CardDescription>Update your public profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input {...register('fullName')} className={errors.fullName ? "border-destructive" : ""} />
                  {errors.fullName && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input {...register('username')} className={errors.username ? "border-destructive" : ""} />
                  {errors.username && <p className="text-[10px] text-destructive font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.username.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>University (Verified)</Label>
                <Input defaultValue="Stanford University" readOnly className="bg-muted/50 cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Input {...register('bio')} className={errors.bio ? "border-destructive" : ""} />
                {errors.bio && <p className="text-[10px] text-destructive font-medium">{errors.bio.message}</p>}
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
                <Switch 
                  checked={watchNotifications.messages} 
                  onCheckedChange={(val) => setValue('notifications.messages', val)} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Project Requests</Label>
                  <p className="text-xs text-muted-foreground">Get notified when students want to join your projects.</p>
                </div>
                <Switch 
                  checked={watchNotifications.requests} 
                  onCheckedChange={(val) => setValue('notifications.requests', val)} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Point Milestones</Label>
                  <p className="text-xs text-muted-foreground">Alerts when you earn points or badges.</p>
                </div>
                <Switch 
                  checked={watchNotifications.points} 
                  onCheckedChange={(val) => setValue('notifications.points', val)} 
                />
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
                <Switch 
                  checked={watchPublic} 
                  onCheckedChange={(val) => setValue('isPublic', val)} 
                />
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" type="button" className="text-red-500 border-red-200 hover:bg-red-50">Deactivate Account</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="ghost" type="button">Cancel</Button>
            <Button type="submit" disabled={isSaving} className="bg-primary text-white rounded-xl px-8 shadow-lg shadow-primary/20">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
