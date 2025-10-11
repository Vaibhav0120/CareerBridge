'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/supabase/auth-context';
import { supabase } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function SignupStep2Page() {
  const [role, setRole] = useState<'student' | 'host'>('student');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Student fields
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');

  // Host fields
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [companyBio, setCompanyBio] = useState('');

  useEffect(() => {
    // Check if user is authenticated and email is verified
    const checkVerification = async () => {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Not Authenticated',
          description: 'Please sign up first.',
        });
        router.push('/signup');
        return;
      }

      // Check if email is verified
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser?.email_confirmed_at) {
        toast({
          variant: 'destructive',
          title: 'Email Not Verified',
          description: 'Please verify your email before completing your profile.',
        });
        router.push('/signup');
        return;
      }

      // Check if profile already exists
      const { data: studentProfile } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: hostProfile } = await supabase
        .from('host_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (studentProfile || hostProfile) {
        toast({
          title: 'Profile Already Complete',
          description: 'Redirecting to your dashboard...',
        });
        const userRole = studentProfile ? 'student' : 'host';
        router.push(userRole === 'student' ? '/home' : '/host');
        return;
      }

      setVerifying(false);
    };

    checkVerification();
  }, [user, router, toast]);

  const validateStudentForm = () => {
    if (!name || !university || !college || !degree || !branch || !year || !cgpa) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
      });
      return false;
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 6) {
      toast({
        variant: 'destructive',
        title: 'Invalid Year',
        description: 'Please enter a valid year (1-6).',
      });
      return false;
    }

    const cgpaNum = parseFloat(cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      toast({
        variant: 'destructive',
        title: 'Invalid CGPA',
        description: 'Please enter a valid CGPA (0-10).',
      });
      return false;
    }

    return true;
  };

  const validateHostForm = () => {
    if (!companyName || !companyEmail) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (role === 'student' && !validateStudentForm()) return;
    if (role === 'host' && !validateHostForm()) return;

    setLoading(true);

    try {
      // Update user role
      const { error: roleError } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user!.id);

      if (roleError) throw roleError;

      if (role === 'student') {
        // Create student profile
        const { error: profileError } = await supabase
          .from('student_profiles')
          .insert({
            user_id: user!.id,
            name,
            university,
            college,
            degree,
            branch,
            year: parseInt(year),
            cgpa: parseFloat(cgpa),
            credits: 0,
            bio: bio || null,
            skills: skills ? skills.split(',').map(s => s.trim()) : [],
            consent: true,
          });

        if (profileError) throw profileError;

        toast({
          title: 'Profile Created!',
          description: 'Welcome to CareerMatch!',
        });
        router.push('/home');
      } else {
        // Create host profile
        const { error: profileError } = await supabase
          .from('host_profiles')
          .insert({
            user_id: user!.id,
            name: companyName,
            email: companyEmail,
            phone: phone || null,
            address: address || null,
            bio: companyBio || null,
            verified: false,
          });

        if (profileError) throw profileError;

        toast({
          title: 'Profile Created!',
          description: 'Welcome to CareerMatch! Your account is pending verification.',
        });
        router.push('/host');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Verifying your account...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        <CardDescription>
          Step 2 of 2: Tell us more about yourself
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="role">I am a</Label>
          <Select value={role} onValueChange={(val: 'student' | 'host') => setRole(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="host">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {role === 'student' && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="university">University *</Label>
              <Input
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="State University"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="college">College *</Label>
              <Input
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="College of Engineering"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree *</Label>
              <Input
                id="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Bachelor of Technology"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="branch">Branch *</Label>
              <Input
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  min="1"
                  max="6"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cgpa">CGPA *</Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="8.5"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, Python"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
          </>
        )}

        {role === 'host' && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="InnovateTech"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyEmail">Company Email *</Label>
              <Input
                id="companyEmail"
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="careers@company.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Tech Avenue, Silicon Valley, CA"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyBio">Company Bio</Label>
              <Textarea
                id="companyBio"
                value={companyBio}
                onChange={(e) => setCompanyBio(e.target.value)}
                placeholder="Tell us about your company..."
                rows={4}
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating Profile...' : 'Complete Profile'}
        </Button>
      </CardFooter>
    </Card>
  );
}
