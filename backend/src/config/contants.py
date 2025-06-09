

DATABASE_STRUCTURE = '''
    CREATE TABLE orders(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        date DATE NOT NULL,
        week_day VARCHAR(12) NOT NULL,
        hour TIME NOT NULL,
        ticket_number VARCHAR(25) NOT NULL,
        waiter INT NOT NULL DEFAULT 0,
        product_name VARCHAR(120) NOT NULL,
        quantity INT NOT NULL,
        unitary_price NUMERIC(14,2) NOT NULL,
        total NUMERIC(14,2) NOT NULL
    );
'''