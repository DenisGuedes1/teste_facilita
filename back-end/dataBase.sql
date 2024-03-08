CREATE DATA BASE IF NOT EXISTS clients;

CREATE TABLE
    IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL
    );
ALTER TABLE clients
    ADD coordenada_x FLOAT DEFAULT 0.0 NOT NULL,
    ADD coordenada_y FLOAT DEFAULT 0.0 NOT NULL;
