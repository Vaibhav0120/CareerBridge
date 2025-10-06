
'use client';

import { useState, useMemo, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { feedback, internships, courses } from '@/lib/demo-data';
import { Star, MessageSquare, Briefcase, BookOpen, Wand2, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { FeedbackAnalysisOutput } from '@/ai/flows/feedback-analysis-flow';
import { getImprovementSuggestionsAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function HostFeedbackPage() {
  const [filterType, setFilterType] = useState('all');
  const [filterId, setFilterId] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const [isPending, startTransition] = useTransition();
  const [aiSuggestions, setAiSuggestions] = useState<FeedbackAnalysisOutput | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const { toast } = useToast();

  const hostCourses = courses.slice(0, 2); // Demo data for courses by this host
  const hostInternships = internships.slice(0, 2); // Demo data for internships by this host

  const filteredFeedback = useMemo(() => {
    return feedback.filter((fb) => {
      const matchesType =
        filterType === 'all' || fb.targetType === filterType;

      const matchesId =
        filterId === 'all' ||
        (filterType === 'course' && fb.targetId === filterId) ||
        (filterType === 'internship' && fb.targetId === filterId);

      const matchesRating =
        filterRating === 'all' || fb.rating === parseInt(filterRating);

      // Only show feedback for this host's courses/internships
      const isHostItem = hostCourses.some(c => c.id === fb.targetId) || hostInternships.some(i => i.id === fb.targetId);

      return matchesType && matchesId && matchesRating && isHostItem;
    });
  }, [filterType, filterId, filterRating, hostCourses, hostInternships]);
  
  const averageRating = useMemo(() => {
      const hostFeedback = feedback.filter(fb => hostCourses.some(c => c.id === fb.targetId) || hostInternships.some(i => i.id === fb.targetId));
      if (hostFeedback.length === 0) return 0;
      const total = hostFeedback.reduce((acc, fb) => acc + fb.rating, 0);
      return (total / hostFeedback.length).toFixed(1);
  }, [hostCourses, hostInternships]);

  const handleGenerateSuggestions = () => {
    if (filteredFeedback.length < 3) {
        toast({
            variant: 'destructive',
            title: 'Not Enough Feedback',
            description: 'Please select at least 3 feedback entries to generate suggestions.',
        });
        return;
    }
    startTransition(async () => {
        setAiSuggestions(null);
        setAiError(null);
        const feedbackItems = filteredFeedback.map(fb => ({
            targetType: fb.targetType,
            targetName: fb.targetName,
            rating: fb.rating,
            comment: fb.comment,
        }));
        const result = await getImprovementSuggestionsAction({ feedbackItems });
        if (result.success) {
            setAiSuggestions(result.data);
        } else {
            setAiError(result.error);
        }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Student Feedback</h1>
        <p className="text-muted-foreground">
          Review feedback from students on your courses and internships.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{filteredFeedback.length}</div>
                <p className="text-xs text-muted-foreground">matching current filters</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{averageRating} / 5</div>
                <p className="text-xs text-muted-foreground">across all your items</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Improvement Suggestions</CardTitle>
                <Wand2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Suggestions</div>
                 <p className="text-xs text-muted-foreground">Based on filtered feedback</p>
            </CardContent>
             <CardFooter>
                <Button onClick={handleGenerateSuggestions} disabled={isPending} className="w-full">
                    {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Suggestions"}
                </Button>
            </CardFooter>
        </Card>
      </div>

      {(aiSuggestions || aiError || isPending) && (
           <div className="mb-8">
            {isPending && (
                <Card className="flex items-center justify-center p-8 h-64">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <h3 className="font-semibold text-lg">AI is analyzing feedback...</h3>
                        <p className="text-sm text-muted-foreground">This may take a moment.</p>
                    </div>
                </Card>
            )}
            {aiError && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{aiError}</AlertDescription></Alert>}
            {aiSuggestions && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-accent"/> AI-Generated Suggestions</CardTitle>
                        <CardDescription>
                            Here are the key themes and actionable suggestions identified from the selected feedback.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Overall Summary</h3>
                            <p className="text-sm text-muted-foreground">{aiSuggestions.overallSummary}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Actionable Insights</h3>
                             <Accordion type="single" collapsible className="w-full">
                                {aiSuggestions.suggestions.map((suggestion, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger>{suggestion.theme}</AccordionTrigger>
                                        <AccordionContent className="space-y-3">
                                            <p className="font-medium text-primary">{suggestion.suggestion}</p>
                                            <h4 className="text-xs uppercase text-muted-foreground font-semibold pt-2">Supporting Feedback</h4>
                                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                               {suggestion.supportingEvidence.map((quote, qIndex) => (
                                                 <li key={qIndex} className="italic">"{quote}"</li>
                                               ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            )}
           </div>
      )}


      <Card>
        <CardHeader>
            <CardTitle>Feedback Entries</CardTitle>
            <CardDescription>Browse and filter student feedback below.</CardDescription>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="course">Courses</SelectItem>
                        <SelectItem value="internship">Internships</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterId} onValueChange={setFilterId} disabled={filterType === 'all'}>
                     <SelectTrigger className="w-full md:w-[240px]">
                        <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        {filterType === 'course' && hostCourses.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                        {filterType === 'internship' && hostInternships.map(i => <SelectItem key={i.id} value={i.id}>{i.title}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={filterRating} onValueChange={setFilterRating}>
                     <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            {filteredFeedback.length > 0 ? (
                filteredFeedback.map((fb) => (
                    <div key={fb.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                            <Avatar className="mt-1">
                                <AvatarImage src={fb.studentAvatarUrl} alt={fb.studentName} />
                                <AvatarFallback>{fb.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{fb.studentName}</p>
                                        <p className="text-xs text-muted-foreground">{fb.date}</p>
                                    </div>
                                    <StarRating rating={fb.rating} />
                                </div>
                                <div className="mt-2">
                                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                                        {fb.targetType === 'course' ? <BookOpen className="h-3 w-3"/> : <Briefcase className="h-3 w-3"/>}
                                        {fb.targetName}
                                    </Badge>
                                </div>
                                <p className="mt-3 text-muted-foreground">{fb.comment}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No feedback matching your current filters.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
