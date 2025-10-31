"""Direct script to create indexes on Product table"""
import sqlite3

# Connect to the database
conn = sqlite3.connect('instance/greenshelf.db')
cursor = conn.cursor()

print("=" * 60)
print("CREATING INDEXES ON PRODUCT TABLE")
print("=" * 60)

try:
    # Create index on category
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS ix_product_category 
        ON product(category)
    """)
    print("✓ Created index: ix_product_category")
    
    # Create index on sustainability_score
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS ix_product_sustainability_score 
        ON product(sustainability_score)
    """)
    print("✓ Created index: ix_product_sustainability_score")
    
    # Commit the changes
    conn.commit()
    print("\n✓ Changes committed successfully")
    
except Exception as e:
    print(f"\n✗ Error creating indexes: {e}")
    conn.rollback()

# Verify indexes were created
cursor.execute("""
    SELECT name, sql 
    FROM sqlite_master 
    WHERE type='index' AND tbl_name='product'
    ORDER BY name;
""")

indexes = cursor.fetchall()

print("\n" + "=" * 60)
print("VERIFICATION - ALL INDEXES ON PRODUCT TABLE")
print("=" * 60)

if indexes:
    for idx_name, idx_sql in indexes:
        print(f"\n✓ {idx_name}")
        if idx_sql:
            print(f"  SQL: {idx_sql}")
else:
    print("\n✗ No indexes found")

print("\n" + "=" * 60)

conn.close()