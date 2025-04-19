export default function useSendMessage(conversationId, setMessages, setNewMessage) {
  async function handleSubmit(event, newMessage) {
    event.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: new Date().toISOString(),
      type: 'user',
      message: newMessage,
      createdTime: new Date().toISOString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    try {
      const response = await fetch(`http://localhost:4000/v1/create-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userQuery: newMessage,
          conversationId
        })
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let assistantContent = '';
      const tempAssistantId = `assistant-${Date.now()}`;

      setMessages((prev) => [
        ...prev,
        {
          id: tempAssistantId,
          type: 'assistant',
          message: '',
          createdTime: new Date().toISOString()
        }
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop();

        for (let part of parts) {
          if (part.startsWith('data: ')) {
            const jsonString = part.replace(/^data: /, '');
            const parsed = JSON.parse(jsonString);

            if (parsed.state === 'response') {
              for (const char of parsed.content || '') {
                assistantContent += char;

                await new Promise((resolve) => setTimeout(resolve, 10));

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === tempAssistantId ? { ...msg, message: assistantContent } : msg
                  )
                );
              }
            } else if (parsed.state === 'complete') {
              return;
            }
          }
        }
      }
    } catch (err) {
      console.error('Streaming error:', err);
    }
  }

  return { handleSubmit };
}
