
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Users, Briefcase, BarChart, ArrowRight, Upload, PlayCircle, FilePieChart, Users2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { allHosts, internships } from '@/lib/demo-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const recentHosts = allHosts.slice(0, 10).map((host, index) => ({
    ...host,
    joined: `${index + 2} days ago`,
}));

const districtData = [
    { name: 'Urban Districts', value: 750, color: 'hsl(var(--primary))' },
    { name: 'Rural Districts', value: 350, color: 'hsl(var(--chart-2))' },
    { name: 'Aspirational Districts', value: 150, color: 'hsl(var(--accent))' },
];


export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overall platform analytics and management.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              +50 since last month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Host Organizations
            </CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +5 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Internships
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <p className="text-xs text-muted-foreground">+10 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Target: 90%</p>
          </CardContent>
        </Card>
      </div>

       <Card className="my-8">
            <CardHeader>
                <CardTitle>Operational Actions</CardTitle>
                <CardDescription>Key administrative tasks for managing the internship cycle.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
                <Button size="lg" variant="outline" asChild>
                    <Link href="/admin/data-upload"><Upload className="mr-2"/> Upload Student/Internship Data</Link>
                </Button>
                <Button size="lg" asChild>
                     <Link href="/admin/allocation"><PlayCircle className="mr-2"/> Run Allocation Engine</Link>
                </Button>
                 <Button size="lg" variant="secondary" asChild>
                    <Link href="/admin/fairness-report"><FilePieChart className="mr-2"/> View Fairness Report</Link>
                </Button>
            </CardContent>
        </Card>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
           <Tabs defaultValue="hosts">
                <CardHeader>
                     <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="hosts">Recent Host Sign-ups</TabsTrigger>
                        <TabsTrigger value="internships">Recent Internships</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="hosts">
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Organization</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {recentHosts.map((host) => (
                                <TableRow key={host.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                        src={host.logoUrl}
                                        alt={host.name}
                                        />
                                        <AvatarFallback>
                                        {host.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="font-medium">{host.name}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{host.joined}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" asChild>
                                    <Link href={`/admin/contact?host=${host.name}`}>Contact</Link>
                                    </Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                     <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/admin/contact">View All Organizations <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </TabsContent>
                 <TabsContent value="internships">
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Internship Title</TableHead>
                                    <TableHead>Organization</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {internships.slice(0,10).map((internship) => (
                                    <TableRow key={internship.id}>
                                    <TableCell className="font-medium">{internship.title}</TableCell>
                                    <TableCell>{internship.organization}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/internships/${internship.id}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                     <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/admin/internships">View All Internships <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </TabsContent>
           </Tabs>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>
              A breakdown of students by district type.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={districtData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {districtData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
