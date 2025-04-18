"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import ConversationList from "./components/ConversationList"

export default function Sidebar() {
  const [conversations, setConversations] = useState({})
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refreshConversations = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  useEffect(() => {
    async function getConversation() {
      try {
        const response = await fetch("http://localhost:4000/v1/conversations")
        const data = await response.json()
        setConversations(data)
      } catch (error) {
        console.error("Failed to fetch conversations:", error)
      }
    }
    getConversation()
  }, [refreshTrigger])

  return (
    <div className="bg-stone-900 w-[15%] h-screen overflow-hidden flex justify-center">
      <div className="w-[90%]">
        <Link to="/">
          <button className="border w-full py-2 px-2 rounded-md flex gap-2 mt-4 hover:border-slate-300 hover:text-slate-300">
            <Plus /> New Chat
          </button>
        </Link>
        {conversations?.conversations ? (
          <ConversationList conversation={conversations} refreshConversations={refreshConversations} />
        ) : (
          <p className="mt-5 text-sm text-center text-stone-400">
            History is unavailable. No recent chats to display. Start a new conversation to see it listed here.
          </p>
        )}
      </div>
    </div>
  )
}
