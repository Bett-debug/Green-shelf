# Green Shelf Products by Category

## Overview
The database has been populated with 27 eco-friendly products organized across 6 main categories.

---

## Categories and Products

### 1. Personal Care (4 products)
- **Bamboo Toothbrush** - $4.99
  - Eco-friendly toothbrush made from natural bamboo
  - Sustainability Score: 9/10 | Carbon Footprint: 0.5 kg
  - Tags: Eco-Friendly, Recyclable

- **Natural Soap Bar** - $6.99
  - Handmade soap with organic ingredients and zero plastic packaging
  - Sustainability Score: 9/10 | Carbon Footprint: 0.3 kg
  - Tags: Eco-Friendly, Organic

- **Bamboo Cotton Swabs** - $3.49
  - Biodegradable cotton swabs with bamboo sticks
  - Sustainability Score: 8/10 | Carbon Footprint: 0.2 kg
  - Tags: Eco-Friendly, Recyclable

- **Reusable Makeup Remover Pads** - $8.99
  - Soft organic cotton pads that can be washed and reused
  - Sustainability Score: 10/10 | Carbon Footprint: 0.4 kg
  - Tags: Eco-Friendly, Reusable

---

### 2. Electronics (4 products)
- **Solar Charger** - $49.99
  - Portable solar charger ideal for camping or travel
  - Sustainability Score: 8/10 | Carbon Footprint: 10.0 kg
  - Tags: Energy Efficient

- **Solar Powered Lamp** - $25.00
  - Energy-efficient lamp powered entirely by solar energy
  - Sustainability Score: 10/10 | Carbon Footprint: 0.1 kg
  - Tags: Energy Efficient, Eco-Friendly

- **LED Smart Bulb** - $15.99
  - Energy-efficient LED bulb with smart home integration
  - Sustainability Score: 9/10 | Carbon Footprint: 2.5 kg
  - Tags: Energy Efficient

- **Rechargeable Battery Pack** - $29.99
  - High-capacity rechargeable batteries to reduce waste
  - Sustainability Score: 8/10 | Carbon Footprint: 5.0 kg
  - Tags: Energy Efficient, Reusable

---

### 3. Kitchen & Dining (5 products)
- **Reusable Water Bottle** - $19.99
  - Durable stainless steel bottle that keeps drinks cool for 12 hours
  - Sustainability Score: 10/10 | Carbon Footprint: 0.2 kg
  - Tags: Eco-Friendly, Reusable

- **Bamboo Cutlery Set** - $9.99
  - Portable bamboo utensils perfect for on-the-go meals
  - Sustainability Score: 9/10 | Carbon Footprint: 0.3 kg
  - Tags: Eco-Friendly, Reusable

- **Beeswax Food Wraps** - $14.99
  - Reusable alternative to plastic wrap made from organic cotton and beeswax
  - Sustainability Score: 10/10 | Carbon Footprint: 0.5 kg
  - Tags: Eco-Friendly, Reusable, Organic

- **Stainless Steel Straws** - $7.99
  - Set of 4 reusable metal straws with cleaning brush
  - Sustainability Score: 10/10 | Carbon Footprint: 0.2 kg
  - Tags: Eco-Friendly, Reusable

- **Compost Bin** - $34.99
  - Countertop compost bin with charcoal filter to reduce odors
  - Sustainability Score: 9/10 | Carbon Footprint: 3.0 kg
  - Tags: Eco-Friendly, Recyclable

---

### 4. Home & Garden (4 products)
- **Organic Cotton Tote Bag** - $12.49
  - Reusable shopping bag made from 100% organic cotton
  - Sustainability Score: 8/10 | Carbon Footprint: 0.7 kg
  - Tags: Eco-Friendly, Organic

- **Recycled Plastic Planter** - $18.99
  - Stylish planter made from 100% recycled ocean plastic
  - Sustainability Score: 9/10 | Carbon Footprint: 1.5 kg
  - Tags: Eco-Friendly, Recyclable

- **Organic Herb Garden Kit** - $24.99
  - Complete kit to grow your own organic herbs at home
  - Sustainability Score: 10/10 | Carbon Footprint: 0.8 kg
  - Tags: Eco-Friendly, Organic

- **Bamboo Laundry Basket** - $39.99
  - Sustainable and durable laundry basket made from bamboo
  - Sustainability Score: 8/10 | Carbon Footprint: 2.0 kg
  - Tags: Eco-Friendly

---

### 5. Fashion & Accessories (3 products)
- **Organic Cotton T-Shirt** - $22.99
  - Comfortable t-shirt made from 100% organic cotton
  - Sustainability Score: 8/10 | Carbon Footprint: 1.2 kg
  - Tags: Eco-Friendly, Organic

- **Recycled Polyester Backpack** - $45.99
  - Durable backpack made from recycled plastic bottles
  - Sustainability Score: 9/10 | Carbon Footprint: 3.5 kg
  - Tags: Eco-Friendly, Recyclable

- **Cork Wallet** - $28.99
  - Stylish and sustainable wallet made from natural cork
  - Sustainability Score: 9/10 | Carbon Footprint: 0.6 kg
  - Tags: Eco-Friendly

---

### 6. Cleaning & Household (3 products)
- **Eco-Friendly Dish Soap** - $5.99
  - Plant-based dish soap that's tough on grease, gentle on the planet
  - Sustainability Score: 9/10 | Carbon Footprint: 0.4 kg
  - Tags: Eco-Friendly, Organic

- **Reusable Cleaning Cloths** - $11.99
  - Set of 6 microfiber cloths that replace paper towels
  - Sustainability Score: 10/10 | Carbon Footprint: 0.5 kg
  - Tags: Eco-Friendly, Reusable

- **Natural All-Purpose Cleaner** - $8.99
  - Non-toxic cleaner made from plant-based ingredients
  - Sustainability Score: 9/10 | Carbon Footprint: 0.6 kg
  - Tags: Eco-Friendly, Organic

---

## Statistics

- **Total Products**: 27
- **Total Categories**: 6
- **Price Range**: $3.49 - $49.99
- **Average Sustainability Score**: 9.0/10
- **Average Carbon Footprint**: 1.4 kg

## Tags Distribution
- Eco-Friendly: 24 products
- Reusable: 8 products
- Organic: 8 products
- Recyclable: 5 products
- Energy Efficient: 4 products

---

## Running the Seed Script

To populate the database with these products, run:
```bash
python seed_data.py
```

This will:
1. Drop all existing tables
2. Create fresh tables
3. Add a test user (username: "EcoGuru", email: "eco@example.com")
4. Add all 5 tags
5. Add all 27 products with their respective tags and images