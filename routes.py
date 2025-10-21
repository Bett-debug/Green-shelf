from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Product, Purchase, Tag, Review
from ai_utils import get_sustainability_recommendations

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
def create_product():
    data = request.get_json()
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({'error': 'Name and price are required'}), 400

    try:
        price = float(data['price'])
        if price < 0:
            return jsonify({'error': 'Price must be non-negative'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid price'}), 400

    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=price,
        category=data.get('category'),
        sustainability_score=data.get('sustainability_score'),
        carbon_footprint=data.get('carbon_footprint')
    )

    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    for field in ['name', 'description', 'price', 'category', 'sustainability_score', 'carbon_footprint']:
        if field in data:
            setattr(product, field, data[field])
    db.session.commit()
    return jsonify(product.to_dict())

@api.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

@api.route('/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    if not data or not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'error': 'Username, email, and password are required'}), 400
    
    # Check for existing username or email
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already taken'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create and save user
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.to_dict()), 201

@api.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if not data or not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Username and password are required'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({'access_token': access_token, 'user': user.to_dict()}), 200

@api.route('/purchases', methods=['POST'])
@jwt_required()
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


# ---------------- Tags ----------------

@api.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    return jsonify([t.to_dict() for t in tags])

@api.route('/tags', methods=['POST'])
def create_tag():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'error': 'Tag name required'}), 400
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
