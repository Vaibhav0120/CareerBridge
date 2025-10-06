
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { internships as allInternships, courses as allCourses } from "@/lib/demo-data";
import type { Internship, Course } from '@/lib/types';
import { Bookmark, Building, MapPin, Trash2, BookOpen, Star, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SavedItemsPage() {
    const [savedInternships, setSavedInternships] = useState<Internship[]>(allInternships.slice(1, 3));
    const [savedCourses, setSavedCourses] = useState<Course[]>(allCourses.slice(0, 2));

    const handleRemoveInternship = (internshipId: string) => {
        setSavedInternships(current => current.filter(i => i.id !== internshipId));
    };

    const handleRemoveCourse = (courseId: string) => {
        setSavedCourses(current => current.filter(c => c.id !== courseId));
    };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Saved Items</h1>
        <p className="text-muted-foreground">Your bookmarked internships and courses for future reference.</p>
      </div>

      <Tabs defaultValue="internships">
        <TabsList className="mb-8 grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="internships"><Bookmark className="mr-2 h-4 w-4" /> Internships ({savedInternships.length})</TabsTrigger>
            <TabsTrigger value="courses"><BookOpen className="mr-2 h-4 w-4" /> Courses ({savedCourses.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="internships">
            {savedInternships.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {savedInternships.map((internship) => (
                    <Card key={internship.id} className="flex flex-col">
                        <CardHeader>
                        <div className="flex items-start gap-4">
                            <Image
                            src={internship.logoUrl}
                            alt={`${internship.organization} logo`}
                            width={64}
                            height={64}
                            className="rounded-lg border"
                            />
                            <div className="flex-1">
                            <CardTitle className="text-xl">{internship.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-1">
                                <Building className="h-4 w-4" /> {internship.organization}
                            </CardDescription>
                            </div>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {internship.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4"/>
                                <span>{internship.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {internship.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                        </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                        <Button className="w-full" asChild>
                            <Link href={`/home/internships/${internship.id}`}>View Details</Link>
                        </Button>
                        <Button variant="destructive" size="icon" aria-label="Remove saved internship" onClick={() => handleRemoveInternship(internship.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-24">
                    <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold">No Saved Internships</h2>
                    <p className="text-muted-foreground mt-2">You haven&apos;t bookmarked any internships yet.</p>
                     <Button variant="secondary" className="mt-4" asChild>
                        <Link href="/home/internships">Browse Internships</Link>
                    </Button>
                </div>
            )}
        </TabsContent>
        <TabsContent value="courses">
            {savedCourses.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {savedCourses.map((course) => (
                        <Card key={course.id} className="flex flex-col">
                            <CardHeader>
                            <Image
                                src={`https://picsum.photos/seed/${course.id}/400/200`}
                                alt={course.title}
                                width={400}
                                height={200}
                                data-ai-hint="abstract texture"
                                className="rounded-t-lg aspect-video object-cover -mt-6 -mx-6 -mb-2"
                                />
                            <CardTitle className="text-lg pt-2">{course.title}</CardTitle>
                            <CardDescription>{course.provider}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Tag className="h-4 w-4"/>
                                        <span>{course.category}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4"/>
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                                        <span>{course.rating}</span>
                                    </div>
                                </div>
                            <p className="text-muted-foreground line-clamp-3">
                                {course.description}
                            </p>
                            </CardContent>
                            <CardFooter className="gap-2">
                                <Button className="w-full" asChild>
                                    <Link href={`/home/courses/${course.id}`}>View Course</Link>
                                </Button>
                                <Button variant="destructive" size="icon" aria-label="Remove saved course" onClick={() => handleRemoveCourse(course.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-24">
                    <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold">No Saved Courses</h2>
                    <p className="text-muted-foreground mt-2">You haven&apos;t bookmarked any courses yet.</p>
                    <Button variant="secondary" className="mt-4" asChild>
                        <Link href="/home/courses">Browse Courses</Link>
                    </Button>
                </div>
            )}
        </TabsContent>
      </Tabs>

    </div>
  );
}
