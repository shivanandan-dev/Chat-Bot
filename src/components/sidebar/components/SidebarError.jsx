import { TriangleAlert } from 'lucide-react';
import React from 'react';

export default function SidebarError({ error, onRetry }) {
  return (
    <div className="flex-cols h-[90%] justify-items-center content-center text-center text-sm text-rose-500">
      <TriangleAlert size={50} />
      <div className="mt-3">{error} Click on the below button to re-render.</div>
      <button
        onClick={onRetry}
        className="py-2 px-5 m-6 border border-stone-400 rounded-lg text-stone-400 hover:border-stone-500 hover:text-stone-500">
        Try Again!
      </button>
    </div>
  );
}
