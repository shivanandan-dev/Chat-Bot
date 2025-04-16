import { Bot, CircleUser } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

export default function ChatPage() {
    const params = useParams();
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        async function getConversation() {
            try {
                const response = await fetch(`http://localhost:4000/v1/messages/${params.conversationId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                console.log(data);
                setMessages(data.messages || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
        getConversation();
    }, [params.conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border-0 rounded-lg no-scrollbar">
            {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages to display</p>
            ) : (
                messages.map((message) => (
                    <div key={message.id} className="flex flex-col hover:bg-stone-700 border-0 rounded-md p-4">
                        <div className={`flex gap-2 text-sm items-center ${message.type === "user" ? 'text-rose-500' : 'text-blue-400'}`}>
                            {message.type === 'user' ? <CircleUser /> : <Bot />}
                            {message.type === 'user' ? "User" : "Quantum Chat"}
                        </div>
                        <div
                            className="max-w-[90%] rounded-lg p-3 pl-8"
                        >
                            <p className='text-sm'>{message.message}</p>
                        </div>
                    </div>
                ))
            )}

            <div ref={messagesEndRef} />
        </div>
    );
}