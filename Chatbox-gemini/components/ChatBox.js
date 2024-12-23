import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import { fetchGeminiResponse } from "../utils/api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState(true);
  const [model, setModel] = useState("gemini-pro");
  const [loading, setLoading] = useState(false); // New loading state

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", message: input }];
    setMessages(newMessages);
    setLoading(true); // Set loading to true

    try {
      const response = await fetchGeminiResponse(input, model, filters);
      setMessages([...newMessages, { role: "assistant", message: response }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", message: "Sorry, there was an error processing your request." },
      ]);
    } finally {
      setLoading(false); // Reset loading state
    }
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 max-h-[60vh] overflow-y-auto">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} role={msg.role} />
        ))}
      </div>
      <div className="mb-4 flex gap-4">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="p-2 border rounded-md flex-1"
        >
          <option value="gemini-pro">Gemini Pro</option>
          <option value="gemini-pro-vision">Gemini Pro Vision</option>
        </select>
        <div className="flex items-center gap-2">
          <label>Safety Filters:</label>
          <input
            type="checkbox"
            checked={filters}
            onChange={() => setFilters(!filters)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded-md"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors"
        >
          {loading ? "Sending..." : "Send"} {/* Loading state in button */}
        </button>
      </div>
    </div>
  );
}

ChatBox.propTypes = {
  message: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
