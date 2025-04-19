import { v4 as uuidv4 } from 'uuid';

import { assistantMessages, dummyChatListData, dummyMessagesData } from './assistantData.js';

import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

// Get conversations with pagination
app.get('/v1/conversations', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = 1000;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const conversations = dummyChatListData.conversations.slice(startIndex, endIndex);

  res.json({
    conversations,
    page,
    totalPages: dummyChatListData.totalPages
  });
});

// Create a new conversation
app.post('/v1/create-conversation', (req, res) => {
  const { title } = req.body;

  const newConversation = {
    id: uuidv4(),
    title: title ?? 'New chat',
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString()
  };
  dummyChatListData.conversations.unshift(newConversation); // Add the new conversation to the beginning of the list

  res.status(201).json({ success: true, conversation: newConversation });
});

// Update a conversation
app.post('/v1/update-conversation', (req, res) => {
  const { id, title } = req.body;

  const conversationIndex = dummyChatListData.conversations.findIndex(
    (conversation) => conversation.id === id
  );

  if (conversationIndex !== -1) {
    dummyChatListData.conversations[conversationIndex].title = title;
    dummyChatListData.conversations[conversationIndex].updatedTime = new Date().toISOString();
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Conversation not found' });
  }
});

// Delete a conversation
app.delete('/v1/conversations/:id', (req, res) => {
  const { id } = req.params;
  dummyChatListData.conversations = dummyChatListData.conversations.filter(
    (conversation) => conversation.id !== id
  );
  res.json({ success: true });
});

// Get messages for a specific conversation
app.get('/v1/messages/:conversationid', (req, res) => {
  const { conversationid } = req.params;

  res.json({ messages: dummyMessagesData[conversationid] ?? [] });
});

// Create a new message under a conversation
app.post('/v1/create-message', (req, res) => {
  const { userQuery, conversationId } = req.body;
  let assistantStreamBuffer = '';

  if (!dummyMessagesData[conversationId]) {
    dummyMessagesData[conversationId] = [];
  }

  const userMessage = {
    id: uuidv4(),
    type: 'user',
    message: userQuery,
    createdTime: new Date().toISOString()
  };
  dummyMessagesData[conversationId].push(userMessage);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  setTimeout(() => {
    assistantMessages.forEach((msg, index) => {
      setTimeout(() => {
        assistantStreamBuffer += msg.content;
        sendEvent({ ...msg, state: 'response' });

        if (index === assistantMessages.length - 1) {
          sendEvent({ content: '', type: 'TEXT', properties: null, state: 'complete' });
          setTimeout(() => {
            res.end();
          }, 500);

          const assistantMessage = {
            id: uuidv4(),
            type: 'assistant',
            message: assistantStreamBuffer,
            createdTime: new Date().toISOString()
          };
          dummyMessagesData[conversationId].push(assistantMessage);
        }
      }, 200);
    });
  }, 500);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
