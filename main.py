import pandas as pd
import sqlite3

conn=sqlite3.connect('ecommerce.db')
cursor= conn.cursor()


cursor.execute('''
               CREATE TABLE IF NOT EXISTS users(
               id INTEGER PRIMARY KEY,
               first_name TEXT,
               last_name TEXT,
               email TEXT,
               gender TEXT,
               age INTEGER,
               state TEXT,   
               street_address TEXT,
               postal_code INTEGER,
               city TEXT,
               country TEXT,
               latitude INTEGER,
               longitude INTEGER,
               traffic_source TEXT,
               created_at INTEGER
               )
               ''')

cursor.execute('''
               CREATE TABLE IF NOT EXISTS orders(
               order_id INTEGER PRIMARY KEY,
               user_id INTEGER,
               status TEXT,
               gender TEXT,
               created_at TEXT,
               returned_at TEXT,
               shipped_at TEXT,
               delivered_at TEXT,
               num_of_item INTEGER,
               FOREIGN KEY(user_id) REFERENCES
               users(id)
               )
               ''')

conn.commit()


users_df= pd.read_csv('users.csv')
orders_df = pd.read_csv('orders.csv')

users_df.to_sql('users',conn,
                if_exists='replace',index=False)
orders_df.to_sql('orders', conn,
                if_exists='replace',index=False)

print("data loaded to SQLite db.")

print("\nSample Users:")
for row in cursor.execute("SELECT * FROM users LIMIT 5"):
    print(row)

print("\nSample Orders:")
for row in cursor.execute("SELECT * FROM orders LIMIT 5"):
    print(row)


print("\nUser + Order Join:")
for row in cursor.execute('''
                          SELECT 
                              u.first_name || ' ' || u.last_name AS full_name,
                              o.status,
                              o.num_of_item
                          FROM users u
                          JOIN orders o ON u.id = o.user_id 
                          LIMIT 5
                          '''):
    print(row)

conn.close()