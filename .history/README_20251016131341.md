# Sustainable Shelf Backend

A Flask-based REST API for managing sustainable products with AI-powered recommendations.

## Features

- **Product Management**: Full CRUD operations for sustainable products
- **Sustainability Scoring**: Rate products on a 1-10 sustainability scale
- **Carbon Footprint Tracking**: Track environmental impact of products
- **AI Recommendations**: Get AI-generated sustainability improvement suggestions
- **SQLite Database**: Lightweight, file-based database for easy deployment

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sustainable-shelf-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Seed the database**
   ```bash
   python seed_data.py
   ```

6. **Run the application**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/<id>` - Update a product
- `DELETE /api/products/<id>` - Delete a product

### Recommendations

- `GET /api/recommendations/<id>` - Get AI-generated sustainability recommendations for a product

## Product Schema

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "float",
  "category": "string",
  "sustainability_score": "integer (1-10)",
  "carbon_footprint": "float (kg CO2)",
  "created_at": "datetime"
}
```

## Technologies Used

- **Flask**: Web framework
- **SQLAlchemy**: ORM for database operations
- **OpenAI API**: AI-powered recommendations
- **SQLite**: Database
- **python-dotenv**: Environment variable management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.