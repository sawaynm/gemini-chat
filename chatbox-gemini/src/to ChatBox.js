,import { useState } from "react";
import ChatMessage from "./ChatMessage";
import { fetchGeminiResponse } from "../utils/api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState(true);
  const [model, setModel] = useState("gpt-4"); // Default model

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", message: input }];
    setMessages(newMessages);

    const response = await fetchGeminiResponse(input, model, filters);
    setMessages([...newMessages, { role: "assistant", message: response }]);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
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
          <option value="gpt-4">Gemini Pro Flash9/option>
          <option value="gpt-3.5">Gemini pro</option>
          {/* Add more models as needed */}
        </select>
        <div className="flex items-center gap-2">
          <label>Filters:</label>
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
          className="flex-1 p-2 border rounded-md"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}