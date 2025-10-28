from app import app
from models import db, Product, Tag, User

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

        
        # Create admin user
        admin = User(username="admin", email="admin@example.com", role="admin")
        admin.set_password("admin123")
        db.session.add(admin)
        
        # Create regular user
        user = User(username="EcoGuru", email="eco@example.com", role="shopper")
        user.set_password("password123")
        db.session.add(user)

        
        tags = [
            Tag(name="Eco-Friendly"),
            Tag(name="Recyclable"),
            Tag(name="Energy Efficient"),
            Tag(name="Organic"),
            Tag(name="Reusable")
        ]
        db.session.add_all(tags)
        db.session.commit()

        
        products = [
            Product(
                name="Bamboo Toothbrush",
                description="Eco-friendly toothbrush made from natural bamboo.",
                price=499,
                category="Personal Care",
                sustainability_score=9,
                carbon_footprint=0.5,
                image_url="https://images.unsplash.com/photo-1617993669588-3440909d7316?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhbWJvbyUyMHRvb3RoYnJ1c2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
                creator=user,
                tags=[tags[0], tags[1]]
            ),
            Product(
                name="Solar Charger",
                description="Portable solar charger ideal for camping or travel.",
                price=4999,
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
                image_url="https://images.unsplash.com/photo-1623684194967-48075185a58c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            Product(
                name="Organic Cotton Tote Bag",
                description="Reusable shopping bag made from 100% organic cotton.",
                price=1249,
                category="Organic",
                sustainability_score=8,
                carbon_footprint=0.7,
                image_url="https://images.unsplash.com/photo-1683148754073-cfa906017a10?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Solar Powered Lamp",
                description="Energy-efficient lamp powered entirely by solar energy.",
                price=2500,
                category="Energy Saving",
                sustainability_score=10,
                carbon_footprint=0.1,
                image_url="https://images.unsplash.com/photo-1601642964568-1917224f4e4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
                creator=user,
                tags=[tags[2], tags[0]]
            )
        ]

        db.session.add_all(products)
        db.session.commit()

        print("Database seeded successfully with image URLs!")

if __name__ == "__main__":
    seed_database()
