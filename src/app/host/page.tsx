
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Users,
  Briefcase,
  MessageSquare,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { allApplicants, internships } from '@/lib/demo-data';


const applicantData = allApplicants.slice(0, 4);

const chartData = [
    { name: 'SWE Intern', applicants: 28 },
    { name: 'PM Intern', applicants: 18 },
    { name: 'Data Sci Intern', applicants: 22 },
    { name: 'UX/UI Intern', applicants: 12 },
    { name: 'Marketing Intern', applicants: 15 },
];

export default function HostDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Host Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your internship activities.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>
                The latest students who have applied to your internships.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Applied For</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicantData.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={applicant.avatarUrl}
                              alt={applicant.name}
                            />
                            <AvatarFallback>
                              {applicant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{applicant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{internships.find(i => i.id === applicant.internshipId)?.title}</TableCell>
                       <TableCell>
                        <Badge variant="outline">{applicant.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/host/students/${applicant.id}`}>View Profile</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/host/students">
                  View All Applicants <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applicants per Internship</CardTitle>
              <CardDescription>A visual overview of applicant interest.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} barCategoryGap="20%">
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--secondary))', radius: 4 }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="applicants" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar Content */}
        <div className="md:col-span-1 space-y-8">
            <div className="space-y-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Active Internships
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">+2 since last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Applicants
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85</div>
                        <p className="text-xs text-muted-foreground">+15 since last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Pending Feedback
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Due this week</p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                <Button asChild>
                    <Link href="/host/internships/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Internship
                    </Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="/host/students">
                    <Users className="mr-2 h-4 w-4" /> View All Applicants
                    </Link>
                </Button>
                 <Button asChild variant="secondary">
                    <Link href="/host/courses/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add a Course
                    </Link>
                </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
