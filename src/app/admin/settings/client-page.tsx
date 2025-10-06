
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Laptop, Bell, Palette, Shield, ChevronLeft } from 'lucide-react';

export default function SettingsClientPage() {
  const [confirmText, setConfirmText] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDeleteAccount = () => {
    // In a real app, this would trigger a server action.
    toast({
      title: 'Account Deleted',
      description: 'Your account and all associated data have been permanently deleted.',
    });
    router.push('/');
  };

  if (!mounted) {
    // return null or a loading skeleton to avoid hydration error
    return null;
  }

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-4xl">
      <div>
         <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your administrator account and platform settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell/> Notifications</CardTitle>
          <CardDescription>
            Choose what you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="new-host-signup" className="font-medium">
                New Host Organization Sign-ups
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive an email when a new organization joins the platform.
              </p>
            </div>
            <Switch id="new-host-signup" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="flagged-content" className="font-medium">
                Flagged Content Alerts
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified when content is flagged for review.
              </p>
            </div>
            <Switch id="flagged-content" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette/> Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-2">
            <Label>Theme</Label>
            <div className='flex space-x-2 rounded-lg bg-secondary p-1 w-fit'>
                 <Button variant={theme === 'light' ? 'default' : 'ghost'} onClick={() => setTheme('light')} size="sm" className="flex-1 justify-center">
                    <Sun className="mr-2 h-4 w-4"/> Light
                 </Button>
                  <Button variant={theme === 'dark' ? 'default' : 'ghost'} onClick={() => setTheme('dark')} size="sm" className="flex-1 justify-center">
                    <Moon className="mr-2 h-4 w-4"/> Dark
                 </Button>
                  <Button variant={theme === 'system' ? 'default' : 'ghost'} onClick={() => setTheme('system')} size="sm" className="flex-1 justify-center">
                    <Laptop className="mr-2 h-4 w-4"/> System
                 </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield/> Account</CardTitle>
          <CardDescription>
            Manage your account details and security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Log Out</p>
            <Button variant="outline" onClick={() => router.push('/')}>
              Sign Out
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your admin account. This action is irreversible.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                  <Label htmlFor="confirm-delete">
                    To confirm, please type "Confirm" below.
                  </Label>
                  <Input
                    id="confirm-delete"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Confirm"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={confirmText !== 'Confirm'}
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
