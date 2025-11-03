from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Product, Purchase, Tag, Review
from ai_utils import get_sustainability_recommendations, get_ai_chat_response
from auth_utils import admin_required, shopper_required, get_current_user

api = Blueprint('api', __name__)





# ---------------- Products ----------------

@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@api.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@api.route('/products', methods=['POST'])
@jwt_required()
@admin_required()
def create_product():
    """
    Create a new product (Admin only)
    Requires: JWT token with admin role
    """
    data = request.get_json()
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({'error': 'Name and price are required'}), 400

    try:
        price = float(data['price'])
        if price < 0:
            return jsonify({'error': 'Price must be non-negative'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid price'}), 400

    current_user = get_current_user()
    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=price,
        category=data.get('category'),
        sustainability_score=data.get('sustainability_score'),
        carbon_footprint=data.get('carbon_footprint'),
        image_url=data.get('image_url'),
        user_id=current_user.id
    )

    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@api.route('/products/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required()
def update_product(id):
    """
    Update a product (Admin only)
    Requires: JWT token with admin role
    """
    product = Product.query.get_or_404(id)
    data = request.get_json()
    for field in ['name', 'description', 'price', 'category', 'sustainability_score', 'carbon_footprint', 'image_url']:
        if field in data:
            setattr(product, field, data[field])
    db.session.commit()
    return jsonify(product.to_dict())

@api.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required()
def delete_product(id):
    """
    Delete a product (Admin only)
    Requires: JWT token with admin role
    """
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

@api.route('/users/register', methods=['POST'])
def register_user():
    """
    Register a new user with role (shopper or admin)
    Body: {username, email, password, role (optional, defaults to 'shopper')}
    """
    try:
        data = request.get_json()
        if not data or not all(k in data for k in ('username', 'email', 'password')):
            return jsonify({'error': 'Username, email, and password are required'}), 400
        
        # Validate role
        role = data.get('role', 'shopper').lower()
        if role not in ['shopper', 'admin']:
            return jsonify({'error': 'Role must be either "shopper" or "admin"'}), 400
        
        # Check for existing username or email
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user:
            return jsonify({'error': 'Username already taken'}), 400
        
        existing_email = User.query.filter_by(email=data['email']).first()
        if existing_email:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create and save user
        user = User(username=data['username'], email=data['email'], role=role)
        user.set_password(data['password'])
        
        print(f"🔍 Attempting to add user: {user.username}, {user.email}, {user.role}")
        db.session.add(user)
        
        print(f"🔍 Attempting to commit user to database...")
        db.session.commit()
        
        print(f"✅ User created successfully with ID: {user.id}")
        
        # Create access token
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ ERROR in register_user: {type(e).__name__}")
        print(f"❌ Error message: {str(e)}")
        import traceback
        print(f"❌ Full traceback:\n{traceback.format_exc()}")
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@api.route('/users/login', methods=['POST'])
def login_user():
    """
    Login user and return JWT token
    Body: {username, password}
    """
    data = request.get_json()
    if not data or not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Username and password are required'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Check if account is active
    if not user.is_active:
        return jsonify({'error': 'Account is inactive. Please contact support.'}), 403
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': user.to_dict()
    }), 200

@api.route('/users/me', methods=['GET'])
@jwt_required()
def get_current_user_info():
    """
    Get current authenticated user's information
    Requires: JWT token in Authorization header
    """
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200

@api.route('/purchases', methods=['POST'])
@jwt_required()
@shopper_required()
def create_purchase():
    data = request.get_json()
    if not data or 'product_id' not in data:
        return jsonify({'error': 'Product ID is required'}), 400

    current_user_id = get_jwt_identity()
    product_id = data['product_id']
    quantity = data.get('quantity', 1)

    # Validate product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    # Validate quantity
    try:
        quantity = int(quantity)
        if quantity < 1:
            return jsonify({'error': 'Quantity must be at least 1'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Quantity must be a valid integer'}), 400

    # Create purchase
    purchase = Purchase(
        user_id=current_user_id,
        product_id=product_id,
        quantity=quantity
    )
    db.session.add(purchase)
    db.session.commit()

    return jsonify(purchase.to_dict()), 201

@api.route('/purchases', methods=['GET'])
@jwt_required()
def get_user_purchases():
    current_user_id = get_jwt_identity()
    purchases = Purchase.query.filter_by(user_id=current_user_id).all()
    return jsonify([purchase.to_dict() for purchase in purchases])

@api.route('/purchases/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_purchase(id):
    current_user_id = get_jwt_identity()
    purchase = Purchase.query.filter_by(id=id, user_id=current_user_id).first()

    if not purchase:
        return jsonify({'error': 'Purchase not found'}), 404

    db.session.delete(purchase)
    db.session.commit()
    return '', 204

@api.route('/recommendations/<int:id>', methods=['GET'])
def get_recommendations(id):
    product = Product.query.get_or_404(id)
    recommendations = get_sustainability_recommendations(product)
    return jsonify(recommendations)


# ---------------- AI Chat ----------------

@api.route('/chat', methods=['POST','OPTIONS'])
def chat():
    """
    AI Chat endpoint for sustainability questions and product recommendations.
    Now includes context from your products and tags.
    """
    if request.method =='OPTIONS':
        return '',200
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400

    user_message = data['message'].strip()
    if not user_message:
        return jsonify({'error': 'Message cannot be empty'}), 400

    conversation_history = data.get('conversation_history', [])

    
    products = Product.query.limit(5).all()
    tags = Tag.query.limit(5).all()

    context_text = "\n".join([
        f"- {p.name} ({p.category or 'Uncategorized'}): "
        f"Eco Score {p.sustainability_score or 'N/A'}/10, "
        f"Carbon {p.carbon_footprint or 'N/A'} kg CO₂"
        for p in products
    ])
    tag_text = ", ".join([t.name for t in tags])

    contextual_message = f"""
    You are GreenShelf Assistant .
    Here are some sample products and their eco details:
    {context_text}

    Tags include: {tag_text}.

    User asked: {user_message}
    """

    ai_response = get_ai_chat_response(contextual_message, conversation_history)

    from datetime import datetime
    return jsonify({
        'response': ai_response,
        'timestamp': datetime.utcnow().isoformat(),
        'context_used': True
    }), 200







# ---------------- Tags ----------------

@api.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    return jsonify([t.to_dict() for t in tags])

@api.route('/tags', methods=['POST'])
@jwt_required()
@admin_required()
def create_tag():
    """
    Create a new tag (Admin only)
    Requires: JWT token with admin role
    """
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'error': 'Tag name required'}), 400
    
    
    existing_tag = Tag.query.filter_by(name=data['name']).first()
    if existing_tag:
        return jsonify({'error': 'Tag already exists'}), 400
    
    tag = Tag(name=data['name'])
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.to_dict()), 201




@api.route('/products/<int:product_id>/reviews', methods=['POST'])
def create_review(product_id):
    data = request.get_json()
    if not data or 'rating' not in data:
        return jsonify({'error': 'Rating is required'}), 400
    try:
        rating = int(data['rating'])
        if not (1 <= rating <= 5):
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid rating'}), 400

    review = Review(rating=rating, comment=data.get('comment'), product_id=product_id)
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201


def register_routes(app):
    app.register_blueprint(api, url_prefix='/api')
