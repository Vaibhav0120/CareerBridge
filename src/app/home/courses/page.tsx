
'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/lib/demo-data";
import { Clock, Search, Star, Tag, BookOpen, Wand2, X, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

function CoursesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recommendedParam = searchParams.get('recommended');
  
  const inProgressCourses = [
    { ...courses[0], progress: 75 },
    { ...courses.find(c => c.id === 'course-05'), progress: 40 },
  ];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recommendedCourseIds = useMemo(() => {
    return recommendedParam ? recommendedParam.split(',') : [];
  }, [recommendedParam]);

  const filteredCourses = useMemo(() => {
    let availableCourses = courses.filter(c => c.status === 'Active');

    if (recommendedCourseIds.length > 0) {
      return availableCourses.filter(course => recommendedCourseIds.includes(course.id));
    }

    return availableCourses.filter(course => {
      const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase().replace(' ', '-') === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, recommendedCourseIds]);

  const clearRecommendations = () => {
    router.push('/home/courses');
  };


  return (
    <div className="container mx-auto py-8">
      {/* Continue Learning Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6"/>
            Continue Learning
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {inProgressCourses.map((course) => (
            <Card key={`progress-${course.id}`} className="md:max-w-2xl">
              <CardContent className="flex gap-4 p-4">
                 <Image
                  src={`https://picsum.photos/seed/${course.id}/150/150`}
                  alt={course.title}
                  width={150}
                  height={150}
                  data-ai-hint="abstract design"
                  className="rounded-md object-cover hidden sm:block"
                />
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                        <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <Progress value={course.progress} className="w-full h-2"/>
                            <span>{course.progress}%</span>
                        </div>
                        <Button className="w-full" asChild>
                            <Link href={`/home/courses/${course.id}/learning`}>Continue</Link>
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
        <p className="text-muted-foreground">Upskill yourself with these recommended courses.</p>
      </div>

      {recommendedCourseIds.length > 0 && (
         <Card className="mb-8 bg-secondary/50 border-accent/50">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/20 rounded-full">
                        <Lightbulb className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Showing Your AI Recommendations</h3>
                        <p className="text-sm text-muted-foreground">These courses are suggested to improve your profile for your chosen internships.</p>
                    </div>
                </div>
                <Button onClick={clearRecommendations} variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Clear Recommendations</span>
                </Button>
            </CardContent>
        </Card>
      )}

      <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={recommendedCourseIds.length > 0}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <Select onValueChange={setSelectedCategory} defaultValue="all" disabled={recommendedCourseIds.length > 0}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product-management">Product Management</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
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
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/home/courses/${course.id}`}>View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={<div>Loading recommendations...</div>}>
            <CoursesPageContent />
        </Suspense>
    );
}
