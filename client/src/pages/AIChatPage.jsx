import React from "react";

const AIChatPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">AI Chat Assistant</h2>
      <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
        <p className="text-gray-700">
          Welcome to your personal sustainability assistant 🌿
        </p>
        <p className="mt-3 text-gray-600">
          Click the chat bubble in the bottom-right corner to start chatting with
          GreenShelf AI — your eco-conscious helper for recommendations, insights,
          and product comparisons.
        </p>
      </div>
    </div>
  );
};

export default AIChatPage;
