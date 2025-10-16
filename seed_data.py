from app import app
from models import Product, db

def seed_database():
    with app.app_context():
        # Clear existing data
        db.session.query(Product).delete()
        db.session.commit()

        # Sample sustainable products
        products = [
            Product(
                name="Bamboo Toothbrush",
                description="Biodegradable toothbrush made from bamboo with replaceable nylon bristles",
                price=4.99,
                category="Personal Care",
                sustainability_score=9,
                carbon_footprint=0.5
            ),
            Product(
                name="Organic Cotton T-Shirt",
                description="100% organic cotton t-shirt, fair trade certified",
                price=29.99,
                category="Clothing",
                sustainability_score=8,
                carbon_footprint=2.1
            ),
            Product(
                name="Solar Powered Charger",
                description="Portable solar charger for mobile devices, 10000mAh capacity",
                price=49.99,
                category="Electronics",
                sustainability_score=7,
                carbon_footprint=15.0
            ),
            Product(
                name="Reusable Stainless Steel Water Bottle",
                description="Insulated stainless steel bottle, keeps drinks cold for 24 hours",
                price=24.99,
                category="Kitchen",
                sustainability_score=9,
                carbon_footprint=1.2
            ),
            Product(
                name="Compostable Trash Bags",
                description="Plant-based compostable trash bags, 13 gallon size",
                price=12.99,
                category="Household",
                sustainability_score=8,
                carbon_footprint=0.8
            )
        ]

        for product in products:
            db.session.add(product)

        db.session.commit()
        print("Database seeded with sample products!")

if __name__ == '__main__':
    seed_database()