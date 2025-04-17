import React from 'react'
import Conversation from '../components/conversation/Conversation'
import Sidebar from '../components/sidebar/Sidebar'

export default function RootLayout() {
    return (
        <div className='flex'>
            <Sidebar />
            <Conversation />
        </div>
    )
}
