import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ConversationList from './components/conversation-list'

export default function Sidebar() {
  const [conversations, setConversations] = useState({})

  useEffect(() => {
    async function getConversation() {
      const response = await fetch('http://localhost:4000/v1/conversations')
      const data = await response.json()
      setConversations(data)
    }
    getConversation()
  }, [])

  async function handleClick() {
    const response = await fetch("http://localhost:4000/v1/create-conversation",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ title: "New Conversation" })
      })

    const newConversation = await response.json()

    setConversations(prevState => ({
      ...prevState,
      conversations: [
        ...(prevState.conversations || []),
        newConversation.conversation
      ]
    }))
  }

  return (
    <div className="bg-stone-900 w-[15%] h-screen overflow-hidden flex justify-center">
      <div className="w-[90%]">
        <button
          className="border w-full py-2 px-2 rounded-md flex gap-2 mt-4 hover:border-slate-300 hover:text-slate-300"
          onClick={handleClick}
        >
          <Plus /> New Chat
        </button>
        {conversations?.conversations ? (
          <ConversationList conversation={conversations} />
        ) : (
          <p className="mt-5 text-sm text-center text-stone-400">
            History is unavailable. No recent chats to display. Start a new conversation to see it listed here.
          </p>
        )}
      </div>
    </div>
  )
}
