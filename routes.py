from flask import Blueprint, request, jsonify
from models import db, User, Product, Tag, Review
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
