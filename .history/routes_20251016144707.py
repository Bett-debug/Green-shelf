from flask import Blueprint, request, jsonify
from models import Product, User, db
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

@api.route('/recommendations/<int:id>', methods=['GET'])
def get_recommendations(id):
    product = Product.query.get_or_404(id)
    recommendations = get_sustainability_recommendations(product)
    return jsonify(recommendations)

def register_routes(app):
    app.register_blueprint(api, url_prefix='/api')