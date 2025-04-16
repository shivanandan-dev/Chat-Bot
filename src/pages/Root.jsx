import React from 'react'
import Conversation from '../components/conversation/conversation'
import Sidebar from '../components/sidebar/sidebar'

export default function RootLayout() {
    return (
        <div className='flex'>
            <Sidebar />
            <Conversation />
        </div>
    )
}
