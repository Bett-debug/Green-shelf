# Green Shelf 🌿

A full-stack sustainable e-commerce platform with AI-powered recommendations and role-based authentication. Built with Flask (backend) and React (frontend).

## Features

### Core Functionality
- **Product Management**: Full CRUD operations for sustainable products
- **Sustainability Scoring**: Rate products on a 1-100 sustainability scale
- **Carbon Footprint Tracking**: Monitor environmental impact of products
- **AI-Powered Chatbot**: Get real-time sustainability advice and product recommendations with contextual awareness
- **Product Recommendations**: AI-generated sustainability improvement suggestions
- **Tag System**: Organize products with custom tags
- **Product Reviews**: Rate and review products (1-5 stars)

### Authentication & Authorization
- **Role-Based Access Control**: Two user types (Shoppers and Admins)
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend and backend route protection
- **User Management**: Registration, login, and profile management

### User Roles

####  Shopper (Default)
- Browse and view all products
- Make purchases (requires authentication)
- View purchase history
- Get AI-powered sustainability recommendations
- Access AI chatbot for eco-friendly advice

####  Admin
- Full product management (Create, Read, Update, Delete)
- Create and manage tags
- View analytics and user data
- Manage product sustainability scores
- Access admin dashboard

##  Tech Stack

### Backend
- **Flask**: Web framework
- **SQLAlchemy**: ORM for database operations
- **Flask-JWT-Extended**: JWT authentication
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-Migrate**: Database migrations
- **OpenAI API**: AI chatbot and recommendations
- **PostgreSQL/SQLite**: Database (PostgreSQL for production, SQLite for development)
- **Gunicorn**: Production WSGI server

### Frontend
- **React 19**: UI library
- **React Router DOM**: Client-side routing
- **Vite**: Build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Context API**: State management

##  Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn
- OpenAI API key (for AI features)

##  Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Bett-debug/Green-shelf
cd Green_Shelf
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a [`.env`](.env) file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
DATABASE_URL=sqlite:///greenshelf.db  # or PostgreSQL URL for production
```
(not copied for secuity practice())()
#### Initialize Database
```bash
# Run migrations
flask db upgrade

# Seed the database with sample data
python seed_data.py
```

#### Start Backend Server
```bash
python app.py
```
Backend will run at `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to Client Directory
```bash
cd client
```

#### Install Dependencies
```bash
npm install
```

#### Start Development Server
```bash
npm run dev
```
Frontend will run at `http://localhost:5173`

## 📚 API Documentation

### Public Endpoints (No Authentication)

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get specific product

#### Tags
- `GET /api/tags` - Get all tags

#### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Protected Endpoints (Authentication Required)

#### User
- `GET /api/users/me` - Get current user info

#### Purchases (Shopper Only)
- `POST /api/purchases` - Create purchase
- `GET /api/purchases` - Get user purchases
- `DELETE /api/purchases/<id>` - Delete purchase

#### Products (Admin Only)
- `POST /api/products` - Create product
- `PUT /api/products/<id>` - Update product
- `DELETE /api/products/<id>` - Delete product

#### Tags (Admin Only)
- `POST /api/tags` - Create tag

#### AI Features
- `POST /api/chat` - Chat with AI assistant (includes product context)
- `GET /api/recommendations/<id>` - Get product recommendations

#### Reviews
- `POST /api/products/<product_id>/reviews` - Create product review

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password",
    "role": "shopper"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure_password"
  }'
```

#### Create Product (Admin)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Organic Cotton T-Shirt",
    "description": "100% organic cotton, fair trade certified",
    "price": 29.99,
    "category": "Clothing",
    "sustainability_score": 95,
    "carbon_footprint": 2.5,
    "image_url": "https://example.com/image.jpg"
  }'
```

## 🗄️ Database Schema

### User Model
```python
{
  "id": "integer",
  "username": "string (unique)",
  "email": "string (unique)",
  "password_hash": "string",
  "role": "string (shopper/admin)",
  "is_active": "boolean",
  "created_at": "datetime"
}
```

### Product Model
```python
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "float",
  "category": "string",
  "sustainability_score": "integer (1-100)",
  "carbon_footprint": "float (kg CO2)",
  "image_url": "string",
  "store_url": "string",
  "user_id": "integer (foreign key)",
  "tags": "array of tag objects",
  "created_at": "datetime"
}
```

### Purchase Model
```python
{
  "id": "integer",
  "user_id": "integer (foreign key)",
  "product_id": "integer (foreign key)",
  "quantity": "integer",
  "purchased_at": "datetime",
  "product": "product object (nested)"
}
```

### Tag Model
```python
{
  "id": "integer",
  "name": "string (unique)"
}
```

### Review Model
```python
{
  "id": "integer",
  "rating": "integer (1-5)",
  "comment": "string (optional)",
  "product_id": "integer (foreign key)"
}
```

##  AI Features

### AI Chatbot
- Real-time sustainability advice with product context
- Contextual awareness of your product catalog
- Product recommendations based on actual inventory
- Eco-friendly living tips
- Conversation history tracking (last 10 messages)
- Powered by OpenAI GPT-4o-mini

### Product Recommendations
- AI-generated sustainability improvements
- Personalized suggestions based on product data
- Environmental impact analysis

##  Frontend Routes

### Public Routes
- `/products` - Product listing (public)
- `/products/:id` - Product details (public)
- `/login` - User login
- `/register` - User registration

### Protected Routes (Authentication Required)
- `/` - Home page (protected)
- `/tags` - Browse by tags (protected)
- `/recommendations` - AI recommendations (protected)
- `/users/:id` - User profile page (protected)

### Admin-Only Routes
- `/dashboard` - Admin dashboard
- `/add` - Add new product
- `/edit/:id` - Edit product

## Security Features

1. **Password Hashing**: Werkzeug password hashing
2. **JWT Tokens**: Secure token-based authentication
3. **Role Validation**: Strict role checking on protected routes
4. **Account Status**: Inactive accounts cannot log in
5. **Input Validation**: All inputs validated before processing
6. **CORS Configuration**: Secure cross-origin requests

##  Deployment

### Backend (Render/Heroku)
1. Set environment variables in hosting platform
2. Use PostgreSQL database
3. Configure [`build.sh`](build.sh) for build commands
4. Deploy using [`render.yaml`](render.yaml) configuration

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the [`dist`](client/dist) directory
3. Configure [`_redirects`](client/public/_redirects) for SPA routing

##  Additional Documentation

- [`AUTH_SYSTEM.md`](AUTH_SYSTEM.md) - Detailed authentication documentation
- [`AI_CHATBOT_SETUP.md`](AI_CHATBOT_SETUP.md) - AI chatbot setup guide
- [`ROLE_BASED_AUTH_SUMMARY.md`](ROLE_BASED_AUTH_SUMMARY.md) - Role-based access control summary
- [`PRODUCTS_BY_CATEGORY.md`](PRODUCTS_BY_CATEGORY.md) - Product categorization guide
- [`RENDER_DEPLOYMENT.md`](RENDER_DEPLOYMENT.md) - Deployment instructions

##  Testing

### Backend Tests
```bash
# Run tests (if test suite exists)
pytest
```

### Frontend Tests
```bash
cd client
npm run test
```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License.

##  Acknowledgments

- OpenAI for AI capabilities
- Flask and React communities
- All contributors and supporters

##  Support

For issues and questions, please open an issue on GitHub or contact the maintainers.

---

Built with 💚 for a sustainable future
