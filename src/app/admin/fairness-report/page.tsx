
'use client';

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const genderData = [
    { name: 'Male', applicants: 600, placed: 510, rate: 85 },
    { name: 'Female', applicants: 650, placed: 552, rate: 85 },
];

const districtTypeData = [
    { name: 'Urban', applicants: 750, placed: 630, rate: 84 },
    { name: 'Rural', applicants: 350, placed: 301, rate: 86 },
    { name: 'Aspirational', applicants: 150, placed: 128, rate: 85 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

const detailedBreakdown = [
    { category: 'Gender: Male', submitted: 600, eligible: 580, placed: 510, placementRate: '87.9%' },
    { category: 'Gender: Female', submitted: 650, eligible: 630, placed: 552, placementRate: '87.6%' },
    { category: 'District: Urban', submitted: 750, eligible: 720, placed: 630, placementRate: '87.5%' },
    { category: 'District: Rural', submitted: 350, eligible: 340, placed: 301, placementRate: '88.5%' },
    { category: 'District: Aspirational', submitted: 150, eligible: 145, placed: 128, placementRate: '88.2%' },
    { category: 'College Tier: 1', submitted: 400, eligible: 390, placed: 345, placementRate: '88.5%' },
    { category: 'College Tier: 2', submitted: 600, eligible: 580, placed: 510, placementRate: '87.9%' },
    { category: 'College Tier: 3', submitted: 250, eligible: 235, placed: 204, placementRate: '86.8%' },
];

export default function FairnessReportPage() {

    return (
        <div className="container mx-auto py-8">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fairness & Equity Report</h1>
                    <p className="text-muted-foreground">
                    An overview of the internship allocation process by demographic groups.
                    </p>
                </div>
                <Button>
                    <Download className="mr-2"/> Download Full Report
                </Button>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                    <div className="flex gap-4">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Cycle" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">2024 Cycle</SelectItem>
                                <SelectItem value="2023">2023 Cycle</SelectItem>
                                <SelectItem value="2022">2022 Cycle</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All States</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Placement Rate by Gender</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={genderData} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`}/>
                                <YAxis type="category" dataKey="name" width={80} />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend />
                                <Bar dataKey="rate" name="Placement Rate" fill="hsl(var(--primary))" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Placement Rate by District Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={districtTypeData} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                                <YAxis type="category" dataKey="name" width={80} />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend />
                                <Bar dataKey="rate" name="Placement Rate" fill="hsl(var(--chart-2))" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Detailed Demographic Breakdown</CardTitle>
                    <CardDescription>A granular view of the allocation funnel across different demographic categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Demographic Category</TableHead>
                                <TableHead>Applications Submitted</TableHead>
                                <TableHead>Deemed Eligible</TableHead>
                                <TableHead>Placed</TableHead>
                                <TableHead className="text-right">Placement Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {detailedBreakdown.map((row) => (
                                <TableRow key={row.category}>
                                    <TableCell className="font-medium">{row.category}</TableCell>
                                    <TableCell>{row.submitted}</TableCell>
                                    <TableCell>{row.eligible}</TableCell>
                                    <TableCell>{row.placed}</TableCell>
                                    <TableCell className="text-right font-semibold">{row.placementRate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
