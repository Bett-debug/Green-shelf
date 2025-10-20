from app import app
from models import db, Product, Tag, User

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create a test user
        user = User(username="EcoGuru", email="eco@example.com")
        db.session.add(user)

        # Create tags
        tags = [
            Tag(name="Eco-Friendly"),
            Tag(name="Recyclable"),
            Tag(name="Energy Efficient"),
            Tag(name="Organic"),
            Tag(name="Reusable")
        ]
        db.session.add_all(tags)
        db.session.commit()

        # Create products with image URLs
        products = [
            Product(
                name="Bamboo Toothbrush",
                description="Eco-friendly toothbrush made from natural bamboo.",
                price=4.99,
                category="Personal Care",
                sustainability_score=9,
                carbon_footprint=0.5,
                image_url="https://images.unsplash.com/photo-1606813908768-7a5707e7d7df",
                creator=user,
                tags=[tags[0], tags[1]]
            ),
            Product(
                name="Solar Charger",
                description="Portable solar charger ideal for camping or travel.",
                price=49.99,
                category="Electronics",
                sustainability_score=8,
                carbon_footprint=10.0,
                image_url="https://images.unsplash.com/photo-1509395176047-4a66953fd231",
                creator=user,
                tags=[tags[2]]
            ),
            Product(
                name="Reusable Water Bottle",
                description="Durable stainless steel bottle that keeps drinks cool for 12 hours.",
                price=19.99,
                category="Reusable",
                sustainability_score=10,
                carbon_footprint=0.2,
                image_url="https://images.unsplash.com/photo-1605540439790-81827a3b7d2d",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            Product(
                name="Organic Cotton Tote Bag",
                description="Reusable shopping bag made from 100% organic cotton.",
                price=12.49,
                category="Organic",
                sustainability_score=8,
                carbon_footprint=0.7,
                image_url="https://images.unsplash.com/photo-1578898887932-0c1d3c2fdb7a",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Solar Powered Lamp",
                description="Energy-efficient lamp powered entirely by solar energy.",
                price=25.00,
                category="Energy Saving",
                sustainability_score=10,
                carbon_footprint=0.1,
                image_url="https://images.unsplash.com/photo-1597848212624-a19eb35e2655",
                creator=user,
                tags=[tags[2], tags[0]]
            )
        ]

        db.session.add_all(products)
        db.session.commit()

        print("Database seeded successfully with image URLs!")

if __name__ == "__main__":
    seed_database()
