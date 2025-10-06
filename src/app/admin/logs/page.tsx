
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const logHistory = [
    { id: 'run-001', date: '2024-07-28 10:30 AM', user: 'admin@careermatch.com', status: 'Completed', studentCount: 1250, internshipCount: 350, placementRate: 85.2 },
    { id: 'run-002', date: '2024-07-27 02:00 PM', user: 'system@careermatch.com', status: 'Completed', studentCount: 1245, internshipCount: 348, placementRate: 84.9 },
    { id: 'run-003', date: '2024-07-25 09:00 AM', user: 'admin@careermatch.com', status: 'Failed', studentCount: 1200, internshipCount: 340, placementRate: 0, error: "Data validation failed: Missing 'student_id' column." },
    { id: 'run-004', date: '2024-07-20 11:00 AM', user: 'admin@careermatch.com', status: 'Completed', studentCount: 1150, internshipCount: 320, placementRate: 86.1 },
];

export default function AuditLogsPage() {
    
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Audit &amp; Logs</h1>
        <p className="text-muted-foreground">
          A history of all major system events and allocation runs for compliance and review.
        </p>
      </div>

       <Card className="mt-8">
            <CardHeader>
                <CardTitle>Allocation Run History</CardTitle>
                <CardDescription>A log of all past internship allocation processes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Run ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Initiated By</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logHistory.map(log => (
                             <TableRow key={log.id}>
                                <TableCell className="font-mono text-xs">{log.id}</TableCell>
                                <TableCell>{log.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground"/>
                                        <span>{log.user}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={log.status === 'Completed' ? 'default' : 'destructive'}>
                                        <div className="flex items-center gap-1">
                                            {log.status === 'Completed' ? 
                                                <CheckCircle className="h-3 w-3" /> : 
                                                <AlertTriangle className="h-3 w-3" />
                                            }
                                            <span>{log.status}</span>
                                        </div>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {log.status === 'Completed' ? (
                                        `Placed ${log.studentCount} students in ${log.internshipCount} internships. Rate: ${log.placementRate}%`
                                    ) : (
                                        <span className="text-destructive">{log.error}</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4"/> Download Log
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
