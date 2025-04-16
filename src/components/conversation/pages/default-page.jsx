import React from 'react';
import PromptExamples from '../components/prompt-example';

export default function DefaultPage() {
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

    return (
        <div className="flex justify-evenly w-full bg-stone-950 h-[90%] items-center">
            {Object.values(promptExamples).map(data => <PromptExamples key={data.id} symbol={data.symbol} exampleCategory={data.id} examples={data.promptQuestions} />)}
        </div>
    )
}
