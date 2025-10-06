
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { courses } from "@/lib/demo-data";
import { CheckCircle, Clock, Star, Tag, Bookmark, Target, Book, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-8">
                <div className="mb-6">
                    <Link href="/home/courses" className="text-sm text-primary hover:underline mb-4 inline-block">
                        &larr; Back to courses
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight font-headline">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-1">By {course.provider}</p>
                </div>
                
                <Image 
                    src={`https://picsum.photos/seed/${course.id}/1200/600`}
                    alt={course.title}
                    width={1200}
                    height={600}
                    data-ai-hint="abstract learning"
                    className="aspect-video object-cover rounded-lg mb-6 shadow-lg"
                />

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="h-6 w-6" /> <span>What You'll Learn</span></CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Fundamental concepts of the subject.</span>
                         </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Practical, real-world applications.</span>
                         </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>How to build production-ready projects.</span>
                         </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Advanced tips and tricks from experts.</span>
                         </li>
                    </CardContent>
                </Card>

                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mb-4">About this course</h2>
                    <p className="lead">{course.description}</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Book className="h-6 w-6" /><span>Course Content</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {course.modules.map((module, index) => (
                                <li key={index} className="flex items-start gap-4 p-3 rounded-md border transition-colors hover:bg-secondary/50">
                                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{module.title}</p>
                                        <p className="text-sm text-muted-foreground">{module.duration}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6" /><span>Requirements</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3 list-disc list-inside">
                            <li>Basic understanding of web technologies.</li>
                            <li>A computer with internet access.</li>
                            <li>Eagerness to learn and a positive attitude!</li>
                        </ul>
                    </CardContent>
                </Card>

            </div>
            <div className="md:col-span-1 space-y-6 sticky top-20">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-muted-foreground" />
                            <Badge>{course.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm">{course.duration} total hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{course.rating}/5 rating</span>
                        </div>
                         <Separator />
                         <div className="flex items-center gap-3">
                             <Image 
                                src={course.logoUrl}
                                alt={`${course.provider} logo`}
                                width={40}
                                height={40}
                                className="rounded-md border"
                            />
                            <div>
                                <p className="text-sm text-muted-foreground">Provider</p>
                                <p className="font-semibold">{course.provider}</p>
                            </div>
                         </div>
                        <div className="flex flex-col gap-2 pt-2">
                            <Button className="w-full" size="lg" asChild>
                                <Link href={`/home/courses/${course.id}/learning`}>Start Learning</Link>
                            </Button>
                            <Button className="w-full" size="lg" variant="outline"><Bookmark className="mr-2 h-4 w-4" /> Save for Later</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
