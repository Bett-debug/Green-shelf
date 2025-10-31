"""Script to verify database indexes on Product table"""
import sqlite3

# Connect to the database
conn = sqlite3.connect('instance/sustainable_shelf.db')
cursor = conn.cursor()

# Query to get all indexes on the product table
cursor.execute("""
    SELECT name, sql 
    FROM sqlite_master 
    WHERE type='index' AND tbl_name='product'
    ORDER BY name;
""")

indexes = cursor.fetchall()

print("=" * 60)
print("INDEXES ON PRODUCT TABLE")
print("=" * 60)

if indexes:
    for idx_name, idx_sql in indexes:
        print(f"\n✓ Index Name: {idx_name}")
        if idx_sql:
            print(f"  SQL: {idx_sql}")
        else:
            print(f"  (Auto-generated index)")
else:
    print("\n✗ No indexes found on product table")

print("\n" + "=" * 60)

# Specifically check for our new indexes
cursor.execute("""
    SELECT name 
    FROM sqlite_master 
    WHERE type='index' 
    AND tbl_name='product' 
    AND (name='ix_product_category' OR name='ix_product_sustainability_score')
""")

our_indexes = cursor.fetchall()

print("\nVERIFICATION RESULTS:")
print("=" * 60)

if len(our_indexes) == 2:
    print("✓ SUCCESS: Both indexes created successfully!")
    print("  - ix_product_category")
    print("  - ix_product_sustainability_score")
elif len(our_indexes) == 1:
    print(f"⚠ PARTIAL: Only 1 index found: {our_indexes[0][0]}")
else:
    print("✗ FAILED: Target indexes not found")

print("=" * 60)

conn.close()