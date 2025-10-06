
'use client';

import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { studentProfile, users } from "@/lib/demo-data";
import { Github, Linkedin, FileText, Twitter, Upload, Link as LinkIcon, Pencil, Trash2, PlusCircle, X } from "lucide-react";
import Link from 'next/link';
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
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


export default function ProfilePage() {
  const user = users.student;
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [scale, setScale] = useState(1);
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skills, setSkills] = useState(studentProfile.skills);
  const [newSkill, setNewSkill] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

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
  
  const handlePhotoSave = () => {
      // In a real app, you would upload the cropped image here.
      // For now, we'll just log the crop data and close the dialog.
      console.log('Saved crop:', completedCrop);
      setIsPhotoDialogOpen(false);
      // Reset state
      setImgSrc('');
      setScale(1);
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleResumeUpload = () => {
    if (resumeFile) {
        toast({
            title: 'Resume Uploaded',
            description: `${resumeFile.name} has been successfully uploaded.`
        });
    }
  };


  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                  <DialogTrigger asChild>
                      <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Change Photo</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                      <DialogHeader>
                          <DialogTitle>Update Profile Photo</DialogTitle>
                          <DialogDescription>
                              Upload and crop your new profile picture.
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
                          <Button type="button" onClick={handlePhotoSave} disabled={!imgSrc}>Save</Button>
                      </DialogFooter>
                  </DialogContent>
              </Dialog>
              <div className="flex justify-around pt-2">
                <Link href={studentProfile.links.github} target="_blank" aria-label="GitHub"><Github className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href={studentProfile.links.linkedin} target="_blank" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href={studentProfile.links.twitter} target="_blank" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href={studentProfile.links.kaggle} target="_blank" aria-label="Kaggle"><LinkIcon className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
               <Dialog open={isEditingSkills} onOpenChange={setIsEditingSkills}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Skills</DialogTitle>
                    <DialogDescription>
                      Add or remove skills from your profile.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[80px]">
                      {skills.length > 0 ? skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-base py-1 px-2">
                          {skill}
                          <button onClick={() => handleRemoveSkill(skill)} className="ml-2 rounded-full hover:bg-background/50 p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )) : <p className="text-sm text-muted-foreground">No skills added yet.</p>}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        placeholder="Add a new skill"
                      />
                      <Button type="button" onClick={handleAddSkill}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => setIsEditingSkills(false)}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1.5">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </div>
              {!isEditingInfo && (
                <Button variant="ghost" size="icon" onClick={() => setIsEditingInfo(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={studentProfile.name} readOnly={!isEditingInfo} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={studentProfile.email} readOnly={!isEditingInfo} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} defaultValue={studentProfile.bio} readOnly={!isEditingInfo} />
              </div>
            </CardContent>
            {isEditingInfo && (
              <CardFooter className="justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsEditingInfo(false)}>Cancel</Button>
                <Button onClick={() => setIsEditingInfo(false)}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
              <CardDescription>Manage your resume and parsing settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6" />
                    <span className="font-medium">{resumeFile ? resumeFile.name : studentProfile.resume}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Upload New</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload New Resume</DialogTitle>
                            <DialogDescription>
                                Please upload your resume in PDF format. This will replace your current resume.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <Input
                                id="resume-upload-profile"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                            />
                            {resumeFile && <p className="text-sm text-muted-foreground">Selected: {resumeFile.name}</p>}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" onClick={handleResumeUpload} disabled={!resumeFile}>Upload</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                  </Dialog>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="resume-parsing" className="font-medium">Automatic Resume Parsing</Label>
                  <p className="text-sm text-muted-foreground">Allow our AI to parse your resume for skills and experience.</p>
                </div>
                <Switch id="resume-parsing" defaultChecked={studentProfile.resumeParsed} />
              </div>
              <Separator />
               <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-consent" className="font-medium">Profile Sharing Consent</Label>
                  <p className="text-sm text-muted-foreground">Allow host organizations to view your detailed profile.</p>
                </div>
                <Switch id="profile-consent" defaultChecked={studentProfile.consent} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
