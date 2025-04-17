import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PromptExamples from '../components/PromptExamples';

export default function DefaultPage() {
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();
    const promptExamples = {
        0: {
            id: "Examples",
            symbol: "Sun",
            promptQuestions: [
                "Explain quantum computing in simple terms.",
                "Got any creative ideas for a 10-year-old's birthday?",
                "How do I make an HTTP request in JavaScript?"
            ]
        },
        1: {
            id: "Capabilities",
            symbol: "Zap",
            promptQuestions: [
                "Remembers what the user said earlier in the conversation.",
                "Allows the user to provide follow-up corrections.",
                "Trained to decline inappropriate requests."
            ]
        },
        2: {
            id: "Limitations",
            symbol: "TriangleAlert",
            promptQuestions: [
                "May occasionally generate incorrect information.",
                "May occasionally produce harmful or biased content.",
                "Limited knowledge of the world after April 2023."
            ]
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (!newMessage) return;

        try {
            const conversationResponse = await fetch("http://localhost:4000/v1/create-conversation", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ title: "New Conversation" })
            });

            const conversationData = await conversationResponse.json();

            if (!conversationData.success) {
                console.error("Failed to create conversation");
                return;
            }

            const conversationId = conversationData.conversation.id;

            const messageResponse = await fetch("http://localhost:4000/v1/create-message", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    userQuery: newMessage,
                    conversationId
                })
            });

            if (!messageResponse.ok) {
                console.error("Failed to create message");
                return;
            }

            navigate(conversationId);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <div>
            <div className="flex justify-evenly w-full bg-stone-950 h-[90%] items-center">
                {Object.values(promptExamples).map(data => <PromptExamples key={data.id} symbol={data.symbol} exampleCategory={data.id} examples={data.promptQuestions} />)}
            </div>
            <form onSubmit={handleSubmit} className='flex justify-center items-center w-full bg-stone-800 gap-4 focus-within:ring-1 border-0 rounded-full text-sm focus-within:ring-stone-600'>
                <input
                    className="w-[90%] h-9 bg-stone-800 focus:outline-none"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button disabled={!newMessage.trim()} className={`${!newMessage.trim() ? 'text-stone-700' : 'text-stone-200'}`} type="submit"><Send size={20} /></button>
            </form>
        </div>
    );
}