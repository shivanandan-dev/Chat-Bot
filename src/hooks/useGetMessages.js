import { useCallback, useEffect, useState } from 'react';

export default function useGetConversation(conversationId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConversation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:4000/v1/messages/${conversationId}`);
      const data = await response.json();
      setData(data.messages || []);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  return { data, error, loading, setMessages: setData, refetch: fetchConversation };
}
