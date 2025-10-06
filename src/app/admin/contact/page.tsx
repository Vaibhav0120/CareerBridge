
'use client';

import { useState, useMemo, Suspense, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allHosts, conversations as allConversations } from '@/lib/demo-data';
import { Send, Search, Headset, ChevronLeft, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRoleProvider } from '@/hooks/use-user-role';
import type { Conversation, Conversations } from '@/lib/types';


function AdminContactPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const initialHostName = searchParams.get('host');
    const initialHost = allHosts.find(h => h.name === initialHostName);
    
    const [selectedHost, setSelectedHost] = useState(initialHost || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState<Conversations>(allConversations);
    const [newMessage, setNewMessage] = useState('');

    const filteredHosts = useMemo(() => {
        return allHosts.filter(host => host.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);
    
    const currentConversation = useMemo(() => {
        if (selectedHost) {
            return conversations[selectedHost.id] || [];
        }
        return [];
    }, [selectedHost, conversations]);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [currentConversation]);


    const handleSendMessage = () => {
        if (newMessage.trim() === '' || !selectedHost) return;

        const message: Conversation = {
            from: 'admin',
            text: newMessage,
            timestamp: 'Just now',
        };

        setConversations(prev => ({
            ...prev,
            [selectedHost.id]: [...(prev[selectedHost.id] || []), message]
        }));
        setNewMessage('');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
            {/* Contact List */}
             <div className={cn("md:col-span-1", selectedHost && 'hidden md:block')}>
                <Card className="flex flex-col h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building/>
                            <span>Organizations</span>
                        </CardTitle>
                        <div className="relative pt-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search hosts..." 
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-hidden">
                        <ScrollArea className="h-full">
                            {filteredHosts.map(host => (
                            <button
                                key={host.id}
                                onClick={() => setSelectedHost(host)}
                                className={cn(
                                'flex items-center gap-3 p-3 text-left w-full hover:bg-secondary',
                                selectedHost?.id === host.id && 'bg-secondary'
                                )}
                            >
                                <Avatar className="h-10 w-10">
                                <AvatarImage src={host.logoUrl} alt={host.name} />
                                <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{host.name}</p>
                                </div>
                            </button>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
             </div>

            {/* Chat Window */}
            <div className={cn("md:col-span-3", !selectedHost && 'hidden md:block')}>
                <Card className="flex flex-col h-full">
                    { !selectedHost ? (
                         <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <Headset className="h-16 w-16 mb-4" />
                            <h2 className="text-xl font-semibold">Select a conversation</h2>
                            <p>Choose a host from the list to start messaging.</p>
                        </div>
                    ) : (
                        <>
                            <CardHeader className="border-b">
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedHost(null)}><ChevronLeft/></Button>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={selectedHost?.logoUrl} alt={selectedHost?.name} />
                                        <AvatarFallback>{selectedHost?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-lg">{selectedHost?.name}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-0 overflow-hidden">
                            <ScrollArea className="h-full" ref={scrollAreaRef}>
                            <div className="p-4 space-y-4">
                            {currentConversation.map((msg, index) => (
                                    <div key={index} className={cn("flex items-end gap-2", msg.from === 'admin' ? "justify-end" : "justify-start")}>
                                        {msg.from !== 'admin' && (
                                             <Avatar className="h-8 w-8">
                                                <AvatarImage src={selectedHost?.logoUrl}/>
                                                <AvatarFallback>{selectedHost?.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.from === 'admin' ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                                        </div>
                                        {msg.from === 'admin' && <Avatar className="h-8 w-8"><AvatarImage /><AvatarFallback>A</AvatarFallback></Avatar>}
                                    </div>
                            ))}
                            </div>
                            </ScrollArea>
                            </CardContent>
                            <div className="p-4 border-t">
                                <div className="relative">
                                    <Input 
                                        placeholder="Type your message..." 
                                        className="pr-16 h-12"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleSendMessage}>
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default function AdminContactPage() {
    return (
        <UserRoleProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="h-[calc(100vh-8rem)]">
                  <AdminContactPageContent />
                </div>
            </Suspense>
        </UserRoleProvider>
    )
}
