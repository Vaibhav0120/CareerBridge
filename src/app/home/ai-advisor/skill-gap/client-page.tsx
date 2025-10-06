

"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { generateSkillQuizAction, getRecommendationsFromSkillQuizAction, saveSkillQuizResultAction } from "./actions";
import type { SkillQuiz, SkillGapRecommendationOutput, SkillQuizAnswers } from "@/ai/flows/skill-gap-flow";
import type { SkillAssessmentAttempt } from "@/lib/types";
import { Loader2, Wand2, Lightbulb, ChevronLeft, ChevronRight, BookOpen, Search, CheckCircle, XCircle, History, BarChart2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { skillAssessmentHistory } from "@/lib/demo-data";
import { Separator } from "@/components/ui/separator";

const jobFormSchema = z.object({
  desiredJob: z.string().min(3, "Please enter a valid job title."),
});
type JobFormValues = z.infer<typeof jobFormSchema>;

const answerSchema = z.object({
    questionIndex: z.number(),
    selectedOptionIndex: z.number().optional(),
    selectedOptionIndices: z.array(z.number()).optional(),
});


const quizFormSchema = z.object({
  answers: z.array(answerSchema).min(1),
});
type QuizFormValues = z.infer<typeof quizFormSchema>;

type PageState = "idle" | "generating_quiz" | "quiz" | "generating_recommendations" | "submitting" | "results" | "error";

export default function SkillGapClientPage() {
  const [isPending, startTransition] = useTransition();
  const [pageState, setPageState] = useState<PageState>("idle");
  const [quiz, setQuiz] = useState<SkillQuiz | null>(null);
  const [recommendations, setRecommendations] = useState<SkillGapRecommendationOutput | null>(null);
  const [desiredJob, setDesiredJob] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(0);

  const router = useRouter();


  const jobForm = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: { desiredJob: "" },
  });

  const quizForm = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: { answers: [] },
  });
  
  const handleStartAssessment = (values: JobFormValues) => {
    setDesiredJob(values.desiredJob);
    startTransition(async () => {
      setPageState("generating_quiz");
      setError(null);
      const result = await generateSkillQuizAction(values.desiredJob);
      if (result.success && result.data) {
        setQuiz(result.data);
        quizForm.reset({
          answers: result.data.questions.map((q, index) => ({
            questionIndex: index,
            selectedOptionIndex: undefined,
            selectedOptionIndices: q.allowMultiple ? [] : undefined,
          })),
        });
        setCurrentQuestion(0);
        setPageState("quiz");
      } else {
        setError(result.error || "An unknown error occurred.");
        setPageState("error");
      }
    });
  };

  const processQuizSubmission = () => {
     if (!quiz) return;
     const values = quizForm.getValues();
     setPageState("submitting");
     startTransition(async () => {
         setError(null);
 
         const formattedAnswers: SkillQuizAnswers = {
             answers: quiz.questions.map((q, index) => {
                 const answer = values.answers[index];
                 const selectedAnswers: string[] = [];
                 const correctAnswers: string[] = [];
                 
                 if (q.allowMultiple) {
                     answer.selectedOptionIndices?.forEach(i => selectedAnswers.push(q.options[i]));
                     q.correctOptionIndices?.forEach(i => correctAnswers.push(q.options[i]));
                 } else if (answer.selectedOptionIndex !== undefined) {
                     selectedAnswers.push(q.options[answer.selectedOptionIndex]);
                     if (q.correctOptionIndex !== undefined) {
                       correctAnswers.push(q.options[q.correctOptionIndex]);
                     }
                 } else {
                    // Handle unanswered
                    if(q.correctOptionIndex !== undefined) {
                        correctAnswers.push(q.options[q.correctOptionIndex]);
                    }
                    if(q.correctOptionIndices) {
                        q.correctOptionIndices.forEach(i => correctAnswers.push(q.options[i]));
                    }
                 }
                 
                 return {
                     questionText: q.questionText,
                     selectedAnswers,
                     correctAnswers,
                 };
             }),
         };
         
         setPageState("generating_recommendations");
         const recommendationResult = await getRecommendationsFromSkillQuizAction(quiz, formattedAnswers, desiredJob);
         if (recommendationResult.success && recommendationResult.data) {
             const saveResult = await saveSkillQuizResultAction({
                quiz,
                answers: formattedAnswers,
                recommendations: recommendationResult.data,
                desiredJob,
                userId: 'user-student-01' // In a real app, this would come from auth session
            });

            if (saveResult.success) {
                sessionStorage.setItem('skillQuizResults', JSON.stringify({
                    quiz,
                    answers: formattedAnswers,
                    recommendations: recommendationResult.data,
                    desiredJob
                }));
                router.push('/home/ai-advisor/skill-gap/result');
            } else {
                setError(saveResult.error || "Failed to save results.");
                setPageState("error");
            }
         } else {
             setError(recommendationResult.error || "An unknown error occurred.");
             setPageState("error");
         }
     });
  }

  const handleViewPreviousResult = (attempt: SkillAssessmentAttempt) => {
    sessionStorage.setItem('skillQuizResults', JSON.stringify(attempt));
    router.push('/home/ai-advisor/skill-gap/result');
  };

  const handleQuizSubmitAttempt = () => {
    const values = quizForm.getValues();
    const unanswered = values.answers.filter(a => {
        if (Array.isArray(a.selectedOptionIndices)) {
            return a.selectedOptionIndices.length === 0;
        }
        return a.selectedOptionIndex === undefined;
    });

    if (unanswered.length > 0) {
        setUnansweredCount(unanswered.length);
        setIsSubmitDialogOpen(true);
    } else {
        processQuizSubmission();
    }
  };
  
  const goToNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
    }
  }

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
    }
  }

  const handleReset = () => {
    setPageState('idle');
    setQuiz(null);
    setRecommendations(null);
    setError(null);
    setCurrentQuestion(0);
    setDesiredJob("");
    jobForm.reset();
    quizForm.reset();
  }

  const renderContent = () => {
    switch (pageState) {
      case "idle":
        return (
          <>
            <Card>
              <Form {...jobForm}>
                  <form onSubmit={jobForm.handleSubmit(handleStartAssessment)}>
                      <CardHeader>
                          <CardTitle>AI Skill Assessment</CardTitle>
                          <CardDescription>
                              Enter your desired job role to get a personalized technical quiz from our AI.
                          </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <FormField
                              control={jobForm.control}
                              name="desiredJob"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Desired Job Role</FormLabel>
                                      <FormControl>
                                          <Input
                                              placeholder="e.g., Full-Stack Developer"
                                              {...field}
                                          />
                                      </FormControl>
                                      <FormDescription>
                                          Be specific for the best results (e.g., "React Native Developer", "Backend Python Engineer").
                                      </FormDescription>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </CardContent>
                      <CardFooter>
                          <Button type="submit" disabled={isPending} size="lg">
                              {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting...</> : "Start Skill Assessment"}
                          </Button>
                      </CardFooter>
                  </form>
              </Form>
            </Card>
            
            {skillAssessmentHistory.length > 0 && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><History/> Previous Attempts</CardTitle>
                        <CardDescription>Review the results from your past skill assessments.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {skillAssessmentHistory.map((attempt) => (
                           <div key={attempt.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                               <div className="space-y-1">
                                    <p className="font-semibold">{attempt.desiredJob}</p>
                                    <p className="text-sm text-muted-foreground">Taken on {attempt.date}</p>
                               </div>
                               <Button variant="outline" size="sm" onClick={() => handleViewPreviousResult(attempt)}>
                                   <BarChart2 className="mr-2 h-4 w-4" /> View Results
                               </Button>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            )}
          </>
        );

      case "generating_quiz":
      case "generating_recommendations":
        return (
          <Card className="flex flex-col items-center justify-center p-8 h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-semibold">
              {pageState === 'generating_quiz' ? `Building Quiz for ${desiredJob}...` : 'Analyzing Your Skills...'}
            </h3>
            <p className="text-muted-foreground text-center">
               {pageState === 'generating_quiz' ? 'Our AI is preparing technical questions for you.' : 'Our AI is identifying your knowledge gaps.'}
            </p>
          </Card>
        );
      
      case "quiz":
        if (!quiz) return null;
        const question = quiz.questions[currentQuestion];
        return (
          <Card>
            <Form {...quizForm}>
              <form id="skill-quiz-form" onSubmit={(e) => { e.preventDefault(); handleQuizSubmitAttempt(); }}>
                <CardHeader>
                    <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2"/>
                    <CardTitle className="pt-4">Question {currentQuestion + 1}/{quiz.questions.length}</CardTitle>
                    <CardDescription>Technical Assessment for: {desiredJob}</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[250px]" key={currentQuestion}>
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">{question.questionText}</Label>
                         {question.allowMultiple ? (
                             <FormField
                                name={`answers.${currentQuestion}.selectedOptionIndices`}
                                control={quizForm.control}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                    <div className="flex flex-col space-y-2">
                                        {question.options.map((option, index) => {
                                            const uniqueId = `q${currentQuestion}-option${index}`;
                                            return (
                                                <Label
                                                    key={uniqueId}
                                                    htmlFor={uniqueId}
                                                    className="flex w-full cursor-pointer items-center space-x-3 space-y-0 rounded-md border p-3 hover:border-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10"
                                                >
                                                    <Checkbox
                                                        id={uniqueId}
                                                        checked={field.value?.includes(index)}
                                                        onCheckedChange={(checked) => {
                                                          return checked
                                                            ? field.onChange([...(field.value || []), index])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                  (value) => value !== index
                                                                )
                                                              )
                                                        }}
                                                    />
                                                    <span className="font-normal">{option}</span>
                                                </Label>
                                            );
                                        })}
                                    </div>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        ) : (
                             <FormField
                                name={`answers.${currentQuestion}.selectedOptionIndex`}
                                control={quizForm.control}
                                render={({ field, fieldState }) => (
                                  <FormItem>
                                    <RadioGroup
                                        onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                        className="flex flex-col space-y-2"
                                        value={field.value !== undefined ? String(field.value) : undefined}
                                    >
                                        {question.options.map((option, index) => {
                                            const uniqueId = `q${currentQuestion}-option${index}`;
                                            return (
                                                <Label
                                                    key={uniqueId}
                                                    htmlFor={uniqueId}
                                                    className="flex w-full cursor-pointer items-center space-x-3 space-y-0 rounded-md border p-3 hover:border-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10"
                                                >
                                                    <RadioGroupItem value={String(index)} id={uniqueId} />
                                                    <span className="font-normal">{option}</span>
                                                </Label>
                                            );
                                        })}
                                    </RadioGroup>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                  </FormItem>
                                )}
                            />
                        )}
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button type="button" variant="outline" onClick={goToPrevQuestion} disabled={currentQuestion === 0}>
                        <ChevronLeft /> Previous
                    </Button>
                    {currentQuestion < quiz.questions.length - 1 ? (
                        <Button type="button" onClick={goToNextQuestion}>
                            Next <ChevronRight />
                        </Button>
                    ) : (
                       <Button type="submit" form="skill-quiz-form">Submit</Button>
                    )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        );

      case "submitting":
        return (
          <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submitting Quiz</DialogTitle>
                    <DialogDescription asChild>
                       <div className="flex flex-col items-center justify-center p-8">
                          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                          <span className="text-muted-foreground text-center">
                              Please wait while we analyze your answers...
                          </span>
                       </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
          </Dialog>
        );

      case "results":
        if (!recommendations) return null;
        return (
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <span>Your Personalized Learning Plan</span>
              </CardTitle>
              <CardDescription>
                Based on your quiz results for the <strong>{desiredJob}</strong> role, here are your identified skill gaps and recommended courses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Identified Skill Gaps</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendations?.identifiedGaps.map((gap) => (
                      <Badge key={gap} variant="destructive">{gap}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Analysis</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{recommendations.analysisSummary}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Recommended Courses</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {recommendations.recommendedCourses.map((course) => (
                        <li key={course.id}>{course.name}</li>
                      ))}
                    </ul>
                </div>
            </CardContent>
             <CardFooter className="flex-col items-start gap-4">
               <Button onClick={() => router.push('/home/courses')}>
                  <BookOpen className="mr-2"/> Explore Recommended Courses
               </Button>
               <Button onClick={handleReset} variant="outline">
                    Start a New Analysis
                </Button>
            </CardFooter>
          </Card>
        )

      case "error":
        return (
          <Card>
            <CardContent className="p-6">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                 <Button onClick={handleReset} variant="outline" className="mt-4">Try Again</Button>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {renderContent()}

      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Submit Quiz</DialogTitle>
                <DialogDescription>
                    You have <span className="font-bold text-red-500">{unansweredCount}</span> unanswered question(s). Are you sure you want to submit?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Go Back & Review</Button>
                </DialogClose>
                <Button type="button" onClick={processQuizSubmission} disabled={isPending}>
                    {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Anyway"}
                </Button>
            </DialogFooter>
        </DialogContent>
       </Dialog>
    </div>
  );
}
