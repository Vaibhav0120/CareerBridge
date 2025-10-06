
'use client';

import { useState, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { internships } from "@/lib/demo-data";
import { Building, MapPin, PlusCircle, Search, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

export default function InternshipsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('all');

    const filteredInternships = useMemo(() => {
        return internships.filter(internship => {
            const isActive = internship.status === 'Active';
            const matchesLocation = selectedLocation === 'all' || internship.location.toLowerCase().replace(/, /g, '-').replace(/ /g, '-') === selectedLocation;
            const lowerCaseQuery = searchQuery.toLowerCase();
            const matchesSearch = 
                internship.title.toLowerCase().includes(lowerCaseQuery) ||
                internship.organization.toLowerCase().includes(lowerCaseQuery) ||
                internship.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));

            return isActive && matchesLocation && matchesSearch;
        });
    }, [searchQuery, selectedLocation]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Your Internship</h1>
        <p className="text-muted-foreground">Browse and apply for opportunities that match your skills.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by title, organization, or skill..." 
            className="pl-10" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <Select onValueChange={setSelectedLocation} defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="new-york-ny">New York, NY</SelectItem>
                    <SelectItem value="san-francisco-ca">San Francisco, CA</SelectItem>
                    <SelectItem value="austin-tx">Austin, TX</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Image
                  src={internship.logoUrl}
                  alt={`${internship.organization} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg border"
                />
                <div className="flex-1">
                  <CardTitle className="text-xl">{internship.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-1">
                    <Building className="h-4 w-4" /> {internship.organization}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {internship.description}
              </p>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4"/>
                    <span>{internship.location}</span>
                </div>
              <div className="flex flex-wrap gap-2">
                {internship.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="w-full" asChild>
                <Link href={`/home/internships/${internship.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="icon" aria-label="Save internship">
                <Bookmark className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
