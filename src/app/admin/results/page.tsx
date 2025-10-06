
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
import { internships, studentProfile } from "@/lib/demo-data";
import { MoreHorizontal, Search, Download } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const allocationResults = [
    { student: {...studentProfile, id: 'user-student-01', avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe'}, internship: internships[0], fitScore: 92, status: 'Accepted' },
    { student: {name: 'Ben Carter', email: 'ben.carter@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=bencarter', id: 'user-student-02'}, internship: internships[1], fitScore: 88, status: 'Accepted' },
    { student: {name: 'Chloe Davis', email: 'chloe.davis@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=chloedavis', id: 'user-student-03'}, internship: internships[2], fitScore: 85, status: 'Declined' },
    { student: {name: 'David Evans', email: 'david.evans@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=davidevans', id: 'user-student-04'}, internship: internships[4], fitScore: 78, status: 'Pending' },
];

export default function AllocationResultsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResults = useMemo(() => {
        return allocationResults.filter(result => 
            result.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.internship.organization.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);
    
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Allocation Results</h1>
            <p className="text-muted-foreground">Review the results from the latest allocation run.</p>
        </div>
         <Button>
            <Download className="mr-2"/> Download Results (.csv)
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>All Matches</CardTitle>
            <CardDescription>A list of all students matched with internships.</CardDescription>
            <div className="relative pt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by student, internship, or organization..." 
                    className="pl-10 max-w-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Internship</TableHead>
                <TableHead>Fit Score</TableHead>
                <TableHead>Student Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={result.student.avatarUrl} alt={result.student.name} />
                            <AvatarFallback>{result.student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{result.student.name}</p>
                            <p className="text-sm text-muted-foreground">{result.student.email}</p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{result.internship.title}</p>
                    <p className="text-sm text-muted-foreground">{result.internship.organization}</p>
                  </TableCell>
                   <TableCell>
                    <Badge variant="secondary">{result.fitScore}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                        result.status === 'Accepted' ? 'default' :
                        result.status === 'Declined' ? 'destructive' :
                        'outline'
                    }>{result.status}</Badge>
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
