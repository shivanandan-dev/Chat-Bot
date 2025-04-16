import React from 'react'
import { useParams } from 'react-router'

export default function ChatPage() {
    const params = useParams()

    return (
        <div>{params.conversationId}</div>
    )
}
