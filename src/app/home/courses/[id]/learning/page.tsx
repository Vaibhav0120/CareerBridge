
'use client';

import { courses } from '@/lib/demo-data';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  PlayCircle,
  FileText,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import Image from 'next/image';

export default function CourseLearningPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = courses.find((c) => c.id === courseId);
  const [activeModule, setActiveModule] = useState(0);

  if (!course) {
    notFound();
  }
  
  const handleNext = () => {
    if (activeModule < course.modules.length - 1) {
        setActiveModule(activeModule + 1);
    }
  }

  const handlePrev = () => {
      if (activeModule > 0) {
          setActiveModule(activeModule - 1);
      }
  }


  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Course Content Sidebar */}
      <aside className="w-80 border-r bg-secondary/50 p-4 flex-col hidden md:flex">
        <div className="mb-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2">
                <ChevronLeft className="mr-2 h-4 w-4"/> Back to Details
            </Button>
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="text-sm text-muted-foreground">{course.provider}</p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="w-full overflow-auto">
          {course.modules.map((module, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger 
                className={`text-left hover:no-underline ${activeModule === index ? 'text-primary' : ''}`}
                onClick={() => setActiveModule(index)}
              >
                Module {index + 1}: {module.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    <PlayCircle className="h-4 w-4" />
                    <span>Video: {module.title}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Reading: Introduction</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    <HelpCircle className="h-4 w-4" />
                    <span>Quiz: Module {index + 1}</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Module {activeModule + 1} of {course.modules.length}</p>
            <h1 className="text-3xl font-bold font-headline">{course.modules[activeModule].title}</h1>
          </div>

          {/* Video Player */}
          <Card className="mb-6 overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
               <Image 
                    src={`https://picsum.photos/seed/${course.id}-${activeModule}/1920/1080`}
                    alt={`Module ${activeModule + 1} video`}
                    width={1920}
                    height={1080}
                    data-ai-hint="learning tutorial"
                    className="w-full h-full object-cover"
               />
            </div>
          </Card>

          {/* Tabs for Reading, Quiz, etc. */}
          <Tabs defaultValue="reading" className="w-full">
            <TabsList>
              <TabsTrigger value="reading">
                <FileText className="mr-2 h-4 w-4" /> Reading Material
              </TabsTrigger>
              <TabsTrigger value="quiz">
                <HelpCircle className="mr-2 h-4 w-4" /> Quiz
              </TabsTrigger>
            </TabsList>
            <TabsContent value="reading">
                <Card>
                    <CardHeader><CardTitle>Introduction to {course.modules[activeModule].title}</CardTitle></CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                        <p>
                           This section provides supplementary reading material to reinforce the concepts covered in the video. 
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, 
                           dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas 
                           ligula massa, varius a, semper congue, euismod non, mi. 
                        </p>
                         <p>
                           Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. 
                           Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. 
                           Ut in risus volo utпат nonummy.
                        </p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="quiz">
                 <Card>
                    <CardHeader><CardTitle>Module {activeModule + 1} Quiz</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <p className="font-medium">1. What is the primary focus of this module?</p>
                            <RadioGroup defaultValue="option-one">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-one" id="q1-o1" />
                                    <Label htmlFor="q1-o1">The core concepts of {course.category}.</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-two" id="q1-o2" />
                                    <Label htmlFor="q1-o2">An unrelated topic.</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-three" id="q1-o3" />
                                    <Label htmlFor="q1-o3">A historical overview.</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <Button>Submit Quiz</Button>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={activeModule === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Module
            </Button>
            <Button onClick={handleNext} disabled={activeModule === course.modules.length - 1}>
              Next Module
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
