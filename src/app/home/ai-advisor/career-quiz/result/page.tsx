
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Briefcase, BookOpen, User, ChevronLeft, BarChart2, Star, Target } from 'lucide-react';
import type { CareerRecommendationOutput, Quiz, QuizAnswers } from "@/ai/flows/career-interest-types";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

type ResultData = {
    quiz: Quiz;
    answers: QuizAnswers;
    recommendations: CareerRecommendationOutput;
}

export default function CareerQuizResultPage() {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedResults = sessionStorage.getItem('careerQuizResults');
        if (storedResults) {
            setResultData(JSON.parse(storedResults));
        } else {
            router.push('/home/ai-advisor/career-quiz');
        }
    }, [router]);

    if (!resultData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Lightbulb className="h-12 w-12 animate-spin" />
            </div>
        );
    }
    
    const { recommendations } = resultData;
    const { personalityAnalysis, careerFit } = recommendations;

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Your Career Quiz Results</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    An AI-powered analysis of your personality and ideal career paths in tech.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl"><Star /> Your Personality Profile</CardTitle>
                             <CardDescription>
                                These traits were identified from your quiz answers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="h-80">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={personalityAnalysis.traits} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" domain={[0, 100]} hide />
                                    <YAxis dataKey="trait" type="category" width={120} tickLine={false} axisLine={false} className="text-sm" />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--secondary))' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <p className="font-bold">{`${payload[0].payload.trait}: ${payload[0].value}`}</p>
                                                </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} background={{ fill: 'hsl(var(--secondary))', radius: 4 }} />
                                </BarChart>
                            </ResponsiveContainer>
                           </div>
                           <div>
                               <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
                               <p className="text-muted-foreground">{personalityAnalysis.summary}</p>
                           </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Briefcase /> Recommended Job Roles</CardTitle>
                            <CardDescription>Based on your profile, these roles could be a great fit for you.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-lg">
                                {recommendations.recommendedJobs.map((job) => <li key={job}>{job}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <aside className="lg:col-span-1 sticky top-24 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target /> Career Fit</CardTitle>
                            <CardDescription>Your suitability for different tech fields.</CardDescription>
                        </CardHeader>
                         <CardContent className="h-80">
                             <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={careerFit}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="career" tick={{ fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar name="Fit" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                 <Tooltip content={({ active, payload }) => {
                                     if (active && payload && payload.length) {
                                        return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <p className="font-bold">{`${payload[0].payload.career}: ${payload[0].value}`}</p>
                                        </div>
                                        )
                                    }
                                    return null
                                }} />
                                </RadarChart>
                            </ResponsiveContainer>
                         </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen /> Your Learning Path</CardTitle>
                            <CardDescription>Start with these foundational courses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {recommendations.recommendedCourses.map((course) => (
                                    <li key={course} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                        </div>
                                       <span className="font-medium">{course}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <div className="text-center pt-4 space-x-4">
                        <Button onClick={() => router.push('/home/ai-advisor/career-quiz')}>
                            <ChevronLeft className="mr-2" /> Retake Quiz
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
