from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Product, User, Purchase, db
from ai_utils import get_sustainability_recommendations

api = Blueprint('api', __name__)

@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@api.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@api.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()

    # Validate required fields
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({'error': 'Name and price are required'}), 400

    try:
        price = float(data['price'])
        if price < 0:
            return jsonify({'error': 'Price must be non-negative'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Price must be a valid number'}), 400

    # Validate optional numeric fields
    sustainability_score = data.get('sustainability_score')
    if sustainability_score is not None:
        try:
            sustainability_score = int(sustainability_score)
            if not (1 <= sustainability_score <= 10):
                return jsonify({'error': 'Sustainability score must be between 1 and 10'}), 400
        except (ValueError, TypeError):
            return jsonify({'error': 'Sustainability score must be a valid integer'}), 400

    carbon_footprint = data.get('carbon_footprint')
    if carbon_footprint is not None:
        try:
            carbon_footprint = float(carbon_footprint)
            if carbon_footprint < 0:
                return jsonify({'error': 'Carbon footprint must be non-negative'}), 400
        except (ValueError, TypeError):
            return jsonify({'error': 'Carbon footprint must be a valid number'}), 400

    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=price,
        category=data.get('category'),
        sustainability_score=sustainability_score,
        carbon_footprint=carbon_footprint
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.category = data.get('category', product.category)
    product.sustainability_score = data.get('sustainability_score', product.sustainability_score)
    product.carbon_footprint = data.get('carbon_footprint', product.carbon_footprint)
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

def register_routes(app):
    app.register_blueprint(api, url_prefix='/api')