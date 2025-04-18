"use client"

import { MessageSquareText, Pencil, Send, Trash2, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import useDeleteConversation from "../../../hooks/useDeleteConversation"
import useUpdateConversation from "../../../hooks/useUpdateConversation"

const CategoryList = ({ title, conversations, refreshConversations }) => {
    const [editMode, setEditMode] = useState(null)
    const [editedTitle, setEditedTitle] = useState("")
    const { updateConversation, isUpdating, error: updateError } = useUpdateConversation()
    const { deleteConversation, isDeleting, error: deleteError } = useDeleteConversation()
    const navigate = useNavigate()

    if (!conversations.length) return null

    const handleEditClick = (e, conversation) => {
        e.stopPropagation()
        setEditMode(conversation.id)
        setEditedTitle(conversation.title)
    }

    const handleCancelEdit = (e) => {
        e.stopPropagation()
        setEditMode(null)
        setEditedTitle("")
    }

    const handleSaveEdit = async (e, id) => {
        e.stopPropagation()
        try {
            await updateConversation(id, editedTitle)
            refreshConversations()
        } catch (err) {
            console.error(err.message)
        }
        setEditMode(null)
        setEditedTitle("")
    }

    const handleDeleteClick = async (e, id) => {
        e.stopPropagation()
        try {
            await deleteConversation(id)
            refreshConversations()
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleNavigate = (id) => {
        if (!editMode) {
            navigate(id)
        }
    }

    return (
        <div className="mb-7">
            <p className="text-sm mb-4 text-stone-400">{title}</p>
            {conversations.map((value) => {
                const isEditing = editMode === value.id
                const trimmedTitle = value.title.substring(0, 17)

                return (
                    <button
                        key={value.id}
                        className="my-2 pl-2 gap-3 flex p-1 hover:bg-stone-800 w-full text-start rounded text-sm text-stone-300 justify-between"
                        onClick={() => handleNavigate(value.id)}
                    >
                        <div className="flex items-center gap-3">
                            <MessageSquareText size={15} />
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="bg-stone-700 text-stone-300 rounded p-1 text-sm w-full"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <>
                                    {trimmedTitle}
                                    {trimmedTitle === value.title ? "" : "..."}
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {isEditing ? (
                                <>
                                    <Send
                                        size={15}
                                        className="cursor-pointer hover:text-blue-500"
                                        onClick={(e) => handleSaveEdit(e, value.id)}
                                    />
                                    <X size={15} className="cursor-pointer hover:text-red-500" onClick={handleCancelEdit} />
                                </>
                            ) : (
                                <>
                                    <Pencil
                                        size={15}
                                        className="cursor-pointer hover:text-blue-500"
                                        onClick={(e) => handleEditClick(e, value)}
                                    />
                                    <Trash2
                                        size={15}
                                        className="cursor-pointer text-rose-500 hover:text-rose-700"
                                        onClick={(e) => handleDeleteClick(e, value.id)}
                                    />
                                </>
                            )}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryList
