# Green Shelf Authentication System

## Overview

Green Shelf now implements a comprehensive role-based authentication system with two user types:
- **Shoppers**: Browse products, make purchases, get AI recommendations
- **Admins**: Full product management, tag creation, analytics access

## User Roles

### Shopper Role
- Default role for new users
- Can browse and view all products
- Can make purchases (requires authentication)
- Can view their purchase history
- Can get AI-powered sustainability recommendations
- **Cannot** create, edit, or delete products

### Admin Role
- Full access to product management (CRUD operations)
- Can create and manage tags
- Can view all user data and analytics
- Can manage product sustainability scores
- **Cannot** make purchases (admin-only role)

## Database Schema

### User Model
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='shopper')  # 'shopper' or 'admin'
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "shopper"  // optional, defaults to "shopper"
}
```

**Response (201 Created):**
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

#### 2. Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
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

#### 3. Get All Products
```http
GET /api/products
```

#### 4. Get Single Product
```http
GET /api/products/{id}
```

#### 5. Get All Tags
```http
GET /api/tags
```

### Protected Endpoints (Authentication Required)

All protected endpoints require the JWT token in the Authorization header:
```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

#### Get Current User Info
```http
GET /api/users/me
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "shopper",
  "is_active": true,
  "created_at": "2025-10-21T04:00:00.000Z"
}
```

### Shopper-Only Endpoints

#### Create Purchase
```http
POST /api/purchases
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}
```

#### Get User Purchases
```http
GET /api/purchases
Authorization: Bearer {token}
```

#### Delete Purchase
```http
DELETE /api/purchases/{id}
Authorization: Bearer {token}
```

### Admin-Only Endpoints

#### Create Product
```http
POST /api/products
Authorization: Bearer {admin_token}
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

#### Update Product
```http
PUT /api/products/{id}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 34.99
}
```

#### Delete Product
```http
DELETE /api/products/{id}
Authorization: Bearer {admin_token}
```

**Response (200 OK):**
```json
{
  "message": "Product deleted successfully"
}
```

#### Create Tag
```http
POST /api/tags
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Organic"
}
```

## Role-Based Access Control

### Using Decorators

The system provides two decorators for role-based access control:

```python
from auth_utils import admin_required, shopper_required

# Admin-only route
@api.route('/admin/products', methods=['POST'])
@jwt_required()
@admin_required()
def create_product():
    # Only admins can access this
    pass

# Shopper-only route
@api.route('/purchases', methods=['POST'])
@jwt_required()
@shopper_required()
def create_purchase():
    # Only shoppers can access this
    pass
```

### Helper Functions

```python
from auth_utils import get_current_user, is_admin_user, is_shopper_user

# Get current user object
user = get_current_user()

# Check if current user is admin
if is_admin_user():
    # Admin-specific logic
    pass

# Check if current user is shopper
if is_shopper_user():
    # Shopper-specific logic
    pass
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Username, email, and password are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid username or password"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

or

```json
{
  "error": "Account is inactive. Please contact support."
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

## Security Features

1. **Password Hashing**: All passwords are hashed using Werkzeug's `generate_password_hash`
2. **JWT Tokens**: Secure token-based authentication with configurable expiration
3. **Role Validation**: Strict role checking on protected routes
4. **Account Status**: Inactive accounts cannot log in
5. **Input Validation**: All inputs are validated before processing

## Testing the Authentication System

### 1. Register a Shopper
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "shopper1",
    "email": "shopper@example.com",
    "password": "password123",
    "role": "shopper"
  }'
```

### 2. Register an Admin
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### 3. Login and Get Token
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "password": "admin123"
  }'
```

### 4. Use Token to Access Protected Route
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Eco-Friendly Water Bottle",
    "price": 19.99,
    "category": "Kitchen",
    "sustainability_score": 90
  }'
```

## Frontend Integration

### Storing the Token
```javascript
// After successful login/register
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});

const data = await response.json();
localStorage.setItem('token', data.access_token);
localStorage.setItem('user', JSON.stringify(data.user));
```

### Making Authenticated Requests
```javascript
const token = localStorage.getItem('token');

const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(productData)
});
```

### Checking User Role
```javascript
const user = JSON.parse(localStorage.getItem('user'));

if (user.role === 'admin') {
  // Show admin features
} else if (user.role === 'shopper') {
  // Show shopper features
}
```

## Migration Notes

Existing users in the database will automatically be assigned:
- `role`: 'shopper' (default)
- `is_active`: true (default)

To manually update a user to admin role, use the database directly or create an admin endpoint.

## Next Steps

1. ✅ User model with roles implemented
2. ✅ Authentication routes created
3. ✅ Role-based access control decorators
4. ✅ Database migration completed
5. 🔄 Frontend authentication UI (in progress)
6. 📋 Admin dashboard for user management
7. 📋 Analytics and reporting for admins
8. 📋 Email verification system
9. 📋 Password reset functionality