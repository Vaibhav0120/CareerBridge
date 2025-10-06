
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { internships, studentProfile } from "@/lib/demo-data";
import { Building, Calendar, MapPin, Briefcase, PlusCircle, Bookmark, Check, Award, GraduationCap, Send, FileText } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { notFound, useParams } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function InternshipDetailsPage() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const internshipId = params.id as string;
  const internship = internships.find(i => i.id === internshipId);

  if (!internship) {
    notFound();
  }

  const handleSubmitApplication = () => {
    // In a real app, you'd handle form submission here.
    // For now, we'll just close the dialog and show a toast.
    setOpen(false);
    toast({
        title: "🎉 Application Submitted!",
        description: "Your profile has been sent to the hiring team. Good luck!",
        duration: 5000,
    });
  }

  return (
    <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-8">
                <div className="mb-6">
                    <Link href="/home/internships" className="text-sm text-primary hover:underline mb-4 inline-block">
                        &larr; Back to Internships
                    </Link>
                     <div className="flex items-start gap-6">
                        <Image 
                            src={internship.logoUrl}
                            alt={`${internship.organization} logo`}
                            width={80}
                            height={80}
                            className="rounded-lg border bg-background"
                        />
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight font-headline">{internship.title}</h1>
                            <p className="text-lg text-muted-foreground mt-1 flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                {internship.organization}
                            </p>
                        </div>
                    </div>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>About {internship.organization}</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <p>
                            {internship.organization} is a leader in its field, known for innovation and a commitment to excellence. 
                            Joining our team means you'll be part of a dynamic environment where you can learn, grow, and make a real impact.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Internship Description</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <p>{internship.description}</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Key Responsibilities</CardTitle>
                        <CardDescription>What you'll do on a day-to-day basis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ul className="space-y-3">
                           <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Collaborate with senior engineers to design, develop, and test new features.</span>
                           </li>
                           <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Write clean, maintainable, and well-documented code.</span>
                           </li>
                           <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Participate in code reviews to maintain code quality and share knowledge.</span>
                           </li>
                            <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Debug and resolve technical issues.</span>
                           </li>
                       </ul>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Qualifications</CardTitle>
                        <CardDescription>Skills and experience we're looking for.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Required Skills</h4>
                             <div className="flex flex-wrap gap-2">
                                {internship.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-base py-1 px-3">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-3">Preferred Qualifications</h4>
                            <ul className="space-y-3">
                               <li className="flex items-start gap-3">
                                   <Award className="h-5 w-5 text-muted-foreground mt-1" />
                                   <span>Currently pursuing a degree in Computer Science, Engineering, or a related field.</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <GraduationCap className="h-5 w-5 text-muted-foreground mt-1" />
                                   <span>Previous internship or project experience is a plus.</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <GraduationCap className="h-5 w-5 text-muted-foreground mt-1" />
                                   <span>Strong problem-solving skills and a passion for technology.</span>
                               </li>
                           </ul>
                        </div>
                    </CardContent>
                </Card>

            </div>
            <div className="md:col-span-1 space-y-6 sticky top-20">
                <Card>
                    <CardHeader>
                        <CardTitle>Internship Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Location</p>
                                <p className="text-muted-foreground">{internship.location}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                             <div>
                                <p className="font-medium">Duration</p>
                                <p className="text-muted-foreground">{internship.duration}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-muted-foreground" />
                             <div>
                                <p className="font-medium">Type</p>
                                <p className="text-muted-foreground">Internship</p>
                            </div>
                        </div>
                         {internship.fitScore && (
                            <div className="flex items-center gap-3">
                                <Badge variant={internship.fitScore > 90 ? 'default' : 'secondary'} className="text-lg">
                                    {internship.fitScore}%
                                </Badge>
                                <div>
                                    <p className="font-medium">Fit Score</p>
                                    <p className="text-muted-foreground">Based on your profile</p>
                                </div>
                            </div>
                         )}
                         <Separator />
                        <div className="flex flex-col gap-2 pt-2">
                             <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button size="lg"><Send className="mr-2 h-4 w-4"/> Apply Now</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirm Application</DialogTitle>
                                        <DialogDescription>
                                            You are about to apply for the <strong>{internship.title}</strong> role at <strong>{internship.organization}</strong>. Please review your details and confirm.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="flex items-center gap-4 rounded-md border p-4">
                                            <FileText className="h-6 w-6 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">{studentProfile.name}</p>
                                                <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3 rounded-md border p-4">
                                            <Checkbox id="consent" />
                                            <Label htmlFor="consent" className="text-sm text-muted-foreground -mt-0.5">
                                                I consent to sharing my profile and resume with {internship.organization} for this application.
                                            </Label>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                                        <Button type="submit" onClick={handleSubmitApplication}>Submit Application</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button size="lg" variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> Add to Preferences</Button>
                            <Button size="lg" variant="outline"><Bookmark className="mr-2 h-4 w-4"/> Save for Later</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
