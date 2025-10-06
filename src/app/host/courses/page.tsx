
'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { courses as allCourses, users } from "@/lib/demo-data";
import { MoreHorizontal, PlusCircle, Trash2, Pencil, Headset, ToggleLeft, ToggleRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";

// A new client component to prevent hydration mismatch
function EnrolledCell() {
    const [enrolled, setEnrolled] = useState<number | null>(null);
    useEffect(() => {
        // This code only runs on the client, after hydration
        setEnrolled(Math.floor(Math.random() * 100));
    }, []);

    return <>{enrolled ?? '...'}</>;
}


export default function HostCoursesPage() {
  // For demo, we assume the host is "InnovateTech"
  const hostCoursesData = allCourses.filter(c => c.provider === 'InnovateTech');
  const [courses, setCourses] = useState<Course[]>(hostCoursesData);
  const { toast } = useToast();

  const handleDeleteCourse = (courseId: string, courseTitle: string) => {
    setCourses(currentCourses => currentCourses.filter(course => course.id !== courseId));
    toast({
        title: "Course Deleted",
        description: `The course "${courseTitle}" has been removed.`,
        variant: 'destructive'
    });
  }

  const handleToggleStatus = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || course.status === 'Blocked') return;

    const newStatus = course.status === 'Active' ? 'Inactive' : 'Active';
    
    setCourses((current) =>
        current.map((c) =>
            c.id === courseId ? { ...c, status: newStatus } : c
        )
    );

    toast({
        title: 'Status Updated',
        description: `"${course.title}" has been marked as ${newStatus}.`,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
            <p className="text-muted-foreground">Add, edit, or remove your organization's courses.</p>
        </div>
        <Button asChild>
          <Link href="/host/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Students Enrolled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <EnrolledCell />
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.status === 'Active' ? 'default' : course.status === 'Inactive' ? 'secondary' : 'destructive'}>{course.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                            <Link href={`/host/courses/${course.id}/edit`}><Pencil className="mr-2 h-4 w-4" /> Edit</Link>
                            </DropdownMenuItem>

                            {course.status !== 'Blocked' ? (
                                <DropdownMenuItem onClick={() => handleToggleStatus(course.id)}>
                                    {course.status === 'Active' ? <ToggleLeft className="mr-2 h-4 w-4" /> : <ToggleRight className="mr-2 h-4 w-4" />}
                                    Mark as {course.status === 'Active' ? 'Inactive' : 'Active'}
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem asChild>
                                    <Link href="/host/contact"><Headset className="mr-2 h-4 w-4" /> Contact Admin</Link>
                                </DropdownMenuItem>
                            )}

                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem 
                                    className="text-red-600 focus:text-red-600"
                                    onSelect={(e) => e.preventDefault()} // Prevents dropdown from closing
                                >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                course <span className="font-semibold">&quot;{course.title}&quot;</span>.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                onClick={() => handleDeleteCourse(course.id, course.title)}
                                >
                                Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
