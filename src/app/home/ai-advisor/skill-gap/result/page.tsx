
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, BookOpen, CheckCircle, XCircle, Percent, ChevronLeft, Target, BarChart2, AlertCircle } from 'lucide-react';
import type { SkillQuiz, SkillGapRecommendationOutput, SkillQuizAnswers } from '@/ai/flows/skill-gap-flow';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ReactMarkdown from 'react-markdown';


type ResultData = {
    quiz: SkillQuiz;
    answers: SkillQuizAnswers;
    recommendations: SkillGapRecommendationOutput;
    desiredJob: string;
}

export default function SkillGapResultPage() {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedResults = sessionStorage.getItem('skillQuizResults');
        if (storedResults) {
            setResultData(JSON.parse(storedResults));
        } else {
            // Redirect if no data, maybe show a toast
            router.push('/home/ai-advisor/skill-gap');
        }
    }, [router]);

    if (!resultData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Lightbulb className="h-12 w-12 animate-spin" />
            </div>
        );
    }
    
    const { quiz, answers, recommendations, desiredJob } = resultData;
    
    const correctAnswersCount = answers?.answers?.reduce((acc, answer, index) => {
        if (!answer || answer.selectedAnswers.length === 0) {
            return acc; // Unanswered is not correct
        }
        const isCorrect = JSON.stringify(answer.selectedAnswers.sort()) === JSON.stringify(answer.correctAnswers.sort());
        return acc + (isCorrect ? 1 : 0);
    }, 0) || 0;
    const totalQuestions = quiz?.questions?.length || 0;
    const score = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

    const getProficiency = (s: number) => {
        if (s >= 80) return { level: "Excellent", className: "text-green-500" };
        if (s >= 60) return { level: "Good", className: "text-blue-500" };
        if (s >= 40) return { level: "Developing", className: "text-orange-500" };
        return { level: "Foundational", className: "text-red-500" };
    }
    const proficiency = getProficiency(score);

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Your Skill Gap Analysis Results</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    An AI-powered breakdown of your skills for the <strong>{desiredJob}</strong> role.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Analysis & Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground whitespace-pre-wrap mb-6">{recommendations.analysisSummary}</p>
                             <div className='prose prose-sm dark:prose-invert max-w-none space-y-2'>
                                {recommendations.analysisBullets?.map((bullet, i) => <ReactMarkdown key={i}>{bullet}</ReactMarkdown>)}
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                             <CardTitle>Review Your Answers</CardTitle>
                             <CardDescription>See which questions you got right and wrong to understand where to improve.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {quiz?.questions?.map((q, index) => {
                                    const userAnswer = answers?.answers?.[index];
                                    if (!userAnswer) return null;

                                    const isCorrect = userAnswer.selectedAnswers.length > 0 && JSON.stringify(userAnswer.selectedAnswers.sort()) === JSON.stringify(userAnswer.correctAnswers.sort());
                                    const isSkipped = userAnswer.selectedAnswers.length === 0;

                                    let triggerClassName = "";
                                    let icon = null;
                                    let statusText = "";

                                    if (isSkipped) {
                                        triggerClassName = "text-muted-foreground";
                                        icon = <AlertCircle className="h-5 w-5" />;
                                        statusText = "Skipped"
                                    } else if (isCorrect) {
                                        triggerClassName = "text-green-600";
                                        icon = <CheckCircle className="h-5 w-5" />;
                                        statusText = "Correct"
                                    } else {
                                        triggerClassName = "text-red-600";
                                        icon = <XCircle className="h-5 w-5" />;
                                        statusText = "Incorrect"
                                    }


                                    return (
                                        <AccordionItem value={`item-${index}`} key={index}>
                                            <AccordionTrigger className={cn("text-left hover:no-underline", triggerClassName)}>
                                                <div className="flex items-center gap-2">
                                                    {icon}
                                                    Question {index + 1}: {q.questionText}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-semibold">Your Answer:</h4>
                                                    {isSkipped ? (
                                                        <p className="text-muted-foreground italic">No answer selected</p>
                                                    ) : (
                                                        userAnswer.selectedAnswers.map(ans => <p key={ans} className="text-muted-foreground">{ans}</p>)
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="font-semibold">Correct Answer:</h4>
                                                    {userAnswer.correctAnswers.map(ans => <p key={ans} className="text-muted-foreground">{ans}</p>)}
                                                </div>
                                                <div className="space-y-2 p-3 bg-blue-500/10 rounded-md border border-blue-500/20">
                                                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Explanation:</h4>
                                                    <p className="text-muted-foreground">{q.explanation}</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </CardContent>
                    </Card>
                     <div className="text-center pt-4 space-x-4">
                        <Button onClick={() => router.push('/home/ai-advisor/skill-gap')}>
                            <ChevronLeft className="mr-2" /> Take Another Quiz
                        </Button>
                    </div>
                </div>
                <aside className="lg:col-span-1 sticky top-24 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Score</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <p className="text-6xl font-bold flex items-center justify-center">
                                {score} <Percent className="h-10 w-10 text-muted-foreground" />
                            </p>
                             <p className="text-xl font-medium">
                                Proficiency: <span className={proficiency.className}>{proficiency.level}</span>
                             </p>
                            <p className="text-sm text-muted-foreground">
                                You answered {correctAnswersCount} out of {totalQuestions} questions correctly.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target/> Skill Proficiency</CardTitle>
                            <CardDescription>Your estimated proficiency based on the quiz.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={recommendations.skillProficiency} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" domain={[0, 100]} hide />
                                    <YAxis dataKey="skillArea" type="category" width={120} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--secondary))' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Skill
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                        {payload[0].payload.skillArea}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Proficiency
                                                        </span>
                                                        <span className="font-bold">
                                                        {payload[0].value}%
                                                        </span>
                                                    </div>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            return null
                                            }}
                                    />
                                    <Bar dataKey="proficiency" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen /> Recommended Courses</CardTitle>
                            <CardDescription>Your personalized learning path to fill the gaps.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-3">
                                {recommendations.recommendedCourses.map((course) => (
                                    <li key={course.id}>
                                        <Link href={`/home/courses/${course.id}`} className="block group">
                                            <div className="flex items-center gap-3 p-3 bg-background rounded-md transition-all duration-200 group-hover:bg-primary/10 group-hover:shadow-md border group-hover:border-primary/20">
                                                 <div className="bg-primary/10 p-2 rounded-full">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-medium text-sm">{course.name}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
