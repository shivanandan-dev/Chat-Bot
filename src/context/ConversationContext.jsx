import { createContext, useContext, useEffect } from "react";
import useDeleteConversation from "../hooks/useDeleteConversation";
import useGetConversations from "../hooks/useGetConversations";
import useUpdateConversation from "../hooks/useUpdateConversation";

const ConversationContext = createContext()

export function ConversationsProvider({ children }) {
    const { updateConversation, isUpdating, error: updateError } = useUpdateConversation()
    const { deleteConversation, isDeleting, error: deleteError } = useDeleteConversation()
    const { conversations, getConversations } = useGetConversations()

    const loading = isDeleting || isUpdating
    const error = deleteError || updateError

    const updateConversationMutation = (id, title) => {
        updateConversation(id, title).then(() => {
            return getConversations();
        })
    }

    const deleteConversationMutation = (id, title) => {
        deleteConversation(id, title).then(() => {
            return getConversations()
        })
    }

    useEffect(() => {
        getConversations()
    }, [])

    const contextValue = {
        conversations,
        updateConversation: updateConversationMutation,
        deleteConversation: deleteConversationMutation,
        getConversations,
        loading,
        error
    }

    return (
        <ConversationContext.Provider value={contextValue}>
            {children}
        </ConversationContext.Provider>
    )
}

export function useConversation() {
    const context = useContext(ConversationContext)
    return context
}