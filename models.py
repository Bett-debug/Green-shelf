from db import db
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='shopper')  
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    products = db.relationship('Product', backref='creator', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def is_admin(self):
        """Check if user has admin role"""
        return self.role == 'admin'
    
    def is_shopper(self):
        """Check if user has shopper role"""
        return self.role == 'shopper'

    def to_dict(self, include_role=True):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }
        if include_role:
            data['role'] = self.role
        return data

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    purchased_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('purchases', lazy=True))
    product = db.relationship('Product', backref=db.backref('purchases', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'purchased_at': self.purchased_at.isoformat(),
            'product': self.product.to_dict() if self.product else None
        }


product_tags = db.Table(
    'product_tags',
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    sustainability_score = db.Column(db.Integer, nullable=True)
    carbon_footprint = db.Column(db.Float, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tags = db.relationship('Tag', secondary=product_tags, back_populates='products')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'sustainability_score': self.sustainability_score,
            'carbon_footprint': self.carbon_footprint,
            'image_url': self.image_url,  
            'user_id': self.user_id,
            'tags': [tag.to_dict() for tag in self.tags],  
            'created_at': self.created_at.isoformat() if self.created_at else None
        }



class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    products = db.relationship('Product', secondary=product_tags, back_populates='tags')

    def to_dict(self):
        return {'id': self.id, 'name': self.name}


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    product = db.relationship('Product', backref='reviews')

    def to_dict(self):
        return {'id': self.id, 'rating': self.rating, 'comment': self.comment, 'product_id': self.product_id}
