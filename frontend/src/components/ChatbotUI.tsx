'use client'; 

import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';

// --- 1. TypeScript Interfaces ---
type Sender = 'user' | 'ai';

interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: string;
  isStreaming?: boolean;
}

// --- 3. Main Chatbot Component ---

const ChatbotUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false); // Use loading instead of isAiTyping
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for a better UX
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function for sending a message
  const handleSendMessage = async (e?: FormEvent | KeyboardEvent) => {
    e?.preventDefault(); // Prevent default form submission or keydown behavior

    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    const newMessage: Message = {
      id: Date.now().toString(), // Simple ID for UI example
      text: trimmedText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setLoading(true); // Start loading
    setError(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong with the API call.");
      }

      const data = await res.json();
      const aiResponse: Message = {
        id: Date.now().toString() + 'ai',
        text: data.output,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      // Optionally add an error message to the chat
      setMessages((prev) => [...prev, {
        id: Date.now().toString() + 'error',
        text: `Error: ${err.message}`,
        sender: 'ai', // Display error as if from AI
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      handleSendMessage(e);
    }
  };

  return (
    // Outer Container: Full Screen/Centered
    <div className="flex h-screen bg-gray-100 antialiased text-gray-800 p-4 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex flex-col h-full w-full max-w-xl mx-auto border shadow-2xl rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
        
        {/* Header (UI Element) */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-xl z-10 dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Next.js AI Chatbot</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{loading ? 'Typing...' : 'Online'}</span>
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-orange-400 animate-pulse' : 'bg-green-500'}`}></div>
          </div>
        </div>

        {/* Message Area (The Scrollable Part) */}
        <div className="flex-grow p-6 overflow-y-auto space-y-4">
          {messages.map((message) => {
            const isUser = message.sender === 'user';
            
            // Tailwind Classes for User Messages
            const userClasses = 'bg-blue-600 text-white rounded-tr-none ml-auto';
            
            // Tailwind Classes for AI Messages
            const aiClasses = 'bg-gray-200 text-gray-800 rounded-tl-none mr-auto dark:bg-gray-700 dark:text-gray-200';

            return (
              <div 
                key={message.id} 
                className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] p-3 rounded-xl shadow-md transition-all duration-300 ease-in-out ${
                    isUser ? userClasses : aiClasses
                  }`}
                >
                  <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
                  <div
                    className={`text-xs mt-1 ${
                      isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                    } text-right`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI Typing Indicator */}
          {loading && (
             <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 rounded-xl rounded-tl-none mr-auto p-3 shadow-md dark:bg-gray-700 dark:text-gray-200">
                    <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                    </div>
                </div>
             </div>
          )}
          
          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Sticky Footer) */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white sticky bottom-0 rounded-b-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={loading ? "Please wait for the response..." : "Type your message..."}
              disabled={loading}
              className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 disabled:bg-gray-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-150 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {/* Send Icon (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotUI;
