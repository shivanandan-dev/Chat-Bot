import { useState } from "react"

export default function useGetConversations() {
    const [conversations, setConversations] = useState({})
    const [isGettingConversation, setGettingConversation] = useState(false)
    const [error, setError] = useState(null)

    async function getConversations() {
        setGettingConversation(true)
        try {
          const response = await fetch("http://localhost:4000/v1/conversations")
          const data = await response.json()
          setConversations(data)
        } catch (error) {
          setError("Failed to fetch error")
        } finally {
            setGettingConversation(false)
        }
    }

    return { getConversations, conversations, isGettingConversation, error}


}