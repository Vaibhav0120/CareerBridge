
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle, Trash2, Eye, ToggleLeft, ToggleRight, Search, Headset } from 'lucide-react';

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
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
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { internships as allInternships } from '@/lib/demo-data';
import { Input } from '@/components/ui/input';
import type { Internship } from '@/lib/types';


type InternshipWithStatus = Internship & { created: string };

// A new client component to prevent hydration mismatch for random data
function ApplicantCell() {
    const [applicants, setApplicants] = useState<number | null>(null);
    useEffect(() => {
        // This code only runs on the client, after hydration
        setApplicants(Math.floor(Math.random() * 50) + 5);
    }, []);

    return <>{applicants ?? '...'}</>;
}


export default function HostInternshipsPage() {
    // For demo, we assume the host is "InnovateTech"
    const hostInternshipsData = allInternships.filter(i => i.organization === 'InnovateTech').map((internship, index) => ({
      ...internship,
      created: `${index + 1} week ago`,
    }));

    const [internships, setInternships] = useState(hostInternshipsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState<InternshipWithStatus | null>(null);
    const { toast } = useToast();

    const filteredInternships = useMemo(() => {
        return internships.filter(internship =>
            internship.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [internships, searchQuery]);

    const handleDelete = () => {
        if (!selectedInternship) return;
        setInternships(current => current.filter(i => i.id !== selectedInternship.id));
        toast({
            title: "Internship Deleted",
            description: `The internship "${selectedInternship.title}" has been removed.`,
            variant: 'destructive',
        });
        setIsDeleteDialogOpen(false);
        setSelectedInternship(null);
    };

    const handleToggleStatus = (internshipId: string) => {
      const internship = internships.find((i) => i.id === internshipId);
      if (!internship || internship.status === 'Blocked') return;
  
      const newStatus = internship.status === 'Active' ? 'Closed' : 'Active';
      
      const currentInternships = internships.map((i) =>
        i.id === internshipId ? { ...i, status: newStatus } : i
      );
      setInternships(currentInternships);

      toast({
          title: 'Status Updated',
          description: `"${internship.title}" has been marked as ${newStatus}.`,
      });
    };
    
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Internships</h1>
          <p className="text-muted-foreground">View, edit, and manage your organization's internship postings.</p>
        </div>
        <Button asChild>
          <Link href="/host/internships/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Internship
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Internship Postings</CardTitle>
          <CardDescription>A list of all internships your organization has posted.</CardDescription>
           <div className="relative pt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by title..." 
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
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Posted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInternships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">{internship.title}</TableCell>
                  <TableCell><ApplicantCell /></TableCell>
                  <TableCell>
                    <Badge variant={internship.status === 'Active' ? 'default' : internship.status === 'Closed' ? 'secondary' : 'destructive'}>
                      {internship.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{internship.created}</TableCell>
                  <TableCell className="text-right">
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
                            <Link href={`/host/students?internshipId=${internship.id}`}><Eye className="mr-2 h-4 w-4" /> View Applicants</Link>
                        </DropdownMenuItem>
                        {internship.status !== 'Blocked' ? (
                          <DropdownMenuItem onClick={() => handleToggleStatus(internship.id)}>
                            {internship.status === 'Active' ? <ToggleLeft className="mr-2 h-4 w-4" /> : <ToggleRight className="mr-2 h-4 w-4" />}
                             Mark as {internship.status === 'Active' ? 'Closed' : 'Active'}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem asChild>
                            <Link href="/host/contact"><Headset className="mr-2 h-4 w-4" /> Contact Admin</Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onSelect={(e) => {
                                e.preventDefault();
                                setSelectedInternship(internship);
                                setIsDeleteDialogOpen(true);
                            }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
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
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                internship posting for <span className="font-semibold">&quot;{selectedInternship?.title}&quot;</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedInternship(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
