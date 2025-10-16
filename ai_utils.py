import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

def get_sustainability_recommendations(product):
    """
    Use OpenAI to generate sustainability recommendations for a product.
    """
    prompt = f"""
    Based on the following product information, provide 3-5 specific sustainability recommendations:

    Product Name: {product.name}
    Description: {product.description or 'No description available'}
    Category: {product.category or 'Uncategorized'}
    Current Sustainability Score: {product.sustainability_score or 'Not rated'}/10
    Carbon Footprint: {product.carbon_footprint or 'Unknown'} kg CO2

    Recommendations should focus on:
    - Reducing carbon footprint
    - Improving sustainability score
    - Alternative materials or production methods
    - Consumer usage tips

    Format as a list of actionable recommendations.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a sustainability expert providing practical recommendations."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )
        recommendations = response.choices[0].message.content.strip().split('\n')
        return [rec.strip('- ').strip() for rec in recommendations if rec.strip()]
    except Exception as e:
        return [f"Error generating recommendations: {str(e)}"]