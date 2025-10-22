import cohere
import os
from dotenv import load_dotenv

load_dotenv()

client = None
try:
    if os.getenv('COHERE_API_KEY'):
        client = cohere.Client(api_key=os.getenv('COHERE_API_KEY'))
except Exception as e:
    print(f"Failed to initialize Cohere client: {e}")


def get_sustainability_recommendations(product):
    """
    Generate sustainability recommendations for a given product using Cohere.
    """
    if not client:
        return ["Cohere API key not configured. Please set COHERE_API_KEY in your .env file."]

    message = f"""
    You are a sustainability expert. Based on the following product details, give 3–5 practical recommendations
    to improve its environmental impact.

    Product Name: {product.name}
    Description: {product.description or 'No description provided'}
    Category: {product.category or 'Uncategorized'}
    Sustainability Score: {product.sustainability_score or 'Not rated'}/10
    Carbon Footprint: {product.carbon_footprint or 'Unknown'} kg CO₂

    Focus on:
    - Reducing carbon emissions
    - Sustainable materials or production
    - Eco-friendly packaging
    - Consumer use and disposal tips

    Format as a simple list.
    """

    try:
        response = client.chat(
            model="c4ai-aya-23",
            message=message,
            max_tokens=300,
            temperature=0.7
        )

        content = response.text.strip()
        return [line.strip("-• ").strip() for line in content.split("\n") if line.strip()]

    except Exception as e:
        print(f"Cohere API Error: {str(e)}")
        return [f"Error generating recommendations: {str(e)}"]


def get_ai_chat_response(user_message, conversation_history=None):
    """
    Generate AI chat response for sustainability and eco-friendly product queries.

    Args:
        user_message: The user's current message
        conversation_history: List of previous messages in format
            [{"role": "user" or "assistant", "content": "..."}]

    Returns:
        str: AI assistant's response
    """
    if not client:
        return "I'm currently unavailable . The Cohere API key is not configured."

    # System prompt for the AI assistant
    system_prompt = """You are GreenShelf Assistant, a friendly and knowledgeable AI helper for an eco-friendly e-commerce platform.

Your role is to:
- Help users find sustainable and eco-friendly products
- Provide tips on green living and sustainability
- Answer questions about environmental impact, carbon footprint, and eco-friendly practices
- Recommend products based on sustainability scores
- Educate users about recycling, composting, and reducing waste
- Be encouraging and positive about sustainable choices

Keep responses concise (2-3 sentences), friendly, and actionable. Use emojis occasionally to be engaging ."""

    try:
        chat_history = [{"role": "SYSTEM", "message": system_prompt}]

        
        if conversation_history:
            for msg in conversation_history:
                role = msg.get("role", "").upper()
                content = msg.get("content", "") or msg.get("message", "")
                if role in ["USER", "ASSISTANT", "CHATBOT"]:
                    if role == "ASSISTANT":
                        role = "CHATBOT"  
                    chat_history.append({"role": role, "message": content})

        
        response = client.chat(
            model="c4ai-aya-23",
            message=user_message,
            chat_history=chat_history,
            max_tokens=200,
            temperature=0.8
        )

        return response.text.strip()

    except Exception as e:
        print(f"Cohere API Error: {str(e)}")
        return "I’m having a small hiccup right now  — please try again in a moment."
