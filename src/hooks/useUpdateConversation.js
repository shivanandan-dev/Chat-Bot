import { useState } from 'react';

export default function useUpdateConversation() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  async function updateConversation(id, title) {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/v1/update-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, title })
      });

      if (!response.ok) {
        throw new Error('Failed to update conversation');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to update conversation');
      }

      return data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }

  return { updateConversation, isUpdating, error };
}
