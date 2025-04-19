import React from 'react';
import { Outlet } from 'react-router';

export default function Conversation() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="h-screen w-full flex justify-center bg-stone-950">
      <Outlet />
    </div>
  );
}
