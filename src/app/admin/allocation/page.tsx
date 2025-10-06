
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlayCircle, PauseCircle, RefreshCw, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from '@/components/ui/scroll-area';

type LogEntry = {
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'success';
    message: string;
};

const initialLogs: LogEntry[] = [
    { timestamp: '10:30:00 AM', level: 'info', message: 'Allocation process initiated by admin@careermatch.com.' },
    { timestamp: '10:30:01 AM', level: 'info', message: 'Fetching 1,250 student profiles...' },
    { timestamp: '10:30:03 AM', level: 'info', message: 'Fetching 350 active internship listings...' },
];

export default function AllocationPage() {
    const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'completed' | 'failed'>('idle');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (status === 'running' && progress < 100) {
            timer = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev + 5;
                    if (newProgress >= 100) {
                        setStatus('completed');
                        setLogs(prevLogs => [...prevLogs, { timestamp: new Date().toLocaleTimeString(), level: 'success', message: 'Allocation process completed successfully. 85% of students placed.' }]);
                        return 100;
                    }

                    if (newProgress % 20 === 0) {
                        setLogs(prevLogs => [...prevLogs, { timestamp: new Date().toLocaleTimeString(), level: 'info', message: `Processed batch ${newProgress / 20} of 5. Matching students to internships...` }]);
                    }

                    return newProgress;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status, progress]);

    const handleStart = () => {
        setProgress(0);
        setLogs(initialLogs);
        setStatus('running');
    };

    const handlePause = () => {
        setStatus('paused');
    };
    
    const handleResume = () => {
        setStatus('running');
    };

    const handleReset = () => {
        setStatus('idle');
        setProgress(0);
        setLogs(initialLogs.slice(0, 1));
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'idle': return 'Ready to start allocation.';
            case 'running': return 'Allocation in progress...';
            case 'paused': return 'Allocation paused.';
            case 'completed': return 'Allocation completed successfully.';
            case 'failed': return 'Allocation failed.';
        }
    };
    
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Allocation Engine</h1>
        <p className="text-muted-foreground">
          Run and monitor the intelligent internship allocation process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Live Process Monitor</CardTitle>
                    <CardDescription>Real-time logs of the allocation engine.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] w-full bg-secondary rounded-md p-4 font-mono text-sm">
                        {logs.map((log, index) => (
                            <div key={index} className="flex gap-4">
                                <span className="text-muted-foreground">{log.timestamp}</span>
                                <span className={
                                    log.level === 'success' ? 'text-green-500' : 
                                    log.level === 'error' ? 'text-red-500' :
                                    log.level === 'warn' ? 'text-yellow-500' : ''
                                }>{log.message}</span>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Engine Control</CardTitle>
                    <CardDescription>Manage the allocation process.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 text-center">
                        <p className="text-lg font-semibold">{getStatusMessage()}</p>
                         <div className="flex items-center gap-2">
                             {status === 'running' && <Loader2 className="h-5 w-5 animate-spin" />}
                             {status === 'paused' && <PauseCircle className="h-5 w-5 text-yellow-500" />}
                             {status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                             {status === 'failed' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                             <Progress value={progress} className="w-full" />
                         </div>
                        <p className="text-sm text-muted-foreground">{progress}% complete</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {status === 'idle' && <Button onClick={handleStart} className="col-span-2" size="lg"><PlayCircle className="mr-2"/> Start Allocation</Button>}
                        {status === 'running' && <Button onClick={handlePause} className="col-span-2" size="lg" variant="outline"><PauseCircle className="mr-2"/> Pause</Button>}
                        {status === 'paused' && <Button onClick={handleResume} className="col-span-2" size="lg"><PlayCircle className="mr-2"/> Resume</Button>}
                        {(status === 'completed' || status === 'failed' || status === 'paused') && (
                           <Button onClick={handleReset} variant="destructive" className="col-span-2" size="lg"><RefreshCw className="mr-2"/> Reset Process</Button>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        Warning: Running the allocation process will affect all unmatched students and open internship slots. This action is irreversible.
                    </p>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}
