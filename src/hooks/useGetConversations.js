import { useState } from "react"

export default function useGetConversations() {
    const [conversations, setConversations] = useState({})
    const [isGettingConversation, setGettingConversation] = useState(false)
    const [error, setError] = useState(null)

    async function getConversations() {
        setGettingConversation(true)
        setError(false)
        try {
          const response = await fetch("http://localhost:4000/v1/conversations1")
          const data = await response.json()
          setConversations(data)
        } catch (error) {
          setError("Error: Failed to fetch conversation data.")
        } finally {
            setGettingConversation(false)
        }
    }

    return { getConversations, conversations, isGettingConversation, error}


}