import { Send } from 'lucide-react'
import React from 'react'

export default function Conversation() {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <div className='h-screen w-full flex justify-center bg-stone-950'>
            <div className='w-[60%]'>
                <h1 className='flex gap-2 text-3xl h-[90%]'>ChatBot</h1>
                <form onSubmit={handleSubmit} className='flex justify-center items-center w-full bg-stone-800 gap-4 focus-within:ring-1 border-0 rounded-full text-sm focus-within:ring-stone-600'>
                    <input className="w-[90%] h-9 bg-stone-800 focus:outline-none" type="text" />
                    <button type="submit"><Send size={20} /></button>
                </form>
            </div>
        </div>
    )
}
