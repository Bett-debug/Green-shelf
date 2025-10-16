from flask import Blueprint, request, jsonify
from models import Product, db
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
    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
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