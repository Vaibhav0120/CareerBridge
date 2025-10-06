
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { hostProfile, internships } from "@/lib/demo-data";
import { Briefcase, Building, Mail, MapPin, Pencil, Phone, Upload, Trash2, ArrowRight, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Slider } from '@/components/ui/slider';
import { useSearchParams } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


export default function HostProfileClientPage() {
    const activeInternships = internships.slice(0, 3);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop>();
    const [scale, setScale] = useState(1);
    const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const searchParams = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
        if (searchParams.get('contact') === 'true') {
            setIsContactDialogOpen(true);
        }
    }, [searchParams]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                1,
                width,
                height,
            ),
            width,
            height,
        );
        setCrop(crop);
        setCompletedCrop(crop);
    }
    
    const handleSave = () => {
        // In a real app, you would upload the cropped image here.
        console.log('Saved crop:', completedCrop);
        setIsLogoDialogOpen(false);
        // Reset state
        setImgSrc('');
        setScale(1);
    }
    
    const handleSendMessage = () => {
        toast({
            title: "Message Sent!",
            description: "Your message has been delivered to the host.",
        });
        setIsContactDialogOpen(false);
    }

    return (
        <div className="container mx-auto py-8 space-y-8">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
                <p className="text-muted-foreground">Manage your company's public information.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 space-y-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Image
                                src={hostProfile.logoUrl}
                                alt={`${hostProfile.name} logo`}
                                width={96}
                                height={96}
                                className="rounded-full border p-2 mb-4"
                            />
                            <CardTitle>{hostProfile.name}</CardTitle>
                             <div className="flex items-center gap-2 mt-2">
                                <CheckBadgeIcon className="h-8 w-8 text-primary" />
                                <span className="text-sm font-medium text-primary">Verified by PM Internship Scheme</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Change Logo</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Update Logo</DialogTitle>
                                        <DialogDescription>
                                            Upload and crop your new organization logo.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <Input id="logo-upload" type="file" onChange={onFileChange} accept="image/*" />
                                        {imgSrc && (
                                            <div className='flex flex-col items-center space-y-4'>
                                                <ReactCrop
                                                    crop={crop}
                                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                                    onComplete={(c) => setCompletedCrop(c)}
                                                    aspect={1}
                                                    circularCrop
                                                >
                                                    <Image
                                                        ref={imgRef}
                                                        alt="Crop me"
                                                        src={imgSrc}
                                                        style={{ transform: `scale(${scale})` }}
                                                        onLoad={onImageLoad}
                                                        width={400}
                                                        height={400}
                                                        className="max-h-[400px] w-auto"
                                                    />
                                                </ReactCrop>
                                                <div className="w-full space-y-2">
                                                    <Label htmlFor="zoom">Zoom</Label>
                                                    <Slider
                                                        id="zoom"
                                                        defaultValue={[1]}
                                                        min={1}
                                                        max={3}
                                                        step={0.1}
                                                        value={[scale]}
                                                        onValueChange={(value) => setScale(value[0])}
                                                    />
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => setImgSrc('')}><Trash2 className="mr-2 h-4 w-4"/>Remove Image</Button>
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                         <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                            Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type="button" onClick={handleSave} disabled={!imgSrc}>Save</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href={`mailto:${hostProfile.email}`} className="text-muted-foreground hover:underline">{hostProfile.email}</a>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">{hostProfile.phone}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-muted-foreground">{hostProfile.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <div className="md:col-span-2 space-y-8">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>About {hostProfile.name}</CardTitle>
                                <CardDescription>Update your organization's description and details.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>{hostProfile.bio}</p>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Active Internships</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {activeInternships.map(internship => (
                                <div key={internship.id} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-muted p-2 rounded-md">
                                            <Briefcase className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <Link href={`/host/internships/${internship.id}/edit`} className="font-semibold hover:underline">{internship.title}</Link>
                                            <p className="text-sm text-muted-foreground">{internship.location}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link href={`/host/students?internshipId=${internship.id}`}>View Applicants</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                           <Button asChild variant="outline" className="w-full">
                                <Link href="/host/internships">View All Active Internships <ArrowRight className="ml-2 h-4 w-4" /></Link>
                           </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contact {hostProfile.name}</DialogTitle>
                        <DialogDescription>
                            Your message will be sent to the primary contact for this organization.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="e.g., Question about course material" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={5} placeholder="Your message..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSendMessage}>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const CheckBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <style>
        {`
          .check-badge-circle {
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
            animation: draw-circle 0.5s ease-out forwards;
          }
          .check-badge-check {
            stroke-dasharray: 14;
            stroke-dashoffset: 14;
            animation: draw-check 0.4s ease-out 0.4s forwards;
          }
          @keyframes draw-circle {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes draw-check {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <circle cx="12" cy="12" r="10" className="check-badge-circle" fill="hsl(var(--primary))" stroke="none" />
      <path d="m9 12 2 2 4-4" className="check-badge-check" stroke="hsl(var(--primary-foreground))" />
    </svg>
  );