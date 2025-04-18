import { isToday, subDays } from "date-fns"
import { useEffect } from "react"
import { useConversation } from "../../../context/ConversationContext"
import CategoryList from "./CategoryList"

export default function ConversationList({ }) {
    const categorizedConversations = {
        today: [],
        last7Days: [],
        last30Days: [],
        before30Days: [],
    }

    const { conversations: conversation, getConversations } = useConversation()

    const today = new Date()
    const last7Days = subDays(today, 7)
    const last30Days = subDays(today, 30)

    useEffect(() => {
        getConversations()
    }, [])

    const allConversations = conversation?.conversations || {}

    Object.values(allConversations).forEach((conversation) => {
        const createdTime = new Date(conversation.createdTime)

        if (isToday(createdTime)) {
            categorizedConversations.today.push(conversation)
        } else if (createdTime > last7Days) {
            categorizedConversations.last7Days.push(conversation)
        } else if (createdTime > last30Days) {
            categorizedConversations.last30Days.push(conversation)
        } else {
            categorizedConversations.before30Days.push(conversation)
        }
    })

    Object.keys(categorizedConversations).forEach((category) => {
        categorizedConversations[category].sort((a, b) => {
            return new Date(b.createdTime) - new Date(a.createdTime)
        })
    })

    return (
        <div className="overflow-y-scroll h-[calc(100vh-100px)] no-scrollbar mt-8">
            <div className="max-w-m">
                <CategoryList
                    title="Today"
                    conversations={categorizedConversations.today}
                />
                <CategoryList
                    title="Last 7 Days"
                    conversations={categorizedConversations.last7Days}
                />
                <CategoryList
                    title="Last 30 Days"
                    conversations={categorizedConversations.last30Days}
                />
                <CategoryList
                    title="Before 30 Days"
                    conversations={categorizedConversations.before30Days}
                />
            </div>
        </div>
    )
}
