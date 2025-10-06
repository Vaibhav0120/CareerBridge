
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter, useParams, notFound } from 'next/navigation';
import { ChevronLeft, PlusCircle, Trash2, GripVertical, FileText, PlaySquare, HelpCircle, BookCopy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courses, sampleMarkdownContent, sampleQuizContent } from '@/lib/demo-data';

const contentBlockSchema = z.object({
  type: z.enum(['video', 'text', 'quiz']),
  title: z.string().min(3, 'Content title is required.'),
  content: z.string().min(10, 'Content is required.'),
});

const moduleSchema = z.object({
  title: z.string().min(3, 'Module title is required.'),
  contentBlocks: z.array(contentBlockSchema).min(1, 'Each module must have at least one content block.'),
});

const courseFormSchema = z.object({
  title: z.string().min(5, 'Course title must be at least 5 characters.'),
  category: z.string().min(2, 'Category is required.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  modules: z.array(moduleSchema).min(1, 'Course must have at least one module.'),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const courseId = params.id as string;
  
  const courseToEdit = courses.find(c => c.id === courseId);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: courseToEdit ? {
      title: courseToEdit.title,
      category: courseToEdit.category.toLowerCase().replace(' ', '-'),
      description: courseToEdit.description,
      modules: courseToEdit.modules.map(m => ({
          title: m.title,
          // For demo purposes, we'll create some mock content blocks
          contentBlocks: [
              { type: 'video', title: `${m.title} Video`, content: 'https://www.youtube.com/watch?v=example' },
              { type: 'text', title: `Reading for ${m.title}`, content: sampleMarkdownContent},
              { type: 'quiz', title: `Quiz for ${m.title}`, content: sampleQuizContent }
          ]
      }))
    } : {},
  });

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: 'modules',
  });

  if (!courseToEdit) {
    return notFound();
  }

  const onSubmit = (data: CourseFormValues) => {
    console.log(data);
    toast({
      title: '✅ Course Updated!',
      description: `The course "${data.title}" has been successfully updated.`,
    });
    router.push('/host/courses');
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
       <div className="mb-4">
        <Button variant="ghost" asChild>
          <Link href="/host/courses">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Edit Course</CardTitle>
              <CardDescription>Update the details for your course below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Introduction to Web Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="product-management">Product Management</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Provide a detailed overview of what students will learn in this course."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2"><BookCopy/> Course Modules</h2>
            {moduleFields.map((moduleItem, moduleIndex) => (
              <ModuleField
                key={moduleItem.id}
                moduleIndex={moduleIndex}
                removeModule={removeModule}
                form={form}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => appendModule({ title: '', contentBlocks: [{ type: 'video', title: '', content: '' }] })}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Module
            </Button>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ModuleField({ moduleIndex, removeModule, form }: { moduleIndex: number, removeModule: (index: number) => void, form: any }) {
  const { fields: contentFields, append: appendContent, remove: removeContent } = useFieldArray({
    control: form.control,
    name: `modules.${moduleIndex}.contentBlocks`,
  });

  return (
    <Card className="border-dashed">
      <CardHeader className='flex-row items-center justify-between'>
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl">Module {moduleIndex + 1}</CardTitle>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => removeModule(moduleIndex)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
      </CardHeader>
      <CardContent className="space-y-6 pl-12">
        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., HTML & CSS Basics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
            <h4 className="font-medium text-muted-foreground">Module Content</h4>
            {contentFields.map((contentItem, contentIndex) => (
                <div key={contentItem.id} className="rounded-lg border bg-secondary/30 p-4 space-y-4">
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <span className="font-semibold">Content Block {contentIndex + 1}</span>
                         </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeContent(contentIndex)}>
                           <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                     </div>
                     <Separator/>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name={`modules.${moduleIndex}.contentBlocks.${contentIndex}.type`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Content Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select content type" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="video"><PlaySquare className="mr-2 h-4 w-4 inline-block"/> Video</SelectItem>
                                    <SelectItem value="text"><FileText className="mr-2 h-4 w-4 inline-block"/> Text</SelectItem>
                                    <SelectItem value="quiz"><HelpCircle className="mr-2 h-4 w-4 inline-block"/> Quiz</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`modules.${moduleIndex}.contentBlocks.${contentIndex}.title`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Content Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Your First HTML page" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                     </div>
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.contentBlocks.${contentIndex}.content`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                rows={5}
                                placeholder="Enter the content here. For a video, this would be the URL. For a quiz, format as: Question? | Option A | Option B | Option C"
                                {...field}
                                />
                            </FormControl>
                             <FormDescription>
                                {form.watch(`modules.${moduleIndex}.contentBlocks.${contentIndex}.type`) === 'video' && 'Paste the full URL of the video (e.g., from YouTube or Vimeo).'}
                                {form.watch(`modules.${moduleIndex}.contentBlocks.${contentIndex}.type`) === 'text' && 'Enter the reading material. Markdown is supported.'}
                                {form.watch(`modules.${moduleIndex}.contentBlocks.${contentIndex}.type`) === 'quiz' && 'Format: Question? | CorrectAnswer | WrongAnswer1 | WrongAnswer2'}
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
            ))}
             <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendContent({ type: 'video', title: '', content: '' })}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Content Block
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
