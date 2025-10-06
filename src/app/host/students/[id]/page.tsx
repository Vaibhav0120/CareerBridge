
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { allApplicants, internships } from "@/lib/demo-data";
import { Github, Linkedin, FileText, Twitter, Link as LinkIcon, Building, Briefcase, Mail, Phone, GraduationCap, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


export default function StudentApplicationPage() {
  const params = useParams();
  const applicantId = params.id as string;
  const { toast } = useToast();
  
  const initialApplicant = allApplicants.find(a => a.id === applicantId);
  const [applicant, setApplicant] = useState(initialApplicant);

  if (!applicant) {
    return notFound();
  }
  
  const handleStatusChange = (newStatus: string) => {
    setApplicant(prev => prev ? { ...prev, status: newStatus } : undefined);
    toast({
        title: "Status Updated",
        description: `${applicant.name}'s application status has been updated to "${newStatus}".`,
    });
  };

  const internship = internships.find(i => i.id === applicant.internshipId);

  if (!internship) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <Link href="/host/students" className="text-sm text-primary hover:underline mb-4 inline-block">
            &larr; Back to all applicants
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Student Application</h1>
        <p className="text-muted-foreground">Reviewing <span className="font-semibold">{applicant.name}</span> for the {internship.title} role.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={applicant.avatarUrl} alt={applicant.name} />
                <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{applicant.name}</CardTitle>
              <CardDescription>{applicant.email}</CardDescription>
               <div className="flex pt-2 gap-2">
                <Button size="sm" variant="outline"><Mail className="mr-2 h-4 w-4" /> Email</Button>
                <Button size="sm" variant="outline"><Phone className="mr-2 h-4 w-4" /> Call</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="flex justify-around pt-2">
                <Link href="#" target="_blank" aria-label="GitHub"><Github className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href="#" target="_blank" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href="#" target="_blank" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href="#" target="_blank" aria-label="Portfolio"><LinkIcon className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {applicant.skills?.map(skill => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
           <Card>
            <CardHeader>
                <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Applying for</p>
                        <p className="font-semibold">{internship.title}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Organization</p>
                        <p className="font-semibold">{internship.organization}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                     <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Current Status</p>
                        <Badge variant="secondary" className="text-base py-1 px-3">{applicant.status}</Badge>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Badge variant="default" className="text-base py-1 px-3">
                        Fit Score: {internship.fitScore}%
                    </Badge>
                     <p className="text-sm text-muted-foreground">Match based on profile skills vs. job requirements.</p>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap /> Academic Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">University</p>
                  <p className="font-medium">{applicant.university}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">College</p>
                  <p className="font-medium">{applicant.college}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Degree</p>
                  <p className="font-medium">{applicant.degree}, {applicant.branch}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Year of Study</p>
                  <p className="font-medium">{applicant.year}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">CGPA</p>
                  <p className="font-medium">{applicant.cgpa} / 10</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Credits Earned</p>
                  <p className="font-medium">{applicant.credits}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>{applicant.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
              <CardDescription>The student's uploaded resume.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6" />
                    <span className="font-medium">{applicant.name}_Resume.pdf</span>
                  </div>
                  <Button variant="outline">Download PDF</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Application Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Button onClick={() => handleStatusChange('Interviewing')} disabled={applicant.status === 'Interviewing'}>Move to Interview</Button>
                <Button variant="outline" onClick={() => handleStatusChange('Offer Extended')} disabled={applicant.status === 'Offer Extended'}>Extend Offer</Button>
                <Button variant="destructive" onClick={() => handleStatusChange('Rejected')} disabled={applicant.status === 'Rejected'}>Reject Application</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
