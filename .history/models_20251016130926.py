from db import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    sustainability_score = db.Column(db.Integer, nullable=True)  # 1-10 scale
    carbon_footprint = db.Column(db.Float, nullable=True)  # in kg CO2
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
            'created_at': self.created_at.isoformat() if self.created_at else None
        }