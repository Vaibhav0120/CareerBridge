
'use client';

import { useState, useMemo } from "react";
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
import { courses as initialCourses } from "@/lib/demo-data";
import { MoreHorizontal, PlusCircle, ShieldOff, ShieldCheck, Phone, Eye, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";
import { Input } from "@/components/ui/input";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    const filteredCourses = useMemo(() => {
        return courses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.provider.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [courses, searchQuery]);

    const handleToggleBlock = (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        let newStatus: Course['status'];
        let toastTitle: string;
        let toastDescription: string;

        if (course.status === 'Blocked') {
            newStatus = 'Inactive';
            toastTitle = 'Course Unblocked';
            toastDescription = `"${course.title}" has been unblocked and is now inactive.`;
        } else {
            newStatus = 'Blocked';
            toastTitle = 'Course Blocked';
            toastDescription = `"${course.title}" has been blocked.`;
        }
        
        setCourses((current) =>
            current.map((c) =>
                c.id === courseId ? { ...c, status: newStatus } : c
            )
        );

        toast({
            title: toastTitle,
            description: toastDescription,
        });
    };
    
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
            <p className="text-muted-foreground">Add, edit, or block courses on the platform.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>All Courses</CardTitle>
            <CardDescription>A list of all courses available on the platform.</CardDescription>
            <div className="relative pt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by title or provider..." 
                    className="pl-10 max-w-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.provider}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                        course.status === 'Active' ? 'default' :
                        course.status === 'Blocked' ? 'destructive' :
                        'secondary'
                    }>{course.status}</Badge>
                  </TableCell>
                  <TableCell>
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
                            <Link href={`/admin/courses/${course.id}`}><Eye className="mr-2 h-4 w-4" /> View Course Page</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleBlock(course.id)}>
                           {course.status === 'Blocked' ? (
                                <><ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> Unblock</>
                            ) : (
                                <><ShieldOff className="mr-2 h-4 w-4 text-red-500" /> Block</>
                            )}
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                            <Link href={`/admin/contact?host=${course.provider}`}><Phone className="mr-2 h-4 w-4" /> Contact Host</Link>
                         </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
