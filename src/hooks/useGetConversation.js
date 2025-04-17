import { useEffect, useState } from "react";

export default function useGetConversation(conversationId) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:4000/v1/messages/${conversationId}`);
                const data = await response.json();
                setData(data.messages || []);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [conversationId]);

    return { data, error, loading, setMessages: setData };
}