
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, File, CheckCircle, AlertCircle, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const uploadHistory = [
    { id: 'upload-01', filename: 'student_data_q1_2024.csv', status: 'Completed', date: '2024-03-15', user: 'admin@careermatch.com', records: 1250 },
    { id: 'upload-02', filename: 'internship_postings_q1_2024.xlsx', status: 'Completed', date: '2024-03-14', user: 'admin@careermatch.com', records: 85 },
    { id: 'upload-03', filename: 'aspirational_districts_update.csv', status: 'Failed', date: '2024-03-12', user: 'admin@careermatch.com', error: 'Invalid column header: "DIST_ID"' },
    { id: 'upload-04', filename: 'student_data_q4_2023.csv', status: 'Completed', date: '2023-12-15', user: 'admin@careermatch.com', records: 1100 },
];

export default function DataUploadPage() {
    const [files, setFiles] = useState<File[]>([]);
    
    const onDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
        }
    });

    const handleDownload = (filename: string, content: string) => {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadStudentTemplate = () => {
        const headers = 'id,name,email,university,college,degree,branch,year,cgpa,credits,skills';
        const exampleRow = 'user-student-01,Alex Doe,alex.doe@example.com,State University,College of Engineering,B.Tech,Computer Science,3,8.7,125,"React,Node.js,Python"';
        const csvContent = `${headers}\n${exampleRow}`;
        handleDownload('student_template.csv', csvContent);
    };

    const downloadInternshipTemplate = () => {
        const headers = 'id,title,organization,location,duration,description,tags';
        const exampleRow = 'int-001,Software Engineer Intern,InnovateTech,Remote,12 Weeks,"Work on cutting-edge AI projects","AI,Python,React"';
        const csvContent = `${headers}\n${exampleRow}`;
        handleDownload('internship_template.csv', csvContent);
    };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Upload</h1>
        <p className="text-muted-foreground">
          Bulk upload student, internship, or other administrative data.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <Card {...getRootProps()} className={`h-full border-2 border-dashed transition-colors ${isDragActive ? 'border-primary bg-primary/10' : ''}`}>
                <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center cursor-pointer">
                    <input {...getInputProps()} />
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                    {isDragActive ? (
                        <p className="font-semibold text-primary">Drop the files here...</p>
                    ) : (
                        <div>
                            <p className="font-semibold">Drag & drop files here, or click to select files</p>
                            <p className="text-sm text-muted-foreground mt-1">Supported formats: CSV, XLSX. Max file size: 10MB.</p>
                        </div>
                    )}
                </CardContent>
           </Card>
           {files.length > 0 && (
                <Card className="mt-8">
                    <CardHeader><CardTitle>Selected Files</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       {files.map(file => (
                           <div key={file.name} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                                <div className="flex items-center gap-3">
                                    <File className="h-5 w-5"/>
                                    <span className="font-medium">{file.name}</span>
                                    <span className="text-sm text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span>
                                </div>
                                <Button size="sm" variant="ghost" onClick={() => setFiles(files.filter(f => f.name !== file.name))}>Remove</Button>
                           </div>
                       ))}
                    </CardContent>
                    <CardFooter>
                       <Button size="lg" disabled={files.length === 0}>
                            <UploadCloud className="mr-2"/> Process {files.length} File(s)
                       </Button>
                    </CardFooter>
                </Card>
           )}
        </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Templates</CardTitle>
                    <CardDescription>Download templates to ensure your data is formatted correctly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                   <Button variant="outline" className="w-full justify-start" onClick={downloadStudentTemplate}>
                       <FileText className="mr-2"/> Student Data Template (.csv)
                   </Button>
                   <Button variant="outline" className="w-full justify-start" onClick={downloadInternshipTemplate}>
                       <FileText className="mr-2"/> Internship Data Template (.csv)
                   </Button>
                </CardContent>
            </Card>
        </div>
      </div>

       <Card className="mt-8">
            <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>A log of past data uploads.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Filename</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Records</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {uploadHistory.map(upload => (
                             <TableRow key={upload.id}>
                                <TableCell className="font-medium">{upload.filename}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {upload.status === 'Completed' ? 
                                            <CheckCircle className="h-4 w-4 text-green-500" /> : 
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                        }
                                        <span>{upload.status}</span>
                                    </div>
                                    {upload.status === 'Failed' && <p className="text-xs text-red-500 mt-1">{upload.error}</p>}
                                </TableCell>
                                <TableCell>{upload.date}</TableCell>
                                <TableCell>{upload.user}</TableCell>
                                <TableCell className="text-right">{upload.records || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
