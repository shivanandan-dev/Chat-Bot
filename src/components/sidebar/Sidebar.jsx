'use client';

import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useConversation } from '../../context/ConversationContext';
import SkeletonGroup from '../ui/SkeletonGroup';
import ConversationList from './components/ConversationList';
import SidebarError from './components/SidebarError';

export default function Sidebar() {
  const { conversations, loading, error, getConversations } = useConversation();
  const skeletonCounts = [5, 5, 5, 5];

  const handleRetry = () => {
    getConversations();
  };

  return (
    <div className="bg-stone-900 w-[300px] h-screen overflow-hidden flex justify-center">
      <div className="w-[90%]">
        <Link to="/">
          <button className="border w-full py-2 px-2 rounded-md flex gap-2 mt-4 hover:border-slate-300 hover:text-slate-300">
            <Plus /> New Chat
          </button>
        </Link>
        {error ? (
          <SidebarError error={error} onRetry={handleRetry} />
        ) : loading ? (
          <SkeletonGroup groupCounts={skeletonCounts} />
        ) : conversations?.conversations ? (
          <ConversationList />
        ) : (
          <p className="mt-5 text-sm text-center text-stone-400">
            History is unavailable. No recent chats to display. Start a new conversation to see it
            listed here.
          </p>
        )}
      </div>
    </div>
  );
}
