DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  department_name VARCHAR(150) NOT NULL,
  price DECIMAL (10,2) NOT NULL ,
  stock_quantity INTEGER NOT NULL,
  primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
  ('Genuine Aquamarine Gemstone Bar Necklace', 'Jewelry', 68.00, 14),
  ('Lemon Print Retro High Waist Swimsuit', 'Clothing', 70.50, 12),
  ('Brass Half Moon Hoop Earrings', 'Jewelry', 36.00, 18),
  ('Botanical Print (Set of 3)', 'Artwork', 28.00, 15),
  ('Scratch the World- Scratch off world map (Size: 33" x 23")', 'Office Products', 28.99, 10),
  ('Personalized Leather Collar', 'Pet Supplies', 29.00, 8),
  ('Ombre Rope Leash with Leather Handle', 'Pet Supplies', 46.99, 6),
  ('All Natural Bath Bombs', 'Beauty & Grooming', 25.49, 7),
  ('Stuffed Llama Toy Plush Alpaca', 'Toys & Games', 34.00, 18),
  ('Personalized Stationary Notecard & Envelope Set', 'Stationary & Party Supplies', 15.00, 15)