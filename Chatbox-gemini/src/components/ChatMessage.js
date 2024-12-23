import React from 'react';

export default function ChatMessage({ message, role, isError }) {
  const bgColor = role === 'user' ? 'bg-blue-100' : 'bg-gray-100';
  const textColor = isError ? 'text-red-500' : 'text-gray-800';

  return (
    <div className={`${bgColor} p-3 rounded-lg mb-2 ${role === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}>
      <p className={`${textColor} break-words`}>{message}</p>
    </div>
  );
}