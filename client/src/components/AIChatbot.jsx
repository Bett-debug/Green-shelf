import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send } from "lucide-react";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "ai",
      text: "Hi 👋! I'm your GreenShelf Assistant. Ask me about eco-friendly products or sustainability tips!",
    },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        from: "ai",
        text:
          "That's a great question 🌿! Try exploring our 'Eco Friendly' or 'Reusable' products section for sustainable options.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all"
      >
        {open ? <X size={24} /> : <MessageSquare size={26} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white px-4 py-3 font-semibold text-sm flex justify-between items-center">
            GreenShelf Assistant
            <button onClick={() => setOpen(false)} className="text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto text-sm bg-gray-50"
            style={{ maxHeight: "320px" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.from === "ai" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.from === "ai"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me about green living..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              onClick={handleSend}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-2 flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
