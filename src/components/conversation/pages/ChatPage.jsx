import { Bot, CircleUser, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import useGetConversation from '../../../hooks/useGetMessages';
import useSendMessage from '../../../hooks/useSendMessage';
import SkeletonGroup from '../../ui/SkeletonGroup';

export default function ChatPage() {
  const params = useParams();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const skeletonCounts = [5, 5, 5, 5];

  const {
    data: messages,
    loading,
    error,
    setMessages,
    refetch
  } = useGetConversation(params.conversationId);
  const { handleSubmit } = useSendMessage(params.conversationId, setMessages, setNewMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-[60%] flex flex-col h-[90%] self-center">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border-0 rounded-lg no-scrollbar">
        {error ? (
          <div className="text-center">
            <p className="text-rose-500 mb-2">
              Oops! Looks like the messages got lost in the void.
            </p>
            <p className="text-gray-400 mb-4">Don’t worry, you can bring them back!</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Retry Fetching Messages
            </button>
          </div>
        ) : loading ? (
          <SkeletonGroup groupCounts={skeletonCounts} />
        ) : messages?.length === 0 ? (
          <p className="text-gray-500 text-center">No messages to display</p>
        ) : (
          messages?.map((message) => (
            <div
              key={message.id}
              className="flex flex-col hover:bg-stone-700 border-0 rounded-md p-4">
              <div
                className={`flex gap-2 text-sm items-center ${message.type === 'user' ? 'text-rose-500' : 'text-blue-400'}`}>
                {message.type === 'user' ? <CircleUser /> : <Bot />}
                {message.type === 'user' ? 'User' : 'Assistant'}
              </div>
              <div className="max-w-[90%] rounded-lg p-3 pl-8">
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {!error && (
        <form
          onSubmit={(e) => handleSubmit(e, newMessage)}
          className="flex justify-center items-center w-full bg-stone-800 gap-4 focus-within:ring-1 border-0 rounded-full text-sm focus-within:ring-stone-600">
          <input
            className="w-[90%] h-9 bg-stone-800 focus:outline-none"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            disabled={!newMessage.trim()}
            className={`${!newMessage.trim() ? 'text-stone-700' : 'text-stone-200'}`}
            type="submit">
            <Send size={20} />
          </button>
        </form>
      )}
    </div>
  );
}
