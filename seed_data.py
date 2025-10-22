from app import app
from models import db, Product, Tag, User

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create a test user
        user = User(username="EcoGuru", email="eco@example.com")
        user.set_password("password123")  # Set a password for the user
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

        # Create products organized by categories
        products = [
            # Personal Care Category
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
                name="Natural Soap Bar",
                description="Handmade soap with organic ingredients and zero plastic packaging.",
                price=6.99,
                category="Personal Care",
                sustainability_score=9,
                carbon_footprint=0.3,
                image_url="https://images.unsplash.com/photo-1600857062241-98e5dba60f2f",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Bamboo Cotton Swabs",
                description="Biodegradable cotton swabs with bamboo sticks.",
                price=3.49,
                category="Personal Care",
                sustainability_score=8,
                carbon_footprint=0.2,
                image_url="https://images.unsplash.com/photo-1631730486572-226d1f595b68",
                creator=user,
                tags=[tags[0], tags[1]]
            ),
            Product(
                name="Reusable Makeup Remover Pads",
                description="Soft organic cotton pads that can be washed and reused.",
                price=8.99,
                category="Personal Care",
                sustainability_score=10,
                carbon_footprint=0.4,
                image_url="https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            
            # Electronics Category
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
                name="Solar Powered Lamp",
                description="Energy-efficient lamp powered entirely by solar energy.",
                price=25.00,
                category="Electronics",
                sustainability_score=10,
                carbon_footprint=0.1,
                image_url="https://images.unsplash.com/photo-1597848212624-a19eb35e2655",
                creator=user,
                tags=[tags[2], tags[0]]
            ),
            Product(
                name="LED Smart Bulb",
                description="Energy-efficient LED bulb with smart home integration.",
                price=15.99,
                category="Electronics",
                sustainability_score=9,
                carbon_footprint=2.5,
                image_url="https://images.unsplash.com/photo-1550985616-10810253b84d",
                creator=user,
                tags=[tags[2]]
            ),
            Product(
                name="Rechargeable Battery Pack",
                description="High-capacity rechargeable batteries to reduce waste.",
                price=29.99,
                category="Electronics",
                sustainability_score=8,
                carbon_footprint=5.0,
                image_url="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
                creator=user,
                tags=[tags[2], tags[4]]
            ),
            
            # Kitchen & Dining Category
            Product(
                name="Reusable Water Bottle",
                description="Durable stainless steel bottle that keeps drinks cool for 12 hours.",
                price=19.99,
                category="Kitchen & Dining",
                sustainability_score=10,
                carbon_footprint=0.2,
                image_url="https://images.unsplash.com/photo-1605540439790-81827a3b7d2d",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            Product(
                name="Bamboo Cutlery Set",
                description="Portable bamboo utensils perfect for on-the-go meals.",
                price=9.99,
                category="Kitchen & Dining",
                sustainability_score=9,
                carbon_footprint=0.3,
                image_url="https://images.unsplash.com/photo-1610701596007-11502861dcfa",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            Product(
                name="Beeswax Food Wraps",
                description="Reusable alternative to plastic wrap made from organic cotton and beeswax.",
                price=14.99,
                category="Kitchen & Dining",
                sustainability_score=10,
                carbon_footprint=0.5,
                image_url="https://images.unsplash.com/photo-1591088398332-8a7791972843",
                creator=user,
                tags=[tags[0], tags[4], tags[3]]
            ),
            Product(
                name="Stainless Steel Straws",
                description="Set of 4 reusable metal straws with cleaning brush.",
                price=7.99,
                category="Kitchen & Dining",
                sustainability_score=10,
                carbon_footprint=0.2,
                image_url="https://images.unsplash.com/photo-1591088398332-8a7791972843",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            Product(
                name="Compost Bin",
                description="Countertop compost bin with charcoal filter to reduce odors.",
                price=34.99,
                category="Kitchen & Dining",
                sustainability_score=9,
                carbon_footprint=3.0,
                image_url="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1",
                creator=user,
                tags=[tags[0], tags[1]]
            ),
            
            # Home & Garden Category
            Product(
                name="Organic Cotton Tote Bag",
                description="Reusable shopping bag made from 100% organic cotton.",
                price=12.49,
                category="Home & Garden",
                sustainability_score=8,
                carbon_footprint=0.7,
                image_url="https://images.unsplash.com/photo-1578898887932-0c1d3c2fdb7a",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Recycled Plastic Planter",
                description="Stylish planter made from 100% recycled ocean plastic.",
                price=18.99,
                category="Home & Garden",
                sustainability_score=9,
                carbon_footprint=1.5,
                image_url="https://images.unsplash.com/photo-1485955900006-10f4d324d411",
                creator=user,
                tags=[tags[0], tags[1]]
            ),
            Product(
                name="Organic Herb Garden Kit",
                description="Complete kit to grow your own organic herbs at home.",
                price=24.99,
                category="Home & Garden",
                sustainability_score=10,
                carbon_footprint=0.8,
                image_url="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Bamboo Laundry Basket",
                description="Sustainable and durable laundry basket made from bamboo.",
                price=39.99,
                category="Home & Garden",
                sustainability_score=8,
                carbon_footprint=2.0,
                image_url="https://images.unsplash.com/photo-1556911220-bff31c812dba",
                creator=user,
                tags=[tags[0]]
            ),
            
            # Fashion & Accessories Category
            Product(
                name="Organic Cotton T-Shirt",
                description="Comfortable t-shirt made from 100% organic cotton.",
                price=22.99,
                category="Fashion & Accessories",
                sustainability_score=8,
                carbon_footprint=1.2,
                image_url="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Recycled Polyester Backpack",
                description="Durable backpack made from recycled plastic bottles.",
                price=45.99,
                category="Fashion & Accessories",
                sustainability_score=9,
                carbon_footprint=3.5,
                image_url="https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                creator=user,
                tags=[tags[0], tags[1]]
            ),
            Product(
                name="Cork Wallet",
                description="Stylish and sustainable wallet made from natural cork.",
                price=28.99,
                category="Fashion & Accessories",
                sustainability_score=9,
                carbon_footprint=0.6,
                image_url="https://images.unsplash.com/photo-1627123424574-724758594e93",
                creator=user,
                tags=[tags[0]]
            ),
            
            # Cleaning & Household Category
            Product(
                name="Eco-Friendly Dish Soap",
                description="Plant-based dish soap that's tough on grease, gentle on the planet.",
                price=5.99,
                category="Cleaning & Household",
                sustainability_score=9,
                carbon_footprint=0.4,
                image_url="https://images.unsplash.com/photo-1563453392212-326f5e854473",
                creator=user,
                tags=[tags[0], tags[3]]
            ),
            Product(
                name="Reusable Cleaning Cloths",
                description="Set of 6 microfiber cloths that replace paper towels.",
                price=11.99,
                category="Cleaning & Household",
                sustainability_score=10,
                carbon_footprint=0.5,
                image_url="https://images.unsplash.com/photo-1585421514738-01798e348b17",
                creator=user,
                tags=[tags[0], tags[4]]
            ),
            Product(
                name="Natural All-Purpose Cleaner",
                description="Non-toxic cleaner made from plant-based ingredients.",
                price=8.99,
                category="Cleaning & Household",
                sustainability_score=9,
                carbon_footprint=0.6,
                image_url="https://images.unsplash.com/photo-1585421514738-01798e348b17",
                creator=user,
                tags=[tags[0], tags[3]]
            )
        ]

        db.session.add_all(products)
        db.session.commit()

        print("Database seeded successfully with image URLs!")

if __name__ == "__main__":
    seed_database()
