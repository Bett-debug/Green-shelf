# Green Shelf - Sustainable Product Marketplace

A full-stack web application for managing and discovering sustainable products with AI-powered recommendations. Built with Flask (backend) and React (frontend), featuring role-based authentication and comprehensive product management.

## 🌟 Features

### Core Features
- **Product Management**: Full CRUD operations for sustainable products
- **Sustainability Scoring**: Rate products on a 1-10 sustainability scale
- **Carbon Footprint Tracking**: Monitor environmental impact of products
- **AI Recommendations**: Get AI-generated sustainability improvement suggestions
- **Role-Based Authentication**: Separate access levels for shoppers and admins
- **Purchase Tracking**: Track user purchases and history
- **Tag System**: Categorize products with custom tags
- **Product Reviews**: Rate and review products

### User Roles
- **Shoppers**: Browse products, make purchases, view recommendations
- **Admins**: Full product management, tag creation, analytics access

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)

## 🛠 Tech Stack

### Backend
- **Flask** 2.3.3 - Web framework
- **SQLAlchemy** 2.0.36 - ORM for database operations
- **Flask-JWT-Extended** 4.6.0 - JWT authentication
- **Flask-CORS** 4.0.0 - Cross-origin resource sharing
- **Flask-Migrate** 4.0.5 - Database migrations
- **OpenAI API** 1.3.0 - AI-powered recommendations
- **SQLite** - Lightweight database
- **python-dotenv** 1.0.0 - Environment variable management

### Frontend
- **React** 19.1.1 - UI library
- **React Router DOM** 7.9.4 - Client-side routing
- **Vite** 7.1.7 - Build tool and dev server
- **Tailwind CSS** 4.1.14 - Utility-first CSS framework
- **Lucide React** 0.546.0 - Icon library

## 📁 Project Structure

```
Green_Shelf/
├── backend/
│   ├── app.py                 # Flask application entry point
│   ├── models.py              # Database models (User, Product, Purchase, Tag, Review)
│   ├── routes.py              # API route definitions
│   ├── auth_utils.py          # Authentication utilities and decorators
│   ├── ai_utils.py            # OpenAI integration for recommendations
│   ├── db.py                  # Database configuration
│   ├── seed_data.py           # Database seeding script
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (not in git)
│   └── migrations/            # Database migration files
│
├── client/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AIChatbot.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserPage.jsx
│   │   │   ├── Tags.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   └── AIChatPage.jsx
│   │   ├── context/           # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── utils/             # Utility functions
│   │   │   ├── constants.js
│   │   │   └── format.js
│   │   ├── api.js             # API client configuration
│   │   ├── App.jsx            # Main App component
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   └── index.html             # HTML template
│
└── README.md                  # This file
```

## 🚀 Backend Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- OpenAI API key

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone git@github.com:Bett-debug/Green-shelf.git
   cd Green_Shelf
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Linux/Mac:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY="secret"
   JWT_SECRET_KEY="siri"
   ```

5. **Initialize the database**
   ```bash
   # Run migrations
   flask db upgrade
   
   # Seed the database with sample data
   python seed_data.py
   ```

6. **Run the backend server**
   ```bash
   python app.py
   ```
   
   The API will be available at `http://localhost:5000`

### Backend Configuration

- **Database**: SQLite database file (`instance/products.db`)
- **CORS**: Enabled for all origins (configure in production)
- **JWT**: Token-based authentication with configurable expiration
- **Debug Mode**: Enabled by default (disable in production)

## 🎨 Frontend Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation Steps

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Update [`api.js`](client/src/api.js:1) if your backend runs on a different port:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Frontend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Public Endpoints (No Authentication)

#### Products
- `GET /products` - Get all products
- `GET /products/<id>` - Get a specific product
- `GET /recommendations/<id>` - Get AI recommendations for a product

#### Tags
- `GET /tags` - Get all tags

#### Authentication
- `POST /users/register` - Register a new user
- `POST /users/login` - Login and receive JWT token

### Protected Endpoints (Requires JWT Token)

#### User Management
- `GET /users/me` - Get current user information

#### Purchases (Shopper Only)
- `POST /purchases` - Create a purchase
- `GET /purchases` - Get user's purchase history
- `DELETE /purchases/<id>` - Delete a purchase

#### Product Management (Admin Only)
- `POST /products` - Create a new product
- `PUT /products/<id>` - Update a product
- `DELETE /products/<id>` - Delete a product

#### Tag Management (Admin Only)
- `POST /tags` - Create a new tag

#### Reviews
- `POST /products/<product_id>/reviews` - Create a product review

### Request/Response Examples

#### Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "shopper"  // optional, defaults to "shopper"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "shopper",
    "is_active": true,
    "created_at": "2025-10-21T04:00:00.000Z"
  }
}
```

#### Create Product (Admin)
```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Organic Cotton T-Shirt",
  "description": "100% organic cotton, fair trade certified",
  "price": 29.99,
  "category": "Clothing",
  "sustainability_score": 95,
  "carbon_footprint": 2.5,
  "image_url": "https://example.com/image.jpg"
}
```

## 🗄 Database Schema

### User Model
```python
- id: Integer (Primary Key)
- username: String(80) (Unique)
- email: String(120) (Unique)
- password_hash: String(128)
- role: String(20) - 'shopper' or 'admin'
- is_active: Boolean
- created_at: DateTime
```

### Product Model
```python
- id: Integer (Primary Key)
- name: String(100)
- description: Text
- price: Float
- category: String(50)
- sustainability_score: Integer (1-10)
- carbon_footprint: Float (kg CO2)
- image_url: String(255)
- user_id: Integer (Foreign Key)
- created_at: DateTime
```

### Purchase Model
```python
- id: Integer (Primary Key)
- user_id: Integer (Foreign Key)
- product_id: Integer (Foreign Key)
- quantity: Integer
- purchased_at: DateTime
```

### Tag Model
```python
- id: Integer (Primary Key)
- name: String(50) (Unique)
```

### Review Model
```python
- id: Integer (Primary Key)
- rating: Integer (1-5)
- comment: Text
- product_id: Integer (Foreign Key)
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication with role-based access control.

### User Roles

**Shopper** (Default)
- Browse and view products
- Make purchases
- View purchase history
- Get AI recommendations
- Cannot manage products

**Admin**
- Full product CRUD operations
- Create and manage tags
- View analytics
- Cannot make purchases

### Using Authentication in Frontend

```javascript
// Store token after login
localStorage.setItem('token', data.access_token);
localStorage.setItem('user', JSON.stringify(data.user));

// Make authenticated requests
const token = localStorage.getItem('token');
fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(productData)
});

// Check user role
const user = JSON.parse(localStorage.getItem('user'));
if (user.role === 'admin') {
  // Show admin features
}
```

### Protected Routes

The frontend uses [`ProtectedRoute`](client/src/components/ProtectedRoute.jsx:1) component:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute requireAdmin={true}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Required
OPENAI_API_KEY="s"
JWT_SECRET_KEY="s"

# Optional
FLASK_ENV=development
DATABASE_URL=sqlite:///instance/products.db
```

### Frontend
No environment variables required for development. For production, configure:
- API base URL in [`api.js`](client/src/api.js:1)
- Build settings in [`vite.config.js`](client/vite.config.js:1)

## 💻 Development

### Running Both Servers Concurrently

**Terminal 1 - Backend:**
```bash
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Database Migrations

```bash
# Create a new migration
flask db migrate -m "Description of changes"

# Apply migrations
flask db upgrade

# Rollback migration
flask db downgrade
```

### Adding Sample Data

```bash
python seed_data.py
```

This creates:
- Sample admin user (username: `admin`, password: `admin123`)
- Sample shopper user (username: `shopper`, password: `shopper123`)
- Multiple products across different categories
- Tags and product associations

## 🚢 Deployment

### Backend Deployment

1. **Set production environment variables**
2. **Disable debug mode** in [`app.py`](app.py:28)
3. **Use production database** (PostgreSQL recommended)
4. **Configure CORS** for specific origins
5. **Use production WSGI server** (Gunicorn, uWSGI)

Example with Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment

1. **Build the production bundle**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

3. **Update API base URL** in production build

## 📖 Additional Documentation

- [`AUTH_SYSTEM.md`](AUTH_SYSTEM.md:1) - Detailed authentication documentation
- [`AUTH_IMPLEMENTATION_SUMMARY.md`](AUTH_IMPLEMENTATION_SUMMARY.md:1) - Implementation summary
- [`PRODUCTS_BY_CATEGORY.md`](PRODUCTS_BY_CATEGORY.md:1) - Product categorization guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Backend Issues

**Database not found:**
```bash
flask db upgrade
python seed_data.py
```

**OpenAI API errors:**
- Verify API key in `.env`
- Check API quota and billing

**CORS errors:**
- Ensure Flask-CORS is installed
- Check CORS configuration in [`app.py`](app.py:16)

### Frontend Issues

**API connection failed:**
- Verify backend is running on port 5000
- Check API_BASE_URL in [`api.js`](client/src/api.js:1)

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Change port in vite.config.js or kill the process
lsof -ti:5173 | xargs kill -9
```

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API endpoint documentation

## 🎯 Roadmap

- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Advanced analytics dashboard
- [ ] Product comparison feature
- [ ] Social sharing capabilities
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Payment gateway integration

---

**Built with ❤️ for a sustainable future**