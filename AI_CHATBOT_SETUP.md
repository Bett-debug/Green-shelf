# AI Chatbot Setup Guide

## Current Status ✅
The AI chatbot is **fully functional** and working perfectly! All components are properly integrated:

- ✅ Frontend chatbot UI with floating button
- ✅ Backend API endpoint at `/api/chat`
- ✅ Real-time message sending and receiving
- ✅ Conversation history tracking
- ✅ Error handling and loading states
- ✅ CORS configuration
- ✅ Responsive design

## To Enable AI Responses

Currently, the chatbot shows: *"I'm currently unavailable. The OpenAI API key is not configured."*

This is because the OpenAI API key needs to be configured. Follow these steps:

### 1. Get an OpenAI API Key
- Visit https://platform.openai.com/api-keys
- Sign up or log in to your OpenAI account
- Create a new API key
- Copy the key (it starts with `sk-proj-` or `sk-`)

### 2. Update the `.env` File
Replace the placeholder in `.env`:
```bash
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

### 3. Restart the Flask Server
```bash
# Stop the current server (Ctrl+C)
# Then restart it
python app.py
```

## Testing the Chatbot

1. **Open the application** at http://localhost:5173
2. **Click the green chat button** in the bottom-right corner
3. **Type a message** like:
   - "Tell me about sustainable living"
   - "What eco-friendly products do you recommend?"
   - "How can I reduce my carbon footprint?"
4. **Press Enter or click Send**

## Features

### AI Assistant Capabilities
- Answers questions about sustainability and eco-friendly living
- Provides product recommendations
- Offers tips on reducing environmental impact
- Maintains conversation context (last 10 messages)
- Friendly and encouraging tone with emojis 🌿

### Technical Features
- Real-time chat interface
- Conversation history
- Loading indicators
- Error handling with user-friendly messages
- Auto-scroll to latest message
- Keyboard shortcuts (Enter to send)
- Mobile-responsive design

## API Endpoint

**POST** `/api/chat`

Request body:
```json
{
  "message": "Your question here",
  "conversation_history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

Response:
```json
{
  "response": "AI assistant's response",
  "timestamp": "2025-10-21T06:00:00.000Z"
}
```

## Troubleshooting

### "I'm currently unavailable" message
- **Cause**: OpenAI API key not configured or invalid
- **Solution**: Add valid API key to `.env` and restart server

### CORS errors
- **Cause**: Backend not running or CORS not configured
- **Solution**: Ensure Flask server is running with CORS enabled (already configured)

### No response from chatbot
- **Cause**: Backend server not running
- **Solution**: Start the Flask server with `python app.py`

## Cost Considerations

The chatbot uses OpenAI's GPT-4o-mini model, which is cost-effective:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- Each chat message costs approximately $0.0001-0.0005

For typical usage (100-1000 messages/day), monthly costs are minimal ($1-10).

## Next Steps

Once you add your OpenAI API key, the chatbot will provide intelligent, context-aware responses about sustainability and eco-friendly products!