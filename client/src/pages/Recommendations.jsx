
import React from "react";

export default function Recommendations() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">AI Recommendations</h2>

      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <p className="text-gray-700">
          Our AI assistant can recommend more sustainable alternatives and tips. Click the chat button at the bottom-right to ask the AI for recommendations about any product.
        </p>

        <div className="mt-6 text-sm text-gray-500">
          <strong>Tip:</strong> Open a product and hit "Get AI Recommendations" to ask for specific swaps.
        </div>
      </div>
    </div>
  );
}
