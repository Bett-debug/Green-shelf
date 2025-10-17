from app import app
from models import db, Product, Tag, User

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

        user = User(username="EcoGuru", email="eco@example.com")
        db.session.add(user)

        tags = [Tag(name="Eco-Friendly"), Tag(name="Recyclable"), Tag(name="Energy Efficient")]
        db.session.add_all(tags)

        products = [
            Product(name="Bamboo Toothbrush", price=4.99, category="Personal Care", sustainability_score=9, carbon_footprint=0.5, creator=user, tags=[tags[0], tags[1]]),
            Product(name="Solar Charger", price=49.99, category="Electronics", sustainability_score=8, carbon_footprint=10.0, creator=user, tags=[tags[2]])
        ]

        db.session.add_all(products)
        db.session.commit()
        print(" Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
