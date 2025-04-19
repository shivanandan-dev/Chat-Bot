import { Sun, TriangleAlert, Zap } from 'lucide-react';
import React from 'react';

export default function PromptExamples({ symbol, exampleCategory, examples }) {
  const symbols = {
    Sun: <Sun />,
    Zap: <Zap />,
    TriangleAlert: <TriangleAlert />
  };

  return (
    <div className="flex flex-col items-center">
      {symbols[symbol]}
      <h1 className="mt-2">{exampleCategory}</h1>
      <div className="grid grid-cols-1 grid-rows-3 gap-4 w-[80%] mt-7">
        {examples.map((data) => (
          <div className="text-center py-2 px-3 text-sm bg-stone-800 border-0 rounded-lg">
            {data}
          </div>
        ))}
      </div>
    </div>
  );
}
