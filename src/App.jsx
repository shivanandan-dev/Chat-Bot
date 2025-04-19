import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import ChatPage from './components/conversation/pages/ChatPage';
import DefaultPage from './components/conversation/pages/DefaultPage';
import { ConversationsProvider } from './context/ConversationContext';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <DefaultPage /> },
      { path: '/:conversationId', element: <ChatPage /> }
    ]
  }
]);

export default function App() {
  return (
    <ConversationsProvider>
      <RouterProvider router={router} />
    </ConversationsProvider>
  );
}
