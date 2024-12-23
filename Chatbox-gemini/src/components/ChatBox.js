import { useState, useRef, useEffect } from "react";
import { DOMPurify } from 'dompurify';
import ChatMessage from "./ChatMessage";
import LoadingSpinner from "./LoadingSpinner";
import { fetchGeminiResponse } from "../utils/api";
import { config } from "../utils/config";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(config.SAFETY_FILTERS);
  const [model, setModel] = useState(config.DEFAULT_MODEL);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim());
  };

  const addMessage = (newMessage) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages.length > config.MAX_MESSAGES 
        ? updatedMessages.slice(-config.MAX_MESSAGES) 
        : updatedMessages;
    });
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput || isLoading) return;

    const userMessage = { role: "user", message: sanitizedInput };
    addMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetchGeminiResponse(sanitizedInput, model, filters);
      addMessage({ role: "assistant", message: response });
    } catch (error) {
      addMessage({ 
        role: "assistant", 
        message: error.message || "An error occurred while processing your request.", 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h1 className="text-xl font-bold">Gemini Chat</h1>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="p-4 h-[60vh] overflow-y-auto"
          role="log"
          aria-live="polite"
        >
          {messages.map((msg, idx) => (
            <ChatMessage 
              key={idx}
              message={msg.message}
              role={msg.role}
              isError={msg.isError}
            />
          ))}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        <div className="border-t p-4">
          <div className="mb-4 flex gap-4">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="p-2 border rounded-md flex-1"
              aria-label="Select AI model"
            >
              <option value="gemini-pro">Gemini Pro</option>
              <option value="gemini-pro-vision">Gemini Pro Vision</option>
            </select>
            <div className="flex items-center gap-2">
              <label htmlFor="safety-filters">Safety Filters:</label>
              <input
                id="safety-filters"
                type="checkbox"
                checked={filters}
                onChange={() => setFilters(!filters)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Type your message..."
              aria-label="Chat input"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`px-4 py-2 rounded-md text-white transition-colors ${
                isLoading || !input.trim() 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              aria-label="Send message"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}