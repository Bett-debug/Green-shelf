from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = None
if os.getenv("OPENAI_API_KEY"):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_sustainability_recommendations(product):
    """
    Generate sustainability recommendations for a given product using OpenAI.
    """
    if not client:
        return ["OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file."]

    prompt = f"""
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
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert in sustainability and product design."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )

        content = response.choices[0].message.content.strip()
        return [line.strip("-• ").strip() for line in content.split("\n") if line.strip()]

    except Exception as e:
        return [f"Error generating recommendations: {str(e)}"]
