import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import DefaultPage from './components/conversation/components/default-page'
import RootLayout from './pages/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: "/", element: <DefaultPage /> },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
