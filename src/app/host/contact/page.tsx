
'use client';

import { useState, useMemo, Suspense, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { conversations as allConversations } from '@/lib/demo-data';
import { Send, Headset, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRoleProvider } from '@/hooks/use-user-role';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Conversation, Conversations } from '@/lib/types';

function HostContactPageContent() {
    const router = useRouter();

    const [conversations, setConversations] = useState<Conversations>(allConversations);
    const [newMessage, setNewMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);


    const currentConversation = useMemo(() => {
        // For a host user, we'll use a hardcoded ID for the demo conversation with admin.
        const hostId = 'host-06';
        return conversations[hostId] || [];
    }, [conversations]);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [currentConversation]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
    
        const targetHostId = 'host-06';

        const message: Conversation = {
            from: 'host',
            text: newMessage,
            timestamp: 'Just now',
        };

        setConversations(prev => ({
            ...prev,
            [targetHostId]: [...(prev[targetHostId] || []), message]
        }));
        setNewMessage('');
    };

    return (
        <Card className="flex flex-col h-full w-full">
            <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                        <AvatarFallback><Headset/></AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-lg">Admin Support</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-y-hidden">
                <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
                    <div className="p-4 space-y-4">
                        {currentConversation.map((msg, index) => (
                                <div key={index} className={cn("flex items-end gap-2", msg.from === 'host' ? "justify-end" : "justify-start")}>
                                    {msg.from !== 'host' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><Headset/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.from === 'host' ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                                    </div>
                                    {msg.from === 'host' && <Avatar className="h-8 w-8"><AvatarImage /><AvatarFallback>H</AvatarFallback></Avatar>}
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
        </Card>
    );
}


export default function HostContactPage() {
    return (
        <UserRoleProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="h-[calc(100vh-8rem)]">
                    <HostContactPageContent />
                </div>
            </Suspense>
        </UserRoleProvider>
    )
}
