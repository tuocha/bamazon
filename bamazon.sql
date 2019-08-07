DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ametrine necklace", "clothing", 45, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("incense", "household", .50, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sailor Moon DVD", "entertainment", 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("loose sage tea 1lb", "food", 4, 1300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat brush", "pet", 12, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("throw blanket", "decor", 25, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lavender oil", "household", 8, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("patchouli candle", "household", 20, 190);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("black hooded cowl", "clothing", 75, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hexagonal table sculpture", "decor", 45, 500);



