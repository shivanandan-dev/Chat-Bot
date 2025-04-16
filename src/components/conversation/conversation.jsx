import { Send } from 'lucide-react';
import React from 'react';
import PromptExamples from './components/promt-example';

export default function Conversation() {
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


    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <div className='h-screen w-full flex justify-center bg-stone-950'>
            <div className='w-[60%] flex flex-col justify-between h-[90%] self-center'>
                <div className="flex justify-evenly w-full bg-stone-950 h-[90%] items-center">
                    {Object.values(promptExamples).map(data => <PromptExamples key={data.id} symbol={data.symbol} exampleCategory={data.id} examples={data.promptQuestions} />)}
                </div>
                <form onSubmit={handleSubmit} className='flex justify-center items-center w-full bg-stone-800 gap-4 focus-within:ring-1 border-0 rounded-full text-sm focus-within:ring-stone-600'>
                    <input className="w-[90%] h-9 bg-stone-800 focus:outline-none" type="text" />
                    <button type="submit"><Send size={20} /></button>
                </form>
            </div>
        </div>
    )
}
